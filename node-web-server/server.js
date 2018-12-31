const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
//should be at the top of all middlewares to prevent static pages displaying
// app.use((req, res, next) => {
//   res.render('maintenance')
// })
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs')

//middleware
app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now} : url ${req.url} : method ${req.method}`
  console.log(log)
  fs.appendFile('server.log', log + '\n' , err => {
    if(err){
      console.log(err)
    }
  } )
  next()
})

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

app.listen(port, () => console.log('server running'));
