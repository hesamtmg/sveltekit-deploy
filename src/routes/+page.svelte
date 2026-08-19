<script lang="ts">
	import { goto } from '$app/navigation';
	import CardPreview from '$lib/components/CardPreview.svelte';
	import {
		detectBrand,
		expiryValid,
		formatCardNumber,
		formatCvv,
		formatExpiry,
		luhnValid
	} from '$lib/card';

	let number = $state('');
	let name = $state('');
	let expiry = $state('');
	let cvv = $state('');
	let cvvFocused = $state(false);
	let submitting = $state(false);
	let touched = $state<Record<string, boolean>>({});

	let digits = $derived(number.replace(/\D/g, ''));
	let brand = $derived(detectBrand(digits));

	let errors = $derived({
		number: digits.length < 12 || !luhnValid(digits) ? 'Enter a valid card number' : '',
		name: name.trim().length < 2 ? 'Enter the name on the card' : '',
		expiry: !expiryValid(expiry) ? 'Enter a valid, non-expired date' : '',
		cvv: cvv.length < 3 ? 'Enter a valid security code' : ''
	});

	let isValid = $derived(Object.values(errors).every((e) => e === ''));

	function onNumberInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		number = formatCardNumber(target.value);
	}

	function onExpiryInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		expiry = formatExpiry(target.value);
	}

	function onCvvInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		cvv = formatCvv(target.value, brand);
	}

	function markAll() {
		touched = { number: true, name: true, expiry: true, cvv: true };
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		markAll();
		if (!isValid || submitting) return;

		submitting = true;
		// Simulate a network round-trip to a payment processor.
		await new Promise((r) => setTimeout(r, 1400));

		sessionStorage.setItem(
			'ipg:last-card',
			JSON.stringify({ brand, last4: digits.slice(-4), name: name.trim() })
		);
		goto('/success');
	}
</script>

<div class="w-full max-w-4xl">
	<div class="mb-10 text-center">
		<div
			class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 uppercase backdrop-blur"
		>
			<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
			Secure checkout
		</div>
		<h1 class="text-3xl font-semibold text-white sm:text-4xl">Add a payment card</h1>
		<p class="mt-2 text-white/60">Your card is encrypted end-to-end. We never store your CVV.</p>
	</div>

	<div class="grid items-start gap-10 lg:grid-cols-[380px_1fr]">
		<div class="flex justify-center lg:sticky lg:top-16 lg:justify-start">
			<CardPreview {number} {name} {expiry} {cvv} {brand} flipped={cvvFocused} />
		</div>

		<form
			onsubmit={handleSubmit}
			novalidate
			class="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
		>
			<div class="space-y-5">
				<div>
					<label for="number" class="mb-1.5 block text-sm font-medium text-white/80"
						>Card number</label
					>
					<input
						id="number"
						inputmode="numeric"
						autocomplete="cc-number"
						placeholder="1234 5678 9012 3456"
						value={number}
						oninput={onNumberInput}
						onblur={() => (touched = { ...touched, number: true })}
						class="field"
						class:field-error={touched.number && errors.number}
					/>
					{#if touched.number && errors.number}
						<p class="err">{errors.number}</p>
					{/if}
				</div>

				<div>
					<label for="name" class="mb-1.5 block text-sm font-medium text-white/80"
						>Cardholder name</label
					>
					<input
						id="name"
						autocomplete="cc-name"
						placeholder="Jordan Rivera"
						bind:value={name}
						onblur={() => (touched = { ...touched, name: true })}
						class="field"
						class:field-error={touched.name && errors.name}
					/>
					{#if touched.name && errors.name}
						<p class="err">{errors.name}</p>
					{/if}
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="expiry" class="mb-1.5 block text-sm font-medium text-white/80"
							>Expiry date</label
						>
						<input
							id="expiry"
							inputmode="numeric"
							autocomplete="cc-exp"
							placeholder="MM/YY"
							value={expiry}
							oninput={onExpiryInput}
							onblur={() => (touched = { ...touched, expiry: true })}
							class="field"
							class:field-error={touched.expiry && errors.expiry}
						/>
						{#if touched.expiry && errors.expiry}
							<p class="err">{errors.expiry}</p>
						{/if}
					</div>

					<div>
						<label for="cvv" class="mb-1.5 block text-sm font-medium text-white/80"
							>Security code</label
						>
						<input
							id="cvv"
							inputmode="numeric"
							autocomplete="cc-csc"
							placeholder="•••"
							value={cvv}
							oninput={onCvvInput}
							onfocus={() => (cvvFocused = true)}
							onblur={() => {
								cvvFocused = false;
								touched = { ...touched, cvv: true };
							}}
							class="field"
							class:field-error={touched.cvv && errors.cvv}
						/>
						{#if touched.cvv && errors.cvv}
							<p class="err">{errors.cvv}</p>
						{/if}
					</div>
				</div>

				<button type="submit" disabled={submitting} class="submit-btn">
					{#if submitting}
						<span class="spinner"></span>
						Processing…
					{:else}
						Add card
					{/if}
				</button>

				<p class="flex items-center justify-center gap-1.5 text-center text-xs text-white/40">
					<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/></svg
					>
					256-bit TLS encryption · PCI DSS compliant
				</p>
			</div>
		</form>
	</div>
</div>

<style>
	:global(.field) {
		width: 100%;
		border-radius: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.05);
		padding: 0.7rem 1rem;
		color: white;
		font-size: 0.95rem;
		outline: none;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease,
			background 0.15s ease;
	}

	:global(.field::placeholder) {
		color: rgba(255, 255, 255, 0.3);
	}

	:global(.field:focus) {
		border-color: #818cf8;
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
	}

	:global(.field-error) {
		border-color: #fb7185;
	}

	:global(.err) {
		margin-top: 0.35rem;
		font-size: 0.75rem;
		color: #fca5a5;
	}

	:global(.submit-btn) {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		border-radius: 0.75rem;
		background: linear-gradient(135deg, #6d28d9, #4338ca 55%, #0ea5e9);
		padding: 0.85rem 1.5rem;
		font-weight: 600;
		color: white;
		box-shadow: 0 10px 30px -8px rgba(99, 102, 241, 0.6);
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease,
			opacity 0.15s ease;
	}

	:global(.submit-btn:hover:not(:disabled)) {
		transform: translateY(-1px);
		box-shadow: 0 14px 34px -8px rgba(99, 102, 241, 0.75);
	}

	:global(.submit-btn:disabled) {
		opacity: 0.75;
		cursor: not-allowed;
	}

	:global(.spinner) {
		width: 1rem;
		height: 1rem;
		border-radius: 9999px;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: white;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
