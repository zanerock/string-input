# This file was generated by @liquid-labs/sdlc-projects-workflow-local-node-build.
# Refer to https://npmjs.com/package/@liquid-labs/sdlc-projects-workflow-local-
# node-build for further details

SDLC_BABEL:=npx babel
SDLC_BABEL_CONFIG:=$(shell npm explore @liquid-labs/sdlc-resource-babel-and-rollup -- pwd)/dist/babel/babel.config.cjs

SDLC_ROLLUP:=npx rollup
SDLC_ROLLUP_CONFIG:=$(shell npm explore @liquid-labs/sdlc-resource-babel-and-rollup -- pwd)/dist/rollup/rollup.config.mjs

SDLC_JEST:=npx jest
SDLC_JEST_CONFIG:=$(shell npm explore @liquid-labs/sdlc-resource-jest -- pwd)/dist/jest.config.js

CATALYST_ESLINT:=npx eslint
CATALYST_ESLINT_CONFIG:=$(shell npm explore @liquid-labs/sdlc-resource-eslint -- pwd)/dist/eslint.config.cjs
