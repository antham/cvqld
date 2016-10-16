FROM base/archlinux

ENV GOPATH /go

RUN pacman -Syy && \
pacman -S --noconfirm go git

COPY main.go /go/src/github.com/antham/askme/
COPY models /go/src/github.com/antham/askme/models/
COPY templates /templates/

WORKDIR /go/src/github.com/antham/askme/

RUN go get -v && \
go install

EXPOSE 9000

WORKDIR /


CMD /go/bin/askme
