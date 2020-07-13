// Global Variables
const content = document.getElementById('content');
const label = document.getElementById('entryLabel');

const date = document.getElementById('date');
const temp = document.getElementById('temp');



let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const apikey = '&appid=a872f06d2c0e0e35ebc8efa8633844d2&units=metric';
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=';

document.getElementById('generate').addEventListener('click', generateWeatherFunc);

function generateWeatherFunc(event) {
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    
    getWeather(url, zipcode, apikey)
    .then(data => {
        postData('/data', {temperature: data.main.temp, date: newDate, feelings: feelings});
        updateUI('/weather');
    })
};

const getWeather = async (url, zipcode, Id) => {
    const res  = await fetch(url + zipcode + Id );
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.error('ERROR', error);
    };
};
const updateUI = async(url='') => {
    const req = await fetch(url);
    try {
        const UIData = await req.json();
        date.innerHTML = UIData.date;
        temp.innerHTML = UIData.temperature;
        content.innerHTML = UIData.feelings;
    } catch(error) {
        console.error('ERROR', error);
    };
};
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.error('ERROR', error);
    };
};

