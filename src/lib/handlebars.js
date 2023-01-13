/* ESTE DOCUMENTO ES PARA MOSTRAR EN FORMATO HORARIO CORRECTAMENTE */
const { format } = require('timeago.js')


const helpers = {}

helpers.timeago = (timestamp) => {
    return format(timestamp)
}

module.exports = helpers