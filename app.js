const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const dotenv=require('dotenv')
const morgan=require('morgan')
const exphbs=require('express-handlebars')
const passport=require('passport')
const session=require('express-session')
const MongoStore=require('connect-mongo')(session)
const connectDB=require('./config/db')
const { Store } = require('express-session')





//load config
dotenv.config({path:'./config/config.env'})

//passport config
require('./config/passport')(passport)

//connect db
connectDB()

const app=express()

//if want to run app in development mode 
if(process.env.NODE_ENV==='developement')
{
    //used middleware
    app.use(morgan('dev'))
}


//handlebars
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','.hbs')


//Sessions 
app.use(session({
    secret: 'mini cat',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({mongooseConnection:mongoose.connection})

  }))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname,'public')))


//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))



const PORT=process.env.PORT || 5000


app.listen(PORT,
    console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )
