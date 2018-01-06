FROM golang:1.9 as server

RUN go get -u github.com/golang/dep/cmd/dep
RUN mkdir -p /go/src/github.com/antham/cqlvd

WORKDIR /go/src/github.com/antham/cqlvd

COPY Gopkg.* ./

RUN dep ensure -v -vendor-only

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:3.6

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY templates /templates/
COPY --from=server /go/src/github.com/antham/cqlvd/main .

ENTRYPOINT ["./main"]
