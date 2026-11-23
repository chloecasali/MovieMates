ci:
	npm run typecheck && \
	npm run lint && \
	npx prettier --check .

