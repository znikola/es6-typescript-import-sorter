TODO:

# Ts config json

- Should we include `dom` in `lib`?

## polyfills

- where to put polyfills? in lib's `index.ts`?
- it seems to me that we are importing the whole `core-js` lib in `polyfills.ts`. That's fine only if we can tree-shake it when building for `prod`. Not sure this is the case right now.
- Hence, it might be better to read a bit about polyfills and figure out which ones do we need.

# Docs

- write a dev guide how to develop

* `yarn install`
* `yarn watch` (will block one terminal tab)
* whenever you make a change, it will automatically be picked up by `tsc`
* Quick and dirty way to run cli version: `./node_modules/.bin/ts-node ./bin/index.js`
* OR, do `yarn link`. Then, in the extension run `yarn link import-sorter`. After this, you will be able to

```
const lib = require('import-sorter');
lib.sortImports();
```

After testing, make sure to unlink import-sorter, by navigating to it and `yarn unlink`

- `yarn build:prod` for a production build

# Future

- Run the sort-imports on our code base(s)
- An option to specify a path or a file(s) in which to sort imports. If no option is specified, run on all files.
  - Maybe use this: https://nodejs.org/api/path.html#path_path_isabsolute_path
  - We can maybe use one `files` argument, which can be an array of either directories or files. If it's a file, run the lib on it. If it's a directory, run the lib on the files inside it. Optionally, if `recursive` flag is up, continue to iterate through directories recursevly
