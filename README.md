## DySEL - DYnamic Sequential Ext_res Loader

http://sun2rise.github.io/dysel/  
` DySEL` is an asynchronous sequential resources (JavaScript and CSS) loader.  
It stacks resources and loads them so that the next resource is loaded only when the previous one is ok.

You can set a final callback that will execute at the end of all the loadings.  
You can set the *nocache* flag true if you want to reload for sure the resources.  
You can set the *debug* flag true if you want a minimal console feedback about what's going on.

It works with javascript, css and, as bonus, with [Google Fonts](https://www.google.com/fonts).

It is super small: 2.2Kb in plain text, **0.8Kb** minified.

### Scenario example
- *You want to dynamically load* a jQuery plugin only after jQuery itself is loaded.
- *You want to dynamically load* css and javascript in a specific order, as fast as you can.
- *You want to dynamically load* Google fonts [as they specify](https://developers.google.com/fonts/docs/getting_started#Overview).

### Usage

We want to load Lobster Font and we want to use [Smoke](http://alfredobarron.github.io/smoke/#/) plugin for jQuery.  
Smoke require [jQuery](http://jquery.com/) and [Bootstrap](http://getbootstrap.com/) to work, so we need to load everything properly.  
That's how you can use DySEL for this: 

Embed DySEL just like always
``` html
<script type="text/javascript" src="dysel.js"></script>
```

Use it
``` js
var googleFont = 'http://fonts.googleapis.com/css?family=Lobster';
var jquery = 'https://code.jquery.com/jquery.js';
var bootstrapCss = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css';
var bootstrapJs = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js';
var smokeCss = 'css/smoke.min.css';
var smokeJs = 'js/smoke.min.js';

// push links into an array in the correct order
var extRes = [];
extRes.push(googleFont);
extRes.push(bootstrapCss);
extRes.push(smokeCss);
extRes.push(jquery);
extRes.push(bootstrapJs);
extRes.push(smokeJs);

// let this happen
dysel({
  links: extRes,
  callback: function() {console.log('now i can use smoke, this is awesome!');}, // optional
  nocache: false, // optional
  debug: false // optional
});
```

### License
MIT license. See LICENSE.txt  
