# vuex-solidification

Persist and rehydrate your [Vuex](http://vuex.vuejs.org/) state between page reloads.

<hr />

## Requirements

- [Vue.js](https://vuejs.org) (v2.0.0+)
- [Vuex](http://vuex.vuejs.org) (v2.0.0+)

## Install

```bash
npm install --save vuex-solidification
```

## Usage

```js
import createPersistedState from 'vuex-solidification'

const store = new Vuex.Store({
  // default, use localstorage to save all state in vuex
  plugins: [createPersistedState()], 
})

// or
const store = new Vuex.Store({
  // just store the key in state
  plugins: [createPersistedState(
      local: {
          include: ['a.b.c'] // just store state.a.b.c use localStorage
      }
  )], 
})

// or
const store = new Vuex.Store({
  // just store the key in state
  plugins: [createPersistedState(
      local: {
          exclude: ['a.b.c'] // just store all value except state.a.b.c use localStorage
      }
  )], 
})

// or
const store = new Vuex.Store({
  // just store the key in state
  plugins: [createPersistedState(
      session: {
          include: ['a.b.c'] // just store state.a.b.c in sessionStorage
      }
  )], 
})

// or
const store = new Vuex.Store({
  // just store the key in state
  plugins: [createPersistedState(
      session: {
          exclude: ['a.b.c'] // just store all value except state.a.b.c use sessionStorage
      }
  )], 
})

// or 
const store = new Vuex.Store({
  // just store the key in state
  plugins: [createPersistedState(
      session: {
          include: ['a.b.c'] // store state.a.b.c in sessionStorage
      },
      local: {
          include: ['a.b.d'] // store state.a.b.c in localStorage
      }
  )], 
})

```
Check out the example on [CodeSandbox](https://codesandbox.io).

[![Edit kmz9jx5ynr](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/kmz9jx5ynr?fontsize=14)

## API

### `createPersistedState({options})`

Creates a new instance of the plugin with the given options. The following options
can be provided to configure the plugin for your specific needs:

- `key <String>`: The key to store the persisted state under. (default: **vuex**)

- `local <Object>`: use localSrorage, Two optional values is include`<Array>` and exclude`<Array>`
    `include<Array>`: the value in include represents the value need to saved
    `exclude<Array>`: the value in exclude represents the value no need to saved

- `session <Object>`: Same configuration as local





