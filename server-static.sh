#!/bin/bash

npx live-server \
	-port=8080 \
	--ignore=./mock \
	--mount=/:./html \
	--mount=/css:./css \
	--mount=/js:./js \
	--mount=/assets:./assets
