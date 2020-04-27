<script>
	import 'bulma/css/bulma.min.css';
	import * as messages from './messages';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import Sidebar from './widgets/Sidebar.svelte';
	import Fab from './widgets/Fab.svelte';
	import { Button, Switch } from 'svelma';
	import Banner from './widgets/Banner.svelte';
	import { getCookie, setCookie } from './cookies';
	const dispatch = createEventDispatcher();

	export let cookieName = 'nacc';
	export let theme = 'is-black';
	export let cookiePolicy = '/cookies';
	export let aboutCookies = 'https://cookiesandyou.com';
	export let banner = {};
	export let optionPannel = {};

	let rOpts = optionPannel.required || {};
	let aOpts = optionPannel.analytics || {};

	let optionsText = {
		title: optionPannel.title || messages.options_title,
		preamble: optionPannel.preamble || messages.options_preamble,
		aboutCookies: optionPannel.aboutLabel || messages.options_about_cookies_label,
		cookiePolicy: optionPannel.policyLabel || messages.options_cookie_policy_label,
		saveButton: optionPannel.button || messages.options_save_button,
		requiredHeadline: rOpts.title || messages.options_required_title,
		requiredSlider : rOpts.label || messages.options_required_slider,
		required: rOpts.text || messages.options_required_text,
		analyticsHeadline: aOpts.title || messages.options_analytics_title,
		analyticsSlider : aOpts.label || messages.options_analytics_slider,
		analytics: aOpts.text || messages.options_analytics_text,
	};

	let bannerText = {
		headline: banner.headline || messages.banner_line1,
		strapline: banner.strapline || messages.banner_line2,
		optionsButton: banner.optionsButton || messages.banner_options,
		acceptButton: banner.acceptButton || messages.banner_accept
	};

	$: banner_show = false;
	$: sidebar_show = false;
	$: fab_show = false;

	let cookie;
	let analytic = false;

	function cancelled() {
		banner_show = !cookie;
		fab_show = ~cookie;
	}

	function save() {
		sidebar_show = false;
		fab_show = true;
		cookie = setCookie(cookieName, { analytic: analytic }, analytic ? 365 : 1);
		dispatch('nacc_event', { text: 'Options Saved', analytic: analytic });
	}

	function showOptions() {
		analytic = cookie ? cookie.analytic : false;
		fab_show = false;
		banner_show = false;
		sidebar_show = true;
	}

	function accept() {
		cookie = setCookie(cookieName, { analytic: true }, 365 );
		dispatch('nacc_event', { text: 'Cookies Accepted', analytic: cookie.analytic });
		banner_show = false;
		fab_show = true;
	}

	onMount(async () => {
		await tick();

		if (!cookieName) {
			throw 'You must set the cookie name';
		}

	    cookie = getCookie(cookieName);

		if (!cookie) {
			analytic = false;
			banner_show = true;
			sidebar_show = false;
			fab_show = false;
		} else {
			analytic = cookie.analytic;
			fab_show = true;
		}
		dispatch('nacc_event', { text: 'Initialize', analytic: analytic });
	});
</script>

<style lang="scss">
	.banner-content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		& .subtitle {
			display: block;
		}
	}
	.bumpf {
		min-width: 220px;
		flex: 4 0 0;
		margin-right: 1em;
	}
	.actions {
		flex: 1 0 0;
		display: inline-block;
		white-space: nowrap;
		
	}

	.has-margin-top {
		margin-top: 50px;
	}

	@media (max-width: 768px) {
		.has-margin-top {
			margin-top: 10px;
		}
		.actions {
			margin-top: 10px;
			justify-content: space-around;
		}
	}
</style>

<!-- Allow the exported props to be set externally -->
<svelte:options accessors />

<Fab bind:active={fab_show} theme={theme} on:click={showOptions} />

<Sidebar
	on:message
	bind:active={sidebar_show}
	on:cancel={cancelled}
	title={optionsText.title}>

	<p class='is-size-6-mobile'>
		{optionsText.preamble}
	</p>

	<h5 class="title is-size-6-mobile has-margin-top">{optionsText.requiredHeadline}</h5>
	<div class="field">
		<Switch checked={true} type="is-dark" disabled>{optionsText.requiredSlider}</Switch>
	</div>
	<p class='is-size-7-mobile'>
		{optionsText.required}
	</p>

	<h5 class="title is-size-6-mobile has-margin-top">{optionsText.analyticsHeadline}</h5>
	<div class="field">
		<Switch bind:checked={analytic} type={theme}>{optionsText.analyticsSlider}</Switch>
	</div>
	<p class='is-size-7-mobile'>
		{optionsText.analytics}
	</p>

	<div slot="footer">
		<div class="has-text-centered">
		<p class="is-size-7-mobile has-text-centered">
		<a href={aboutCookies} target="_blank">{optionsText.aboutCookies}</a> | <a href={cookiePolicy}>{optionsText.cookiePolicy}</a>
		</p>
			<Button type={theme} on:click={save}>{optionsText.saveButton}</Button>
		</div>
	</div>
</Sidebar>

<Banner
	type={theme}
	bind:active={banner_show}
	icon="cookie-bite"
	showClose={false}>
	<div class="banner-content">
		<div class="bumpf">
			<p>
				<span class="subtitle is-5 has-text-weight-semibold">
					{bannerText.headline}
				</span>
				{bannerText.strapline}
			</p>

		</div>
		<div class="actions">

			<Button type={theme} outlined on:click={showOptions}>
				{bannerText.optionsButton}
			</Button>
			<Button type={theme} on:click={accept}>{bannerText.acceptButton}</Button>

		</div>
	</div>
</Banner>
