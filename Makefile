AUTOPREFIXER=./node_modules/.bin/autoprefixer
JSX=./node_modules/.bin/jsx --cache-dir=tmp
SASS=./node_modules/.bin/node-sass

build: prepare css js

clean:
	rm -fr css js

css: css/home.css css/16.css

css/%.css: _scss/%.scss
	cat $< | $(SASS) | $(AUTOPREFIXER) > $@

js: js/16.js

js/%.js: _js/%.js
	$(JSX) $< > $@

prepare:
	mkdir -p css js

.PHONY: clean prepare
