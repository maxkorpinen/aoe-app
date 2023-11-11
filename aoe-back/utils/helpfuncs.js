const fs = require('fs')
const redline = require('readline')

async function getLastUpdate() {
  const fileStream = fs.createReadStream('matches_update/updater_log.txt')

  const rl = redline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let latest= ''
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    latest= line
  }
  return latest
}

module.exports = { getLastUpdate }