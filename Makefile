format:
	go fmt ./...
watchify:
	cd javascript && watchify -v -t [ babelify --presets [ es2015 react ] ] -o ../public/js/bundle.js index.js
uglify:
	cd javascript && browserify -v -t [ babelify --presets [ es2015 react ] ] index.js|uglifyjs > ../public/js/bundle.js
sass:
	 sassc -t compressed stylesheet/* public/css/main.css
