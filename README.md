TODO:

# Ts config json

- Should we include `dom` in `lib`?
- `sourceMap` is set to `false`. This should be true for development, and `false` for `prod`.

## polyfills

- it seems to me that we are importing the whole `core-js` lib in `polyfills.ts`. That's fine only if we can tree-shake it when building for `prod`. Not sure this is the case right now.
- Hence, it might be better to read a bit about polyfills and figure out which ones do we need.

# TSlint

- add library
- add tslint.json
- configure it

# Docs

- write a dev guide how to develop

* `yarn install`
* `yarn watch` (will block one terminal tab)
* whenever you make a change, it will automatically be picked up by `tsc`
* run `./node_modules/.bin/ts-node src/index.ts`
* OR, `yarn link`. Make sure to ulink: `npm unlink`

# Future

- Add the sort-imports lib as a dependency here, and execute it
- An option to specify a path or a file(s) in which to sort imports. If no option is specified, run on all files
