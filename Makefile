format:
	go fmt ./...
watchify:
	cd javascript && watchify -v -t [ babelify --presets [ es2015 react ] ] -o ../public/js/bundle.js index.js &
uglify:
	pkill -9 -f watchify &2>/dev/null
	cd javascript && browserify -v -t [ babelify --presets [ es2015 react ] ] index.js|uglifyjs > ../public/js/bundle.js
sass:
	sassc -t compressed -I stylesheet/bower_components/ stylesheet/*.sass public/css/main.css
set-base-dev-url:
	echo "'use strict';">javascript/url.js
	echo "module.exports = 'http://localhost/api/v1';">>javascript/url.js
set-base-prod-url:
	echo "'use strict';">javascript/url.js
	echo "module.exports = 'http://c-est-vous-qui-le-dites.fr/api/v1';">>javascript/url.js
start-dev-front: set-base-dev-url watchify
