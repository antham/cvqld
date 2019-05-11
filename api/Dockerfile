FROM golang:1.12 as server

RUN mkdir -p /app

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:3.6

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY templates /templates/
COPY --from=server /app/main .

ENTRYPOINT ["./main"]
