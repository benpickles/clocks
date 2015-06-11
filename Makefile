AUTOPREFIXER=./node_modules/.bin/autoprefixer
JSX=./node_modules/.bin/jsx --cache-dir=tmp --harmony
NODEMON=./node_modules/.bin/nodemon -e js,scss --quiet
SASS=./node_modules/.bin/node-sass --output-style=compressed
UGLIFY=./node_modules/.bin/uglifyjs --compress --mangle

_SCSS=$(shell ls _scss)
CSS=$(addprefix css/, $(_SCSS:.scss=.css))
JS=$(addprefix js/, $(shell ls _js))

default: watch

build: css js

clean:
	rm -fr css js tmp

css: $(CSS)

css/%.css: _scss/%.scss
	@mkdir -p css
	cat $< | $(SASS) | $(AUTOPREFIXER) > $@

ga: $(shell git ls-files ./*.html | grep -v "^_")
	for i in $^; do ./_ga $$i; done

js: $(JS)

js/%.js: _js/%.js
	@mkdir -p js
	$(JSX) $< | $(UGLIFY) > $@

watch:
	$(NODEMON) --exec "make build"

.PHONY: clean ga watch
