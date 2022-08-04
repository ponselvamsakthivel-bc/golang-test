FROM public.ecr.aws/docker/library/golang:1.18.3-alpine as base

RUN mkdir /app
COPY ./ /app
WORKDIR /app

RUN go mod download
RUN go build -o /output/server ./

RUN GOOS=linux GOARCH=amd64 go build -o /app/bin/server /app/cmd/server

FROM public.ecr.aws/docker/library/alpine:3.16.0

RUN apk --no-cache add ca-certificates

COPY --from=base /app/bin/server /usr/local/bin/

EXPOSE 10000

CMD server