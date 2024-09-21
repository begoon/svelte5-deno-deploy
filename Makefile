.PHONY: build

all:

build:
	deno task build

dev:
	deno task dev

run:
	deno run -A build/index.js
