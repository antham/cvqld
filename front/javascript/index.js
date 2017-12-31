'use strict';

require('./global');

if ($('#visitor').length > 0) {
  var Presentation = require('./views').presentation;

  ReactDOM.render(
  <Presentation email="&#108;&#97;&#108;&#117;&#115;&#105;&#109;&#111;&#110;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;" />,
    document.getElementById('visitor')
  );
}

if ($('#admin').length > 0) {
  var Admin = require('./views').admin;

  ReactDOM.render(
              <Admin />,
    document.getElementById('admin')
  );
}
