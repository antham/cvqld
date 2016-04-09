format:
	go fmt ./...
build:
	rm -rf /tmp/build
	revel package github.com/antham/askme /tmp/build
send:
	scp askme.tar.gz user@c-est-vous-qui-le-dites.fr:~/
	ssh user@c-est-vous-qui-le-dites.fr "tar xf askme.tar.gz && rm -rf askme.tar.gz"
	ssh user@c-est-vous-qui-le-dites.fr	"sudo pkill -9 askme &2>/dev/null"
	ssh user@c-est-vous-qui-le-dites.fr "sudo -E bash -c 'nohup ./askme -importPath github.com/antham/askme -srcPath src -runMode prod &'"
deploy: build send
start-dev:
	revel run github.com/antham/askme
