format:
	go fmt ./...
build:
	go build -o cvqld main.go
send:
	scp -r templates/ cqlvd user@c-est-vous-qui-le-dites.fr:~/
	ssh user@c-est-vous-qui-le-dites.fr	"sudo pkill -9 cqlvd &2>/dev/null"
	ssh user@c-est-vous-qui-le-dites.fr "sudo -E bash -c 'nohup ./cqlvd &'"
deploy: build send
start-dev:
	go run main.go
