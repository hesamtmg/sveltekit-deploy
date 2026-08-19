<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>IPG — Internet Payment Gateway</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="bg-scene">
	<div class="bg-orb bg-orb-a"></div>
	<div class="bg-orb bg-orb-b"></div>
	<div class="bg-orb bg-orb-c"></div>
	<div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
		{@render children()}
	</div>
</div>

<style>
	.bg-scene {
		position: relative;
		min-height: 100vh;
		background: #0b0b16;
		overflow: hidden;
	}

	.bg-orb {
		position: absolute;
		border-radius: 9999px;
		filter: blur(90px);
		opacity: 0.55;
		will-change: transform;
	}

	.bg-orb-a {
		width: 32rem;
		height: 32rem;
		top: -10rem;
		left: -8rem;
		background: radial-gradient(circle, #6d28d9, transparent 70%);
		animation: drift-a 18s ease-in-out infinite;
	}

	.bg-orb-b {
		width: 28rem;
		height: 28rem;
		bottom: -10rem;
		right: -6rem;
		background: radial-gradient(circle, #0ea5e9, transparent 70%);
		animation: drift-b 22s ease-in-out infinite;
	}

	.bg-orb-c {
		width: 24rem;
		height: 24rem;
		top: 40%;
		left: 55%;
		background: radial-gradient(circle, #ec4899, transparent 70%);
		opacity: 0.35;
		animation: drift-c 26s ease-in-out infinite;
	}

	@keyframes drift-a {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(3rem, 2rem);
		}
	}

	@keyframes drift-b {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(-2rem, -3rem);
		}
	}

	@keyframes drift-c {
		0%,
		100% {
			transform: translate(-50%, -50%) scale(1);
		}
		50% {
			transform: translate(-50%, -50%) scale(1.15);
		}
	}
</style>
