<script>
	import { Icon } from 'Svelma';
	import { fade } from 'svelte/transition';

	export let active = false;
	export let theme = '';
</script>

<style lang="scss">
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
		background: hsla(0, 0%, 14%, 0.25);
		color: white;
		padding: 0;
		margin: 0;
		height: 2em;
		width: 2em;

		&:hover {
			background: hsl(0, 0%, 14%);
		}
	}
	.is-primary {
		background: hsla(171, 100%, 41%, 0.25);
		&:hover {
			background: hsl(171, 100%, 41%);
		}
	}

	.is-info {
		background: hsla(204, 86%, 53%, 0.25);
		&:hover {
			background: hsl(204, 86%, 53%);
		}
	}

	.is-link {
		background: hsla(217, 71%, 53%, 0.25);
		&:hover {
			background: hsl(217, 71%, 53%);
		}
	}

	.is-success {
		background: hsla(141, 71%, 48%, 0.25);
		&:hover {
			background: hsl(141, 71%, 48%);
		}
	}

	.is-warning {
		background: hsla(48, 100%, 67%, 0.25);
		&:hover {
			background: hsl(48, 100%, 67%);
		}
	}

	.is-danger {
		background: hsla(348, 100%, 61%, 0.25);
		&:hover {
			background: hsl(348, 100%, 61%);
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
