const path=require('path')
const express=require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app=express()
const port=process.env.port || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engin and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
//res.send('<h1>Hello Express!</h1>')
//res.render('index')
res.render('index',{
    name:'nilesh',
    title:'Weather App'
})
})

app.get('/help',(req,res)=>{
    // res.send([{
    //     name:'Nilesh',
    //     age:26
    // },{
    //     Name:'Pikachu',
    //     age: 5
    // }])
    res.render('help',{
        title:'Help',
        message:'Help me',
        name:'Nilesh'
    })
})

app.get('/about',(req,res)=>{
//        res.send('<h1>About page</h1>')
res.render('about',{
    name:'Nilesh',
    title:'About me'
})
})

app.get('/weather',(req,res)=>{
            if(!req.query.address){
                return res.send({
                    error:'You must provide an address term'
                })
            }
            geocode(req.query.address,(error,{longitude,latitude, location}={})=>{
                if(error){
                    return res.send({error})
                }
                //console.log("Error: ",error)
                //console.log("Data: ",response)
                forecast(longitude, latitude, (error, forecastdata) => {
                    if(error){
                        return res.send({error})
                    }
                    res.send({
                        forecast:forecastdata,
                        location:location,
                        address:req.query.address
                    })
                    
                  })    
                  //console.log('Error', error)
                  //console.log('Data', response)
            })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:404,
        msg:'Help Article not found',
        name:'Nilesh'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        msg:'Page not found',
        name:'Nilesh'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' +port)
})

