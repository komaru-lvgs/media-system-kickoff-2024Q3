FROM golang:1.22 as build

WORKDIR /usr/src/app
COPY . .

RUN go build main.go

FROM golang:1.22 as app

WORKDIR /app

COPY --from=build /usr/src/app/main ./main
COPY .env ./

EXPOSE 8080

CMD ["./main"]