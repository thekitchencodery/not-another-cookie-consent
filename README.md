# Not Another Cookie Consent
    Minimal Cookie Consent banner and options for necessary/analytic cookies.

## What
* A banner when user first hit the site
* A mini button pinned to the bottom of the browser to access the options
* A sidebar with the cookie options (enable/disable analytic cookie)
* Event triggered whenever the cookie authorization state changes 

## Why
Mostly because I'm still learning, playing around with Svelte3 and I needed a Cookie Banner for another project so why not.

## How
Uses [Bulma](https://bulma.io) and [Svelma](https://github.com/c0bra/svelma) to do most of the UI stuff.
* Which is probably overkill and why the minified bundle is a bit bloaty

Uses [Svelte](https://svelte.dev/) to do the heavy lifting.
* Again probably overkill - but I **wanted** to use it.

## todo
* [ ] It's way too big (see the above).
* [ ] Support other types of cookie (only 'necessary' and 'analytic' at the mo)
* [ ] Look at svelte Custom Elements - couldn't get this to work the first time around
* [ ] Look at [Emotion](https://emotion.sh) for `CSS-in-JS` 
* [ ] pretty much everything really

## Dogfooding
I wrote this because I needed something like it for [howbusynow.com](https://howbusynow.com) and it does what I need and only what I need.

If you are looking for a general purpose cookie consent banner there are probably better (and definitely smaller) options out there: [GDPR Cookie Topic](https://github.com/topics/gdpr-cookie)

That said if you really want to use this one feel free:

1. You'll need a [fontawesome kit](https://fontawesome.com/start) and [Google Analytics](https://analytics.goolge.com)
2. Add the scripts to your `<head>` tag:

```html
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-000000000-0"></script>

  <!-- Create your own font awesome kit https://fontawesome.com/start -->
  <script src="https://kit.fontawesome.com/a123456789.js" crossorigin="anonymous"></script>

  <script src="https://cdn.jsdelivr.net/gh/thekitchencodery/not-another-cookie-consent/dist/index.min.js">
```

1. Put the following at the end of the `<body>` tag

```javascript
<div id='cookieConsentWidget'></div>

<script>
  var gtagId = 'UA-000000000-0';

  // Disable tracking by default
  window['ga-disable-' + gtagId] = true;
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  };
  gtag('js', new Date());

  let widget = new CookieConsent.nacc({
    target: document.getElementById('cookieConsentWidget'),
    props: {

    }
  });

  widget.$on('nacc_event', (event) => {
    let analytics = event.detail.analytic;
    window['ga-disable-' + gtagId] = !analytics;
    if (analytics) {
      gtag('config', gtagId);
    }
  });
  </script>
```

There's an example in the `public` folder:
 
    git clone https://github.com/thekitchencodery/not-another-cookie-consent.git
    cd not-another-cookie-consent
    npm install

Edit the `public/index.html` to use your [Font Awesome Kit](https://fontawesome.com/start) 

Then
    npm run dev

And open your browser to http://localhost:5000 
   

