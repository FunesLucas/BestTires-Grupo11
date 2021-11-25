const bcryptjs = require('bcryptjs')

let pass = "hola"

let passhas = bcryptjs.hashSync(pass, 10)

console.log(passhas)