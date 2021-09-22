const Process = require('./process')

/**
 * Runs the main routine
 * @returns {Promise<void>}
 */
async function main() {
  console.info('cwd: ' + process.cwd())
  await Process.spawn('npx yarn add @action/core')
  const core = require('@actions/core')

  await Process.spawn('npx yarn install')
  await Process.spawn('npx lerna bootstrap')
  const result = await Process.spawn('npx lerna exec -- tsc --project jsconfig.json')
  if (result.exitCode !== 0) {
    core.setFailed(result.stderr)
  }
}

main()
