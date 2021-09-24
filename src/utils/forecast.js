const request=require('request')

const forecast=(longitude,latitude,callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=42edcdaded06db7094cda9856d579366&query='+latitude+','+longitude
   //url property shorthand
    request({url, json:true},(error,{body}={})=>{
       //const {weather_descriptions, temperature}=response.body.current //Object destruction
        if(error){
            callback('Unable to connect to weather service !',undefined)
         } else if (body.error){
            callback('Unable to find location',undefined)
         } else {
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degree out. It feels like "+body.current.feelslike+" degree out.")
         }
})
}

module.exports=forecast
