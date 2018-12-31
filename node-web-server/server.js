const express = require('express')
const hbs = require('hbs')
const app = express()

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  res.render('home', {
    title: 'homepage'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'aboutpage'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'error 404'
  })
})

app.listen(3000, () => console.log('server running'));
