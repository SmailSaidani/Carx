const  express = require('express')
const app = express()
const port = 5000
const path =require("path")
const connectDb = require("./config/db")

var cors = require('cors')

app.use(cors())
connectDb();
//middleware initialization 
app.use(express.json({extended : false}))




app.get('/', (req, res) => res.send('Hello !'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

 app.use('/api/cars', require('./routes/api/cars'))
 
 app.use('/api/users', require('./routes/api/users'))
 app.use('/api/profile', require('./routes/api/profile'))
 app.use('/api/auth', require('./routes/api/auth'))
 app.use('/api/posts', require('./routes/api/posts'))