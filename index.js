const { statSync } = require("fs");
const glob = require("glob").sync;

const args = process.argv.slice(2);

const target = args.shift();

const patterns = args;

if (target) {
  const { mtimeMs: refTime } = statSync(target);
  for (const pattern of patterns) {
    const files = glob(pattern);

    for (const file of files) {
      const { mtimeMs } = statSync(file);
      if (mtimeMs > refTime) {
        process.exit(1);
      }
    }
  }
}
