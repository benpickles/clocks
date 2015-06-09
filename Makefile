AUTOPREFIXER=./node_modules/.bin/autoprefixer
JSX=./node_modules/.bin/jsx --cache-dir=tmp --harmony
NODEMON=./node_modules/.bin/nodemon -e js,scss --quiet
SASS=./node_modules/.bin/node-sass
UGLIFY=./node_modules/.bin/uglifyjs --compress --mangle

default: watch

build: prepare css js

clean:
	rm -fr css js

css: css/home.css css/16.css

css/%.css: _scss/%.scss
	cat $< | $(SASS) | $(AUTOPREFIXER) > $@

js: js/16.js

js/%.js: _js/%.js
	$(JSX) $< | $(UGLIFY) > $@

prepare:
	@mkdir -p css js

watch:
	$(NODEMON) --exec "make build"

.PHONY: clean prepare watch
