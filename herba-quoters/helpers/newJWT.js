const jwt = require("jsonwebtoken");    //Paquete generar JWT

const newJWT = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        //Instrucción para crear un JWT
        jwt.sign(payload, process.env.SECRETOPRIVATEKEY, {
            expiresIn: '4h'     // Escoger cuanto dura el JWT
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('It can not create new JWT ')
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    newJWT
}