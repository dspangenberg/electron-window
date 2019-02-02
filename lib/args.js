var assert = require('assert')
var path = require('path')
var url = require('url')

function encode (args) {
  args = args || null
  assert.strictEqual(typeof args, 'object', 'args must be an object')
  // stringify the args
  args = args ? encodeURIComponent(JSON.stringify(args)) : ''
  return args
}

function urlWithArgs (urlOrFile, args) {
  args = encode(args)

  var u
  if (urlOrFile.indexOf('app') === 0 || urlOrFile.indexOf('data') === 0) {
    return urlOrFile
  } else { // presumably a file url
    u = url.format({
      protocol: 'file',
      pathname: path.resolve(urlOrFile),
      slashes: true,
      hash: args || undefined
    })
  }

  return u
}

module.exports = {
  encode: encode,
  urlWithArgs: urlWithArgs
}
