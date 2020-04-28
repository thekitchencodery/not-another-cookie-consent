<script>
	import { Icon } from 'Svelma';
	import { fade } from 'svelte/transition';

	export let active = false;
	export let theme = '';
</script>

<style lang="scss">
@import 'node_modules/bulma/sass/utilities/all';
	.nacc_fab {
		bottom: 0;
		left: 0;
		cursor: pointer;
		margin-left: 0;
		padding-bottom: 0;
		position: fixed;
		z-index: 9970;
	}

	.nacc_button {
		clip-path: polygon(0px 0px, 0px 100%, 100% 100%);
		background: bulmaRgba($black, 0.25);
		color: white;
		padding: 0;
		margin: 0;
		height: 2em;
		width: 2em;

		&:hover {
			background: $black;
		}
	}
	.is-primary {
		background: bulmaRgba($primary, 0.25);
		&:hover {
			background: $primary;
		}
	}

	.is-info {
		background: bulmaRgba($info, 0.25);
		&:hover {
			background: $info;
		}
	}

	.is-link {
		background: bulmaRgba($link, 0.25);
		&:hover {
			background: $link;
		}
	}

	.is-success {
		background: bulmaRgba($success, 0.25);
		&:hover {
			background: $success;
		}
	}

	.is-warning {
		background: bulmaRgba($warning, 0.25);
		&:hover {
			background: $warning;
		}
	}

	.is-danger {
		// background: hsla(348, 100%, 61%, 0.25);
		background : bulmaRgba($danger, 0.25);
		&:hover {
			background: $danger;
		}
	}
</style>

{#if active}
	<div class="nacc_fab " on:click transition:fade|local>
		<div class="nacc_button {theme}">
			<i
				class="fas fa-cookie-bite"
				style="transform: translate(20%,60%);" />
		</div>
	</div>
{/if}
