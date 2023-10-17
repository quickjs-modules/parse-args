# parse-args

This packages exports a function that parses arguments from `scriptArgs`.
It returns an iterable that can be processed in `for-of`-loops.
Currently, it supports:

- flags and arguments
- flags prefixed with a single or two dashes
- multiple occurance of the same flag

script.js:

```javascript
import parseArgs from "./parse-args.js";

Array.from(parseArgs());
```

```bash
qjs script.js foo bar baz -flag some_argument -some-other-flag
[
    [ARGUMENT, 'foo'],
    [ARGUMENT, 'bar'],
    [ARGUMENT, 'baz'],
    ['flag', 'some_argument'],
    ['some-other-flag', true],
]
```

Use `ARGUMENT` to match arguments before flags:

```javascript
import parseArgs, { ARGUMENT } from "./parse-args.js";

for (const [flag, value] of parseArgs()) {
  switch (flag) {
    case ARGUMENT:
      runCommand(value);
      continue;
    case "help":
      printHelp();
      exit(0);
    default:
      throw Error(`Option '${flag}' is not supported`);
  }
}
```
