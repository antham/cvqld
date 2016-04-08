format:
	go fmt ./...
watchify:
	cd javascript && watchify -v -t [ babelify --presets [ es2015 react ] ] -o ../public/js/bundle.js index.js &
uglify:
	cd javascript && browserify -v -t [ babelify --presets [ es2015 react ] ] index.js|uglifyjs > ../public/js/bundle.js
sass:
	 sassc -t compressed -I stylesheet/bower_components/ stylesheet/*.sass public/css/main.css
set-base-dev-url:
	echo "'use strict';">javascript/url.js
	echo "module.exports = 'http://localhost:9000/api/v1';">>javascript/url.js
	sed -i "s/http.port = .*/http.port = 9000/" conf/app.conf
set-base-prod-url:
	echo "'use strict';">javascript/url.js
	echo "module.exports = 'http://c-est-vous-qui-le-dites.fr/api/v1';">>javascript/url.js
	sed -i "s/http.port = .*/http.port = 80/" conf/app.conf
build:
	revel package github.com/antham/askme
deploy:
	ssh user@c-est-vous-qui-le-dites.fr "rm -rf *"
	scp askme.tar.gz user@c-est-vous-qui-le-dites.fr:~/
	ssh user@c-est-vous-qui-le-dites.fr "tar xf askme.tar.gz"
	ssh user@c-est-vous-qui-le-dites.fr "rm askme.tar.gz"
	ssh user@c-est-vous-qui-le-dites.fr	"sudo pkill -9 askme &2>/dev/null"
	ssh user@c-est-vous-qui-le-dites.fr "sudo -E bash -c 'nohup ./askme -importPath github.com/antham/askme -srcPath src -runMode prod &'"
build-prod: sass set-base-prod-url uglify build deploy
build-dev: set-base-dev-url watchify
