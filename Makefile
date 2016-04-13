format:
	go fmt ./...
watchify:
	cd javascript && watchify -v -t [ babelify --presets [ es2015 react ] ] -o ../public/js/bundle.js index.js &
uglify:
	pkill -9 -f watchify &2>/dev/null
	cd javascript && browserify -v -t [ babelify --presets [ es2015 react ] ] index.js|uglifyjs > ../public/js/bundle.js
sass:
	 sassc -t compressed -I stylesheet/bower_components/ stylesheet/*.sass public/css/main.css
build:
	go build -o cvqld main.go
send:
	scp -r templates/ cvqld user@c-est-vous-qui-le-dites.fr:~/
	ssh user@c-est-vous-qui-le-dites.fr	"pkill -9 cqlvd &2>/dev/null"
	ssh user@c-est-vous-qui-le-dites.fr "nohup /home/user/cvqld &"
set-base-dev-url:
	echo "'use strict';">javascript/url.js
	echo "module.exports = 'http://localhost:9000/api/v1';">>javascript/url.js
set-base-prod-url:
	echo "'use strict';">javascript/url.js
	echo "module.exports = 'http://c-est-vous-qui-le-dites.fr/api/v1';">>javascript/url.js
deploy-front: sass set-base-prod-url uglify
	ssh user@c-est-vous-qui-le-dites.fr "rm -rf public/ "
	scp -r public/ user@c-est-vous-qui-le-dites.fr:~/public
deploy-back: build send
start-dev-back:
	go run main.go
start-dev-front: set-base-dev-url watchify
