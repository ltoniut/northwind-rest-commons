# project makefile
# <northwind>

default: install


#
# install development dependencies
install:
	@bash ./scripts/install.sh

#
# > project startup
start:
	@bash ./scripts/start.sh

#
# > project shutdown
stop:
	@bash ./scripts/stop.sh

#
# > project build
build:
	@bash ./scripts/build.sh

#
# > project build
test:
	@bash ./scripts/test.sh

#
# > project analysis
analyze:
	@bash ./scripts/analyze.sh

#
# > project deployment
deploy:
	@bash ./scripts/deploy.sh

#
# > project publish
publish:
	@bash ./scripts/publish.sh

#
# > log in to npm to install private packages
npmLogin:
	@bash ./scripts/npmLogin.sh
#
# > log in to npm to install private packages
checkCredentials:
	@bash ./scripts/credentials.sh
