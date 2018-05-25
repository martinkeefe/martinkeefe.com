import 'css/normalize.css'
import 'css/main.css'

import app from './app' 

app.use(require('app/home'))
app.use(require('app/mnm'))
app.use(require('app/maths'))
app.use(require('app/pubs'))
app.use(require('app/film'))
//app.use(require('app/mafc'))
//app.use(require('app/login'))

app.start()
