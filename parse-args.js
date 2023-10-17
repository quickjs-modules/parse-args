const FLAG_PREFIX = "-";
export const ARGUMENT = Symbol("argument");

export function* parse(args) {
  let arg;
  outer: while ((arg = args.shift())) {
    const isLast = args.length === 0;

    if (_isFlag(arg)) {
      const flagName = _flagName(arg);
      if (isLast) {
        yield [flagName, true];
        break;
      }
      let i = 0;
      for (const _a of args) {
        if (_isFlag(_a)) {
          if (i === 0) {
            yield [flagName, true];
            continue outer;
          }
          break;
        }
        yield [flagName, _a];
        i++;
      }
      args.splice(0, i);
      continue;
    }

    yield [ARGUMENT, arg];
  }
}

export default function parseArgs() {
  return parse(scriptArgs.slice(1));
}

function _isFlag(value) {
  return value.startsWith(FLAG_PREFIX);
}

function _flagName(value) {
  let i = 0;
  for (const char of value) {
    if (char === FLAG_PREFIX) {
      i++;
      continue;
    }
    return value.slice(i);
  }
  return value.slice(FLAG_PREFIX.length);
}
