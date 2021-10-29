const express = require('express');//utilizar framework express
const hbs = require('hbs');//handlebars
const path = require('path');
const app = express(); //instanciar el objeto en la variable app

const weatherData = require('../utils/weatherData')

//variable de ambiente=> si no encuentra puerto usara como default 3000
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

app.set('view engine', 'hbs'); //todo lo de render = handlebars
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'WEATHER APP'
    })
})

//localhost 3000/weather?address=MexicoCity
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "Falta información de la ciudad deseada"
        })
    }

    weatherData(address, (error, { temperature, description, cityName }) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
})

app.get('/help', (req, res) => {
    //res.send('<h2>Página de Ayuda</h2>') //se indica la ruta al html del servicio
    res.render('help', {
        title: 'Solicita ayuda',
        name: 'Carolina'
    })
})

app.get('/about', (req, res) => {
    //res.send('<h2>About Us</h2>')
    res.render('about', {
        title: 'Sobre nosotros...',
        name: 'Carolina'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "PAGE NOT FOUND"
    })
})

app.listen(port, () => { //indica que se levanta el servidor en el puerto ... este caso 3000
    console.log("Server is up on server: ", port)
})