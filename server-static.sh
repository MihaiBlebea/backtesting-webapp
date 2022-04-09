#!/bin/bash

npx live-server \
	-port=8080 \
	--ignore=./mock \
	--mount=/:./public
