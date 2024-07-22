VALID_TLDS_MJS:=src/lib/valid-tlds.mjs
VALID_TLDS_GENERATOR:=src/update-tlds/update-tlds.mjs

$(VALID_TLDS_MJS): # always update, so no dependencies
	node $(VALID_TLDS_GENERATOR)

BUILD_TARGETS+=$(VALID_TLDS_MJS)
PHONY_TARGETS+=$(VALID_TLDS_MJS)