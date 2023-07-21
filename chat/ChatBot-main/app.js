const API_KEY='Your API_KEY'  //Paste your api key here
const submitButton=document.getElementById('submit')
const outputElement=document.querySelector('#output')
const inputElement=document.querySelector('input')
const historyElement=document.querySelector('.history')
const buttonElement=document.querySelector('button')

function changeInput(value){
    const inputElement=document.querySelector('input')
    inputElement.value=value
}
async function getMessage(){
    console.log("Clicked")
    const options={
        method:'POST',
        headers:{
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [ {role: "user", content: "Hello!"}],
            max_tokens:100
        })
    }
    try{
        const response=await fetch('https://api.openai.com/v1/completions',options)
        const data=await response.json()
        console.log(data)
        outputElement.textContent=data.choices[0].message.content;
        if(data.choices[0].message.content){
            const pElement=document.createElement('p')
            pElement.textContent=inputElement.value
            pElement.addEventListener('click',()=>changeInput)
            historyElement.append(pElement)

        }
    }catch(error){
        console.log(error)
    }
}

function clearInput(){
    inputElement.value=''
}

submitButton.addEventListener('click',getMessage)
buttonElement.addEventListener('click',clearInput)