<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let card = $state<{ brand: string; last4: string; name: string } | null>(null);
	let ready = $state(false);

	onMount(() => {
		const raw = sessionStorage.getItem('ipg:last-card');
		if (!raw) {
			goto('/');
			return;
		}
		card = JSON.parse(raw);
		ready = true;
	});

	const brandLabel: Record<string, string> = {
		visa: 'Visa',
		mastercard: 'Mastercard',
		amex: 'American Express',
		discover: 'Discover',
		unknown: 'Card'
	};

	function addAnother() {
		sessionStorage.removeItem('ipg:last-card');
		goto('/');
	}
</script>

{#if ready && card}
	<div class="w-full max-w-md text-center">
		<div class="check-wrap">
			<svg viewBox="0 0 80 80" class="h-24 w-24">
				<circle
					cx="40"
					cy="40"
					r="36"
					fill="none"
					stroke="rgba(52,211,153,0.25)"
					stroke-width="4"
				/>
				<circle
					class="check-circle"
					cx="40"
					cy="40"
					r="36"
					fill="none"
					stroke="#34d399"
					stroke-width="4"
					stroke-linecap="round"
				/>
				<path
					class="check-mark"
					d="M24 41 L35 52 L57 28"
					fill="none"
					stroke="#34d399"
					stroke-width="5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>

		<h1 class="mt-2 text-3xl font-semibold text-white">Card added successfully</h1>
		<p class="mt-2 text-white/60">You're all set. This card can now be used for payments.</p>

		<div
			class="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left backdrop-blur-xl"
		>
			<div class="flex items-center gap-3">
				<div class="brand-badge">
					{brandLabel[card.brand]?.slice(0, 1) ?? '?'}
				</div>
				<div>
					<div class="text-sm font-medium text-white">
						{brandLabel[card.brand] ?? 'Card'} •••• {card.last4}
					</div>
					<div class="text-xs text-white/50">{card.name}</div>
				</div>
			</div>
			<span class="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300"
				>Active</span
			>
		</div>

		<div class="mt-8 flex flex-col gap-3 sm:flex-row">
			<button onclick={addAnother} class="secondary-btn flex-1">Add another card</button>
			<a href="/" class="primary-btn flex-1">Done</a>
		</div>
	</div>
{/if}

<style>
	.check-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.check-circle {
		stroke-dasharray: 226;
		stroke-dashoffset: 226;
		animation: draw-circle 0.6s ease-out forwards;
	}

	.check-mark {
		stroke-dasharray: 50;
		stroke-dashoffset: 50;
		animation: draw-check 0.4s ease-out 0.5s forwards;
	}

	@keyframes draw-circle {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes draw-check {
		to {
			stroke-dashoffset: 0;
		}
	}

	.brand-badge {
		display: flex;
		height: 2.5rem;
		width: 2.5rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: linear-gradient(135deg, #6d28d9, #0ea5e9);
		font-weight: 600;
		color: white;
	}

	.primary-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		background: linear-gradient(135deg, #6d28d9, #4338ca 55%, #0ea5e9);
		padding: 0.75rem 1.5rem;
		font-weight: 600;
		color: white;
		box-shadow: 0 10px 30px -8px rgba(99, 102, 241, 0.6);
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.primary-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 14px 34px -8px rgba(99, 102, 241, 0.75);
	}

	.secondary-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.05);
		padding: 0.75rem 1.5rem;
		font-weight: 600;
		color: white;
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.secondary-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.25);
	}
</style>
