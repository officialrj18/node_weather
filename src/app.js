//core modules
const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//to take diretory address
//console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'))



//to generate app
const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const parialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(parialsPath);

//Setup statoc directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    //to render our views  the name should match
    //('name of view,obj whose value u wanna access by view)
    res.render('index', {
        title: 'Weather',
        name: 'Rajendra Arya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rajendra Arya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'this is a random help msg!!!!',
        title: 'Help',
        name: 'Rajendra Arya'
    })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "You must provide a search term "
//         })
//     }
//     console.log(req.query.search);
//     res.send({
//         product: []
//     })
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // res.send({

    //     address:req.query.address,
    //     forecast: 'rainy day',
    //     location: 'haldwani'
    // })

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })

        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    //uscecase of shorthand
                    error
                })
            }

            res.send({

                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 ',
        errorMsg: 'Help article not found!',
        name: 'Rajendra Arya'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Rajendra Arya'

    })
})

//to start the server 
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
