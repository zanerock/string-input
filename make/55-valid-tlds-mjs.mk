VALID_TLDS_MJS:=$(SRC)/lib/valid-tlds.mjs

$(VALID_TLDS_MJS): $(UPDATE_TLDS_JS)
	node $(UPDATE_TLDS_JS)

BUILD_TARGETS+=$(VALID_TLDS_MJS)
PHONY_TARGETS+=$(VALID_TLDS_MJS) # always update because the TLD data may have changed