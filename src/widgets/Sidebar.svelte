<script>
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let active = false;
	export let title = '';

	function cancel() {
		dispatch('cancel', {});
		close();
	}

	function close() {
		active = false;
	}
</script>

<style lang="scss">
	@import 'node_modules/bulma/sass/utilities/all';
	@import 'node_modules/bulma/sass/elements/title';

	@each $size in $sizes {
		$i: index($sizes, $size);
		.is-size-#{$i} {
			font-size: $size !important;
		}
	}

	@each $size in $sizes {
		$i: index($sizes, $size);
		.is-size-#{$i}-mobile {
			font-size: $size !important;
		}
	}

	.nacc_sidebar {
		font-family: $family-primary;
		color: $text;
		font-size: 1em;
		font-weight: $weight-normal;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		padding: 0 2rem;
		margin: 0;
		border-right: 1px solid #aaa;
		background: #fff;

		width: 30rem;
		z-index: 9990;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		& .close {
			color: #aaa;
			cursor: pointer;
			position: absolute;
			top: 0.5em;
			right: 0;
			padding: 0.8rem 0.5rem;
			transform: translate(0%, -50%);
			font-size: 2rem;
			transition: all 200ms ease-in-out;
			& :hover {
				color: #000;
			}
		}
	}

	@media (max-width: 768px) {
		.nacc_sidebar {
			width: 100%;
			padding:0;
		}
	}

	.nacc_container {
		height: 100%;
		width: 100%;
	}

	.nacc_item {
		margin: 0.5rem;
	}
</style>

{#if active}
	<div class="nacc_sidebar" transition:fly={{ x: -250 }}>
		<span class="close" on:click|stopPropagation={cancel}>&times;</span>

		<div class="nacc_item">
			<h5 class="title is-3 is-size-4-mobile">{title}</h5>
			<hr />
			<slot>No Content</slot>
		</div>

		<div class="nacc_item">
			<slot name="footer" />
		</div>

	</div>
{/if}
