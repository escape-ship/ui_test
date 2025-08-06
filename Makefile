all: build

pushall:
@docker build -t ghcr.io/escape-ship/ui_test:latest .
@docker push ghcr.io/escape-ship/ui_test:latest