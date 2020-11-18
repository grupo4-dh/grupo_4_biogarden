const fs = require('fs')
const path = require('path')

// Usamos archivos JSON como base de datos momentáneamente
// Los leemos (fs.readFileSync) y parseamos (JSON.parse) en una sola linea
let users = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/users.json'),'utf8'))

module.exports = {
    register: function(req, res) {
        return res.render('./users/register.ejs')
    },
    login: function(req, res) {
        return res.render('./users/login.ejs')
    },
    profile: function(req, res) {
        return res.send('Próximamente perfil del usuario: ' + req.params.user_id)
    }
}