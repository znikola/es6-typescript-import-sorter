TODO:

# Ts config json

- Should we include `dom` in `lib`?

## polyfills

- where to put polyfills? in lib's `index.ts`?
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
* Quick and dirty way to run cli version: `./node_modules/.bin/ts-node ./bin/index.js`
* OR, do `yarn link`. Then, in the extension run `yarn link import-sorter`. After this, you will be able to

```
const lib = require('import-sorter');
lib.sort();
```

After testing, make sure to unlink import-sorter, by navigating to it and `yarn unlink`

- `yarn build:prod` for a production build

# Future

- Add the sort-imports lib as a dependency here, and execute it
- As we are using TS, create `typings.d.ts` file (or similar) to export relevant types.
- An option to specify a path or a file(s) in which to sort imports. If no option is specified, run on all files
- Create a Config interface that can be passed if the lib is used
