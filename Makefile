s.SHELL=/bin/bash

# Default environment is "dev"
VPS_USER ?= gg
ENV ?= dev
VPS ?= $(VPS_USER)@$(ENV)

.PHONY: lint
lint:	##@ Run linter
	pnpm run check
	pnpm run lint

# .PHONY: test
# test: # TODO: this

.PHONY: format
format:	##@ Format code
	pnpm run format


.PHONY: build
build:	##@ Build the project (dist)
	pnpm run build
	tar -C build -czvf $(DEPLOY_TAR) .

.PHONY: pack
pack:	##@ Pack the project (src)
	pnpm pack --pack-destination build/


.PHONY: clean
clean:	##@ Clean build artifacts
	rm -rf build .svelte-kit .vite


.PHONY: serve
serve:	##@ Build and serve the project
	pnpm run serve || python3 -m http.server -d build


# Deploy environment variables
DEPLOYS_DIR_TMP ?= /tmp/deploys
NAME ?= $(shell node -p "require('./package.json').name.replace(/\//g, '-')")
VERSION ?= $(shell node -p "require('./package.json').version")
DEPLOY_TAR ?= $(NAME)-$(VERSION).tar.gz

.PHONY: deploy
deploy:	##@ Deploy the project
	@echo "Deploying $(ENV) to /var/www/app..."
	ssh $(VPS) 'mkdir -p $(DEPLOYS_DIR_TMP)'
	scp $(DEPLOY_TAR) $(VPS):$(DEPLOYS_DIR_TMP)/$(DEPLOY_TAR)
	ssh $(VPS) 'cd $(DEPLOYS_DIR_TMP) && \
		mkdir -p extracted-$(VERSION) && \
		tar -xzf $(DEPLOY_TAR) -C extracted-$(VERSION) && \
		rm -rf /var/www/app/* && \
		cp -r extracted-$(VERSION)/* /var/www/app/ && \
		chmod -R a+rX /var/www/app/ && \
		rm -rf extracted-$(VERSION) $(DEPLOY_TAR)'
	@echo "✓ Deployed UI homepage to $(ENV)."
