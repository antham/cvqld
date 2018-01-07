build-prod:
	docker-compose build --build-arg API_URL=http://c-est-vous-qui-le-dites.fr/api/v1 javascript stylesheet server api database
push:
	docker-compose push server api
