## Sanitiser - Sanitises JSON objects and Arrays

- Removes blank values in arrays as well JSON objects..
- Blank values are taken to be `null`, `undefined`, and `''`.
- Arrays and JSON objects are also said to be blank if all their children have values determined to be blank after sanitisation.

### To run:

- Install Node
- Run `node main.js`