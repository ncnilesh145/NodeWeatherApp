console.log('Client side javascript file is loaded! ')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent='heeeee'
weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location=search.value
    messageOne.textContent='Loading......'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response) => {
    response.json().then(({error,forecast,location}={}) => {
        if(error){
         //  return console.log(error)
         messageOne.textContent=error
         return
        }
        messageOne.textContent=forecast
        messageTwo.textContent=location
        //console.log(location)
        //console.log(forecast)
    })
})
})
