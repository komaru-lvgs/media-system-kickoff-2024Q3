```bash
# create module
go mod init nakapro
# start db
docker compose up -d
# remove db
docker compose rm -s -f -v
# start app
GO_ENV=dev go run .
# run migrate
GO_ENV=dev go run migrate/migrate.go
# run seeder
GO_ENV=dev go run seed/seed.go
```

## 環境構築

0. .env.example の中身をコピーして.env ファイルを作成
1. docker compose up -d
2. go mod tidy (しなくてもいけるかも)
3. GO_ENV=dev go run main.go

postman など使って動作確認

注意！
env ファイルは push しない
