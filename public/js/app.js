//const { response } = require("express")

//const { response } = require("express")

//console.log("Client side js file is loaded.")

// fetch('https://puzzle.mead.io/puzzle').then((response)=>
// {
//     response.json().then((data)=>
//     {
//         console.log(data)
//     })
// })

// fetch ('http://localhost:3000/weather?address=!').then((response)=>
// {
//     response.json().then((data)=>
//     {
//         if(data.error)
//         {
//             console.log("Error:",data.error)
//         }
//         else
//         {

//         console.log(data.location)
//         console.log(data.responseData)
//         }
//     })
// })

const weatherForm=document.querySelector('form')
const search =document.querySelector('input')
const messageOne=document.querySelector('#m-1')
const messageTwo=document.querySelector('#m-2')

weatherForm.addEventListener("submit",(e)=>
{
    e.preventDefault()
    const location=search.value
    messageOne.textContent="Loading..."
    messageTwo.textContent=''
    
    fetch ('/weather?address='+location).then((response)=>
{
    response.json().then((data)=>
    {
        if(data.error)
        {
            messageOne.textContent=data.error
            
        }
        else
        {

        messageOne.textContent=data.location
        messageTwo.textContent=data.responseData//+' weatherDescription :'+data.responseData.weatherDescription
        }
    })
})
  

    //console.log(location) 
})
