<script>
	// Bit of a hack and paste job from svelma - Message.svelte
	import { fade } from 'svelte/transition';
	import Icon from './Icon.svelte';

	export let type = '';
	export let active = true;

	export let size = '';
	export let icon = '';
	export let iconPack = '';
	export let iconSize = '';

	let newIcon = '';

	$: newIconSize = iconSize || size || 'is-large';

	$: {
		if (icon === true) {
			switch (type) {
				case 'is-info':
					newIcon = 'info-circle';
					break;
				case 'is-success':
					icon = 'check-circle';
					newIcon;
				case 'is-warning':
					icon = 'exclamation-triangle';
					newIcon;
				case 'is-danger':
					icon = 'exclamation-circle';
					newIcon;
				default:
					newIcon = null;
			}
		} else {
			newIcon = icon;
		}
	}

	function close() {
		active = false;
		dispatch('close', active);
	}
</script>

<style lang="scss">
	@import 'node_modules/bulma/sass/utilities/all';
	@import 'node_modules/bulma/sass/components/message';
	@import 'node_modules/bulma/sass/components/media';
	@import 'node_modules/bulma/sass/elements/title';

	.banner {
		font-family: $family-primary;
		color: $text;
		font-size: 1em;
		font-weight: $weight-normal;
		
		position: fixed;
		width: 100vw;
		left: 0;
		bottom: 0;
		z-index: 9980;
	}

	.message-header {
		justify-content: space-between;
	}

	.message .media {
		padding-top: 0;
		border: 0;
	}
</style>

{#if active}
	<div class="banner">
		<article class="message {type} {size}" transition:fade|local>
			<section class="message-body">
				<div class="media">
					{#if icon}
						<div class="media-left">
							<Icon
								pack={iconPack}
								icon={newIcon}
								size={newIconSize} />
						</div>
					{/if}
					<div class="media-content">
						<slot />
					</div>
				</div>
			</section>
		</article>
	</div>
{/if}
