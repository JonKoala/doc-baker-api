const angularExpressions = require('angular-expressions')


angularExpressions.filters = Object.assign(angularExpressions.filters, {
  upper: (input) => (input) ? input.toUpperCase() : input,
  lower: (input) => (input) ? input.toLowerCase() : input,
  capitalize: (input) => (input) ? input.charAt(0).toUpperCase() + input.slice(1) : input,
  concat: (input, path) => input.map(v => eval(`v.${path}`)).join(', '),
  assign: (input) => ''
})

module.exports = (tag) => {
  if (tag === '.')
    return { get: (s) => s }
  return { get: (s) => angularExpressions.compile(tag.replace(/(’|“|”)/g, "'"))(s) }
}
