SRCDIR := src
DESTDIR := dist

HAML_FILES := $(wildcard ${SRCDIR}/*.haml)
HTML_FILES := $(patsubst ${SRCDIR}/%.haml,${DESTDIR}/%.html,${HAML_FILES})

JS_IN_FILES := $(wildcard ${SRCDIR}/js/*.js)
JS_OUT_FILES := $(patsubst ${SRCDIR}/js/%.js,${DESTDIR}/js/%.js,${JS_IN_FILES})

SCSS_FILES := $(wildcard ${SRCDIR}/css/*.scss)
CSS_FILES := $(patsubst ${SRCDIR}/css/%.scss,${DESTDIR}/css/%.css,${SCSS_FILES})

.PHONY: all
all: ${HTML_FILES} ${JS_OUT_FILES} ${CSS_FILES}

.PHONY: clean
clean:
	rm -rv dist

${DESTDIR}/%.html: ${SRCDIR}/%.haml ${DESTDIR}
	haml $< $@

.PRECIOUS: ${DESTDIR}/js/%.js
${DESTDIR}/js/%.js: ${SRCDIR}/js/%.js ${DESTDIR}/js 
	cp $< $@

.PRECIOUS: ${DESTDIR}/css/%.css
${DESTDIR}/css/%.css: ${SRCDIR}/css/%.scss ${DESTDIR}/css
	sass $< $@

${DESTDIR}:
	mkdir ${DESTDIR}

${DESTDIR}/js:
	mkdir ${DESTDIR}/js

${DESTDIR}/css:
	mkdir ${DESTDIR}/css
