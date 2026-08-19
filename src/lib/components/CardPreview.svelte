<script lang="ts">
	import type { CardBrand } from '$lib/card';

	let {
		number = '',
		name = '',
		expiry = '',
		cvv = '',
		brand = 'unknown' as CardBrand,
		flipped = false
	}: {
		number?: string;
		name?: string;
		expiry?: string;
		cvv?: string;
		brand?: CardBrand;
		flipped?: boolean;
	} = $props();

	const brandLabel: Record<CardBrand, string> = {
		visa: 'VISA',
		mastercard: 'Mastercard',
		amex: 'American Express',
		discover: 'Discover',
		unknown: ''
	};
</script>

<div class="card-scene">
	<div class="card-flip" class:flipped>
		<div class="card-face card-front">
			<div class="glow"></div>
			<div class="relative z-10 flex h-full flex-col justify-between p-6 text-white">
				<div class="flex items-start justify-between">
					<div class="chip"></div>
					<span class="text-sm font-medium tracking-wide opacity-90">{brandLabel[brand]}</span>
				</div>

				<div
					class="font-mono text-lg tracking-[0.08em] whitespace-nowrap sm:text-xl"
					style="font-family: 'JetBrains Mono', monospace;"
				>
					{number || '•••• •••• •••• ••••'}
				</div>

				<div class="flex items-end justify-between text-sm">
					<div class="min-w-0">
						<div class="text-[10px] uppercase tracking-wider opacity-70">Card holder</div>
						<div class="truncate font-medium tracking-wide uppercase">
							{name || 'YOUR NAME'}
						</div>
					</div>
					<div>
						<div class="text-[10px] uppercase tracking-wider opacity-70">Expires</div>
						<div class="font-mono font-medium">{expiry || 'MM/YY'}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card-face card-back">
			<div class="mt-6 h-10 w-full bg-black/80"></div>
			<div class="flex justify-end px-6 py-4">
				<div
					class="flex h-9 w-16 items-center justify-end rounded bg-white/90 px-2 font-mono text-sm text-slate-900 italic"
				>
					{cvv || '•••'}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card-scene {
		perspective: 1200px;
		width: 100%;
		max-width: 380px;
	}

	.card-flip {
		position: relative;
		width: 100%;
		aspect-ratio: 85 / 54;
		transform-style: preserve-3d;
		transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
	}

	.card-flip.flipped {
		transform: rotateY(180deg);
	}

	.card-face {
		position: absolute;
		inset: 0;
		border-radius: 1rem;
		backface-visibility: hidden;
		overflow: hidden;
		box-shadow:
			0 20px 40px -12px rgba(0, 0, 0, 0.6),
			0 0 0 1px rgba(255, 255, 255, 0.08);
	}

	.card-front {
		background: linear-gradient(135deg, #6d28d9 0%, #4338ca 45%, #0ea5e9 100%);
	}

	.card-back {
		background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
		transform: rotateY(180deg);
	}

	.glow {
		position: absolute;
		inset: -40%;
		background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.25), transparent 55%);
		pointer-events: none;
	}

	.chip {
		width: 2.5rem;
		height: 1.9rem;
		border-radius: 0.375rem;
		background: linear-gradient(135deg, #fde68a, #f59e0b);
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
	}
</style>
