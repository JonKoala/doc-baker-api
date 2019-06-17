const router = require('express').Router()

router.use('/auditores', require('./auditores'))
router.use('/bakery', require('./bakery'))
router.use('/documentos', require('./documentos'))
router.use('/documentos/mtp', require('./documentos.mtp'))
router.use('/processos', require('./processos'))

module.exports = router
