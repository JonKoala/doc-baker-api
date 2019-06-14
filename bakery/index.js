const angularExpressions = require('angular-expressions')
const axios = require('axios')
const Docxtemplater = require('docxtemplater')
const Jszip = require('jszip')

const cheerio = require('cheerio')


const modules = {
  'MTP': require('./modules/mtp')
}

angularExpressions.filters = Object.assign(angularExpressions.filters, {
  upper: (input) => (input) ? input.toUpperCase() : input,
  lower: (input) => (input) ? input.toLowerCase() : input,
  capitalize: (input) => (input) ? input.charAt(0).toUpperCase() + input.slice(1) : input,
  concat: (input, path) => input.map(v => eval(`v.${path}`)).join(', '),
  assign: (input) => ''
})

function angularParser(tag) {
  if (tag === '.')
    return { get: (s) => s }
  return { get: (s) => angularExpressions.compile(tag.replace(/(’|“|”)/g, "'"))(s) }
}

async function getTemplateFullName (templateName) {

  var reg = new RegExp(`${templateName}(%20.+)?\\.docx`)
  var response = await axios.get(process.env['DOCBAKER_TEMPLATES_URL'])

  var templateFullName = null
  cheerio.load(response.data)('a').each((i, e) => {
    var matched = reg.test(e.attribs.href)
    templateFullName = (matched) ? e.attribs.href : null
    return !matched
  })
  return templateFullName
}

module.exports = {
  async bake (templateName, processo) {

    templateFileName = await getTemplateFullName(templateName)

    var response = await axios.get(`${process.env['DOCBAKER_TEMPLATES_URL']}/${templateFileName}`, { responseType: 'arraybuffer' })
    var template = response.data
    var templateParameters = await modules[templateName].getParameters(processo)

    var templater = new Docxtemplater()
    templater.loadZip(new Jszip(template)).setData(templateParameters).setOptions({ paragraphLoop: true, parser: angularParser })
    templater.render()

    return templater.getZip().generate({ type: 'nodebuffer' })
  }
}
