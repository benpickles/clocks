AUTOPREFIXER=./node_modules/.bin/autoprefixer
JSX=./node_modules/.bin/jsx --cache-dir=tmp
SASS=./node_modules/.bin/node-sass

ALL=css/home.css css/16.css js/16.js

all: $(ALL)

js/%.js: _js/%.js
	$(JSX) $< > $@

css/%.css: _scss/%.scss
	cat $< | $(SASS) | $(AUTOPREFIXER) > $@
