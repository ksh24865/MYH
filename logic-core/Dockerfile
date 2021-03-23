FROM golang:1.13 as builder

WORKDIR /go/src/github.com/ksh24865/smart-park/logic-core
COPY . .

RUN go build -o main .

FROM alpine:latest
WORKDIR /bin/
COPY --from=builder /go/src/github.com/ksh24865/smart-park/logic-core/main .

ENTRYPOINT [ "./main" ]
