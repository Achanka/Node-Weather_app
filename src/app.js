const path =require("path")
const express=require("express")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")
const hbs= require('hbs')
const port=process.env.PORT||3000
const app= express()

//define paths for express config
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

/*
app.get('',(req,res)=>{
    res .send("<h1>Weather</h1>")
})

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
console.log(__filename)
*/
app.listen(port,()=>
{
    console.log("server is up on port "+port)
})

app.get("",(req,res)=>
{
    res.render("index",{
        title:"Weather App",
        name:"Aka"
    })
})

app.get("/about",(req,res)=>
{
    res.render("about",
    {
        title:"About",
        description:"It gives the weather of particular place",
        name:"aka"

    })
})

app.get("/help",(req,res)=>
{
    res.render("help",{
        message:"This is some helpful text",
        name:"aka",
        title:"Help"

    })
})

app.get("/weather",(req,res)=>
{
    if (!req.query.address)
    return res.send({
        error:"You must provide a search term"
    })


    geocode(req.query.address, (error,{latitude,longitude,location}={})=>
{
  if (error)
   return res.send({error})

    forecast(latitude,longitude, (error, responseData) => {
       
        if(error)  
        {
           //return console.log('Error', error)
           return res.send({error})
        }


            res.send({
                location,
                responseData:responseData,
            })
             
         
        
        
    })
      
})
})
    








/*
app.get("/help",(req,res)=>
{
    res.send([{
        name:"Ak",
        age:22
    },
{
    name:'sara'
}])
})

app.get ("/about",(req,res)=>{
    res.send("<h1>About Page</h1>")
})

app.get ("/weather",(req,res)=>{
    res.send({
        forecast:"It is raining",
        location:"Deoghar"
    })
})
*/
app.get("/help/*",(req,res)=>
{
  res.render("404",{
    name:"aka",
    errorMessage:"Help article not found."
  }
  )  
})


app.get("*",(req,res)=>
{
    res.render("404",{
        name:"aka",
        errorMessage:"Page not found."
    })
})

