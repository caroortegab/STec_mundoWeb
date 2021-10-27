//Día 1: Conectando con el mundo web
//Trabajamos con el sistema de archivos

//definir una instancia de una librería que se debe de pedir
//const -> apunta a una instancia => constante
const fs = require('fs')
const yargs = require('yargs')

//objeto apuntando al archivo utils.js
const checkUtils = require('./utils.js')

//imprimir mensaje en terminal
console.log('Bienvenido a tu semana tec!')
checkUtils()

yargs.version('1.1.0')


yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function () {
        console.log('Adding a new note!')
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    handler: function () {
        console.log('Removing a new note!')
    }
})

const command = process.argv[2]
if (command === 'add') {
    console.log('Adding argument')
} else if (command === 'remove') {
    console.log('Removing argument')
}

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('Title: ' + argv.title)
        console.log('Body: ' + argv.body)
    }
})

yargs.parse()
//console.log(yargs.argv)


//sistema de archivos local para escibir en un archivo
// ('nombre de archivo.txt' y 'contenido del archivo')
// fs.writeFileSync(file,data[,options])
//fs.writeFileSync('notes.txt', 'Holita, conectando mundo web')

//agrega info a un archivo existente
//fs.appendFileSync('notes.txt', 'Mi nombre es Caro')