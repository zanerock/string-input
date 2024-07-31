UPDATE_TLDS_JS:=tool/update-tlds.js
UPDATE_TLDS_ENTRY:=src/update-tlds/update-tlds.mjs
BUILD_TARGETS+=$(UPDATE_TLDS_JS)

$(UPDATE_TLDS_JS): package.json $(UPDATE_TLDS_ENTRY) $(SRC)/email.mjs
	JS_BUILD_TARGET=$(UPDATE_TLDS_ENTRY) \
		JS_OUT=$@ \
		$(SDLC_ROLLUP) --config $(SDLC_ROLLUP_CONFIG)
