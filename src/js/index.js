import '../css/normalize.css'
import '../css/main.css'

import app from './app'
import home from './app/home'
import mnm from './app/mnm'
//import maths from './app/maths'
import pubs from './app/pubs'
import film from './app/film'

home(app)
mnm(app)
//maths(app)
pubs(app)
film(app)

app.start()
