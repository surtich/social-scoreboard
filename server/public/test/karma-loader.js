'use strict';
mocha.setup('bdd');
mocha.globals(['jQuery*']);
(function() {
  window.__karma__.loaded = function() {
    window.addEventListener('polymer-ready', function() {
      window.__karma__.start();
    });
  };
  

  var l = document.createElement('link');
  l.rel = 'import';
  l.href = 'base/bower_components/polymer/polymer.html';
  document.head.appendChild(l);
})();
