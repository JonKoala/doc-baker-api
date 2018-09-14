const config = require('config')
const Docxtemplater = require('docxtemplater')
const fs = require('fs')
const Jszip = require('jszip')
const path = require('path')
const util = require('util')


const modules = {
  'MTP': require('./modules/mtp')
}
const readFile = util.promisify(fs.readFile)

module.exports = {
  async bake (templateName, processo) {

    var template = await readFile(path.resolve(`${config.get('paths.templates')}/${templateName}.docx`), 'binary')
    var templateParameters = await modules[templateName].getParameters(processo)

    var templater = new Docxtemplater()
    templater.loadZip(new Jszip(template)).setData(templateParameters).setOptions({ paragraphLoop: true })
    templater.render()

    return templater.getZip().generate({ type: 'nodebuffer' })
  }
}
