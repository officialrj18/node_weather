
console.log('Client side js file is loaded!');




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
// msgOne.textContent = "From JavaScript"


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const location = search.value
    msgOne.textContent = "Forecast is loding..."
    msgTwo.textContent = ""

    fetch(`/weather?address=${location}`).then((response) => {


        response.json().then(({ error, location, forecast }) => {

            if (error) {
                return msgOne.textContent = error
            }
            msgOne.textContent = location
            msgTwo.textContent = forecast


        })
    })

})