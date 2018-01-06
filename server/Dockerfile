FROM antham/cqlvd-javascript as javascript

FROM antham/cqlvd-stylesheet as stylesheet

FROM alpine:3.6

RUN apk add --no-cache ca-certificates nginx && \
    mkdir /run/nginx && \
    adduser -H -D -G www-data www-data

COPY --from=javascript /app/bundle.js /public/js/
COPY --from=stylesheet /app/main.css /public/css/
COPY nginx.conf /etc/nginx/

CMD ["/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf"]
