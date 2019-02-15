const axios = require('axios')
const Docxtemplater = require('docxtemplater')
const Jszip = require('jszip')


const modules = {
  'MTP': require('./modules/mtp')
}

module.exports = {
  async bake (templateName, processo) {

    var response = await axios.get(`${process.env['DOCBAKER_TEMPLATES_URL']}/${templateName}.docx`, { responseType: 'arraybuffer' })
    var template = response.data
    var templateParameters = await modules[templateName].getParameters(processo)

    var templater = new Docxtemplater()
    templater.loadZip(new Jszip(template)).setData(templateParameters).setOptions({ paragraphLoop: true })
    templater.render()

    return templater.getZip().generate({ type: 'nodebuffer' })
  }
}
