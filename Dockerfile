FROM base/archlinux

ENV GOPATH /go
ENV PATH "${PATH}:/go/src/github.com/antham/askme/"

RUN pacman -Syy && \
pacman -S --noconfirm go git && \
go get -v github.com/mitchellh/gox

COPY main.go /go/src/github.com/antham/askme/
COPY models /go/src/github.com/antham/askme/models/
COPY templates /templates/

WORKDIR /go/src/github.com/antham/askme/

RUN go get -v && \
/go/bin/gox -os="linux"

EXPOSE 9000
