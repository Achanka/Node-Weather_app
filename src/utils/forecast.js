const request= require("request")
/*
const url='http://api.weatherstack.com/current?access_key=6ee8380a7add73dab60d62c1aed6ecd2&query=37,112&units=m'

request ({url:url,json:true},(error,response)=>
{
    if (error)
    console.log("unable to connect")
    else if (response.body.error)
    console.log("unable to find location ")
    else
    console.log(response.body.current.weather_descriptions[0] + " It is currently " + response.body.current.temperature + " degrees out and it feels like "+ response.body.current.feelslike)
})

*/

forecast=(latitude,longitude,callback)=>
{
    url='http://api.weatherstack.com/current?access_key=ef41fee250b9b4afd3a08a495fe54168&query='+latitude+','+ longitude +'&units=m'
    request({url,json:true},(error,{body})=>
    {
        if (error)
        callback("unable to connect",undefined)
        else if (body.error)
        callback("unable to find location",undefined)
        else
        callback(undefined,'Temperature:'+body.current.temperature+" ,FeelsLikeTemperature: "+body.current.feelslike+
        ",WeatherDescription: "+body.current.weather_descriptions[0])
    })
}

/*
forecast(24.490495,86.697711, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })

*/
module.exports=forecast