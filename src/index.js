const dysel = function (options) {
  // get options
  const links = options.links;
  const callback = options.callback;
  const noCache = options.noCache;
  const debug = options.debug;

  // js and css file loader
  const loadJsCssFile = function (filename, cb) {
    filename = filename.toString();
    const ext = filename.split('.').pop();
    let fileRef = null;
    if (ext == 'js') {
      // for Javascript
      fileRef = document.createElement('script');
      fileRef.setAttribute('type', 'text/javascript');
      fileRef.setAttribute('src', filename);
    } else if (ext == 'css' || filename.indexOf('googleapis.com/css?') > -1) {
      // for CSS + google fonts
      fileRef = document.createElement('link');
      fileRef.setAttribute('rel', 'stylesheet');
      fileRef.setAttribute('type', 'text/css');
      fileRef.setAttribute('href', filename);
    }
    // callback trigger (w/debug if needed)
    if (typeof fileRef != 'undefined') {
      if (cb) {
        let myCallback = cb;
        if (debug) {
          // if debug redefine callback and add console.log
          myCallback = function () {
            console.log('Loaded NOW ' + (this.src || this.href) + ' >>');
            cb();
          };
        }
        // trigger the callback when resource is loaded
        fileRef.onreadystatechange = myCallback;
        fileRef.onload = myCallback;
      }
      if (debug) {
        console.log('Armed ' + filename);
      }
      // push it into the header
      // document.getElementsByTagName('head')[0].appendChild(fileRef);
      (document.head || document.documentElement).appendChild(fileRef);
    }
  };

  // START HERE, i nest the final callback at the deepest
  // (callbacks will be stacked in reverse order from here)
  let totalScript = callback;

  // create nested functions as callbacks,
  // at the end, if needed, the callback from options is executed
  // like func_1(loadFile_1, func_2(loadFile_2, func_3(loadFile_3, cbFromOptions)))
  for (let i = links.length - 1; i >= 0; i--) {
    const old = totalScript;
    let currentLink = links[i];
    if (noCache) {
      currentLink += '?' + +new Date().getTime();
    }
    totalScript = function (oldCb) {
      loadJsCssFile(this, oldCb);
    }.bind(currentLink, old);
  }
  // execute the nested callbacks
  totalScript();
};

export { dysel };
