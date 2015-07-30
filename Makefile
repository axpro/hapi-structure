pretest:
	@node ./node_modules/.bin/jshint .
test:
	@node ./node_modules/lab/bin/lab -v -C -c -r console -o stdout -r html -o coverage.html test

.PHONY: pretest test