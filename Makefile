AUTOPREFIXER=./node_modules/.bin/autoprefixer
JSX=./node_modules/.bin/jsx --cache-dir=tmp --harmony
SASS=./node_modules/.bin/node-sass
UGLIFY=./node_modules/.bin/uglifyjs --compress --mangle

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

.PHONY: clean prepare
