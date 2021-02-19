# DySEL - DYnamic Sequential Externals Loader

`DySEL` is an asynchronous sequential resources (JavaScript and CSS) loader.
It stacks resources and loads them so that the next resource is loaded only when the previous one is done.

You can set a final callback that will execute at the end of all the loadings.
You can set the _noCache_ flag true if you want to reload for sure the resources.
You can set the _debug_ flag true if you want a minimal console feedback about what's going on.

It works with javascript, css and, as bonus, with [Google Fonts](https://www.google.com/fonts).

## Scenario example

- _You want to dynamically load_ a jQuery plugin only after jQuery itself is loaded.
- _You want to dynamically load_ css and javascript in a specific order, as fast as you can.
- _You want to dynamically load_ Google fonts [as they specify](https://developers.google.com/fonts/docs/getting_started#Overview).

## Usage

We want to load Lobster Font and we want to use [Smoke](http://alfredobarron.github.io/smoke/#/) plugin for jQuery.
Smoke requires [jQuery](http://jquery.com/) and [Bootstrap](http://getbootstrap.com/) to work, so we need to load everything properly.
That's how you can use DySEL for this:

[jsFiddle example](https://jsfiddle.net/sunrising/qk0ybtnb/)

Embed DySEL just like always

```html
<script type="text/javascript" src="dysel.js"></script>
```

Use it

```js
const googleFont = 'https://fonts.googleapis.com/css?family=Lobster';
const jquery = 'https://code.jquery.com/jquery.js';
const bootstrapCss =
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css';
const bootstrapJs =
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js';
const smokeCss =
  'https://rawgit.com/alfredobarron/smoke/master/dist/css/smoke.min.css';
const smokeJs =
  'https://rawgit.com/alfredobarron/smoke/master/dist/js/smoke.min.js';

// push links into an array in the correct order
const extRes = [
  googleFont,
  bootstrapCss,
  jquery,
  bootstrapJs,
  smokeCss,
  smokeJs,
];

// let this happen
dysel({
  links: extRes,
  callback: () => alert('everything is now loaded, this is awesome!'), // optional
  noCache: false, // optional
  debug: false, // optional
});
```

Example [here](./example/index.html)

## License

MIT license. See [LICENSE](./LICENSE)
