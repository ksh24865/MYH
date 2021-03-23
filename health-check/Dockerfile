FROM golang:1.13

WORKDIR $GOPATH/src/github.com/ksh24865/smartpark/health-check
COPY . $GOPATH/src/github.com/ksh24865/smartpark/health-check

RUN go build -o main .

ENTRYPOINT [ "./main" ]