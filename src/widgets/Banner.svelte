<script>
	// Bit of a hack and paste job from svelma - Message.svelte
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Icon } from 'svelma';

	export let type = '';
	export let active = true;
	export let title = '';
	export let showClose = true;
	export let autoClose = false;
	export let duration = 5000;
	export let size = '';
    export let icon = '';
    export let iconPack = '';
	export let iconSize = '';

	let newIcon = '';

	const dispatch = createEventDispatcher();

	if (autoClose) {
		setTimeout(() => {
			close = true;
		}, duration);
	}

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

<style>
    .banner{
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
		{#if title || showClose}
			<div class="message-header">
				{#if title}
					<p>{title}</p>
				{/if}
				{#if showClose}
					<button
						class="delete"
						aria-label="ariaCloseLabel"
						on:click={close} />
				{/if}
			</div>
		{/if}
		<section class="message-body">
			<div class="media">
				{#if icon}
					<div class="media-left">
						<Icon pack={iconPack} icon={newIcon} size={newIconSize} />
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
