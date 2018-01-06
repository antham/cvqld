build-prod:
	docker-compose build --build-arg API_URL=http://c-est-vous-qui-le-dites.fr/api/v1 javascript
push:
	docker-compose push antham/cqlvd-server antham/cqlvd-api
