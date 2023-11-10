create: 
	migrate create -ext sql -dir migrations -seq create_consults_table

migrate-up:
	migrate -path migrations -database "postgres://tkvvetoe:htz-DcDZtnX0BdSImqB1UcYnz6kyFMk9@mouse.db.elephantsql.com/tkvvetoe" -verbose up

migrate-rollback:
	migrate -path migrations -database "postgres://tkvvetoe:htz-DcDZtnX0BdSImqB1UcYnz6kyFMk9@mouse.db.elephantsql.com/tkvvetoe" -verbose down

run:
	go run ./cmd/api/main.go

build:
	go build -o ./dist/app ./cmd/api/main.go 

test:
	hello $(variable)

daemon:
	CompileDaemon -build="go build -o ./build/main cmd/api/main.go" -command="./build/main"