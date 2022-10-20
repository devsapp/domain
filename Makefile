.PHONY: push

CURRENT_BRANCH_NAME := $(shell git symbolic-ref --short HEAD)

add:
	git add .

commit: add
	git-cz

rebase-main: commit
	git pull --rebase origin master

push:
	git push --force-with-lease origin $(CURRENT_BRANCH_NAME)

release-dev: push
	-gh release delete dev -y
	-git tag -d dev
	-git push origin :refs/tags/dev
	gh release create dev --notes "dev release" --target dev --title "Release dev"

package-zip:
	-rm -rf ../../../dist/helper-function-code/nslookup.zip
	-mkdir -p ./dist/helper-function-code
	zip -rj ./dist/helper-function-code/nslookup.zip ./src/helper-function-code/nslookup/*
