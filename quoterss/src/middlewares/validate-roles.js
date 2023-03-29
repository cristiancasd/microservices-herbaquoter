const validRoles = (...roles) => {                             //...roles, crea un arreglo con nombre role de todas las entradas
    return (req, res, next) => {
        if (!req.user) {

            const err = new Error('You must validate the token first');
            err.reasons = [{ message: 'You must validate the token first' }]
            err.status = 500
            next(err)
            return

            return res.status(500).json({
                message: 'You must validate the token first'
            })
        }
        if (!roles.includes(req.user.rol)) {
            const err = new Error(`The  ${req.user.rol} role in not valid, you must be ${roles}`);
            err.reasons = [{ message: `The  ${req.user.rol} role in not valid, you must be ${roles}` }]
            err.status = 500
            next(err)
            return

            return res.status(401).json({
                message: `The  ${req.user.rol} role in not valid, you must be ${roles}`
            })
        }
        next()
    }
}
module.exports = {
    validRoles
}