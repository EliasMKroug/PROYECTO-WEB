
const bcrypt = require('bcryptjs')
const helpers = {}

/* ENCRYPRA LA CONTRASENA CON LA PALABRA hash */
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

/* PARA EL LOGUEO */
helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword)
    }catch(e) {
        console.log(e)
    }
}

module.exports = helpers /* importo este documento */