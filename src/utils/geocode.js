const request= require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmNuaWxlc2g2IiwiYSI6ImNrdDV1a3FxZDBjNTIyb3BkNWlvMm55c3EifQ.0VAH88yxC11Lc_V0XSC5rw&limit=1'
    //url property shorthand
    request({url, json:true}, (error,{body})=>{
        //const {features}=response.body // Object destruction
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if (address.length===0 || body.features.length===0){
            callback('Unable to find location, try another search',undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports=geocode