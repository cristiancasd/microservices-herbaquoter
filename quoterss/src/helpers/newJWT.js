const jwt = require("jsonwebtoken");    //Paquete generar JWT

const newJWT = (id = '',rol='') => {
    return new Promise((resolve, reject) => {
        const payload = { id,rol };
 
        //Instrucción para crear un JWT
        jwt.sign(payload, process.env.JWT_SECRET, {
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