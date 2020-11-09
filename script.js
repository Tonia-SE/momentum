// DOM Elements
const date = document.querySelector('.date'),
time = document.querySelector('.time'),
greeting = document.querySelector('.greeting'),
name = document.querySelector('.name'),
focus = document.querySelector('.focus'),
btnBg = document.querySelector('.btn_change_bg'),
btnQt = document.querySelector('.btn_change_quote'),
quote = document.querySelector('.quote'),
weatherIcon = document.querySelector('.weather-icon'),
temperature = document.querySelector('.temperature'),
city = document.querySelector('.city'),
windSpeed = document.querySelector('.wind-speed'),
humidity = document.querySelector('.humidity'),
weatherDescription = document.querySelector('.weather-description'),
quotes = ['Всё самое лучшее случается неожиданно.', 'Цель определяет смысл в жизни.', 'Счастье невозможно купить.', 'Разум бессилен перед криком сердца.', 'Где нет опасности, не может быть и славы.', 'Никто не ценит того, чего слишком много.', 'Свобода наступает лишь в одиночестве.', 'Кому чуждо одиночество, тому не видать свободы', 'Сердце можно лечить только сердцем.', 'Вдохновение кругом, в повседневности его даже слишком.', 'Самые светлые моменты уходят так быстро и безвозвратно.', 'То, что вы ищете, тоже ищет вас.', 'Упавший духом гибнет раньше срока.',
            'В основе оптимизма лежит чистейший страх.', 'Все мы ищем счастье, а приобретаем опыт.', 'Что бы ни происходило — всё хорошо.', 'Всё сбудется, стоит только расхотеть.', 'Гораздо легче найти ошибку, чем истину.'];

btnBg.addEventListener('click', changeImage);
btnQt.addEventListener('click', changeQuote);

let images = [];

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // 24hr Format
    hour = (hour % 24 || 24);
    if(hour <= 9) {
        hour = '0' + hour;
    }
    if(hour === 24) {
        hour = 0 + '0';
    }

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}

function showDate(){
    let today = new Date(),
        options = {weekday: 'long', month: 'long', day: 'numeric'},
        date1 = today.toLocaleDateString('ru-RU', options);
        
    date.innerHTML = `${date1}`;
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour >= 6 && hour < 12) {
        greeting.textContent = 'доброе утро, ';
    } 

    else if (hour >= 12 && hour < 18) {
        greeting.textContent = 'добрый день, ';
    } 

    else if (hour >= 18 && hour < 24) { 
        greeting.textContent = 'добрый вечер, ';
    } 

    else {
        greeting.textContent = 'доброй ночи, ';
    }
}

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
        body.style.backgroundImage = `url(${src})`;
    }; 
}

function getImagesForToday() {
    let arr = [],
        result = new Array();
        
    for (let j = 0; j < 4; j++) {
        while(result.length < 6) {
            let number = Math.ceil(Math.random()*20);
            if (result.indexOf(number +'.jpg') === -1) {
                result.push(number + '.jpg');
            }
        }
        arr.push(result);
        result = [];
    }
    return arr;
}

function setImage() {
    let today = new Date(),
        hour = today.getHours();
        
    const index = Math.floor(Math.random() * 6);
    let baseIndex = 0;
    let base = ''

    if (hour >= 6 && hour < 12) {
        if (document.documentElement.clientWidth > 640) {
        base = './assets/images/morning/'
        } else { base = './assets/small_img/morning/' }
        baseIndex = 0;
    } 

    else if (hour >= 12 && hour < 18) {
        if (document.documentElement.clientWidth > 640) {
        base = './assets/images/day/'
        } else { base = './assets/small_img/day/' }
        baseIndex = 1;
    } 

    else if (hour >= 18 && hour < 24) { 
        if (document.documentElement.clientWidth > 640) {
        base = './assets/images/evening/'
        } else { base = './assets/small_img/evening/' }
        baseIndex = 2;
    } 

    else {
        if (document.documentElement.clientWidth > 640) {
        base = './assets/images/night/'
        } else { base = './assets/small_img/night/' }
        baseIndex = 3;
    }

    viewBgImage(base + images[baseIndex][index]);

    localStorage.setItem('imageIndex', index);
    localStorage.setItem('baseIndex', baseIndex);

    setTimeout (setImage, 60 * 60 * 1000);
} 


function changeImage() {
    let baseIndex = parseInt(localStorage.getItem('baseIndex')),
        base = '';

    if(baseIndex > 3) {
        baseIndex = 0;
        localStorage.setItem('baseIndex', baseIndex);
    }
    if (document.documentElement.clientWidth > 640) {
        switch (baseIndex) {
        case 0:
            base = './assets/images/morning/';
            break;
        case 1:
            base = './assets/images/day/'
            break;
        case 2:
            base = './assets/images/evening/';
            break;
        case 3:
            base = './assets/images/night/';
            break;
        default:
            return;
        }
    }
    else {
        switch (baseIndex) {
        case 0:
            base = './assets/small_img/morning/';
            break;
        case 1:
            base = './assets/small_img/day/'
            break;
        case 2:
            base = './assets/small_img/evening/';
            break;
        case 3:
            base = './assets/small_img/night/';
            break;
        default:
            return;
        }
    }

    let index = parseInt(localStorage.getItem('imageIndex'));

    if (index < 5) {
        index = index + 1;
        viewBgImage(base + images[baseIndex][index]);
        localStorage.setItem('imageIndex', index);
    } else {
        baseIndex = baseIndex + 1;
        localStorage.setItem('baseIndex', baseIndex);
        localStorage.setItem('imageIndex', -1);
    }
} 

function changeQuote() {
    let index = parseInt(localStorage.getItem('quoteIndex'));

    if (index < quotes.length - 1) {
        index = index + 1;
        quote.textContent = quotes[index];
        localStorage.setItem('quoteIndex', index);
    } else {
        index = 0;
        quote.textContent = quotes[index];
        localStorage.setItem('quoteIndex', index);
    }
}

function setQuote() {
    let index = Math.floor(Math.random() * quotes.length)
    quote.textContent = quotes[index];
    localStorage.setItem('quoteIndex', index);
}

function getName() {
    name.value = localStorage.getItem('name');
}

function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
        if (e.target.value.trim() !== "") {
        localStorage.setItem('name', e.target.value);
        } else {
        getName();
        }
        name.blur();
        }
    }
}

function getCity() {
    city.value = localStorage.getItem('city');
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
        if (e.target.value.trim() !== "") {
        localStorage.setItem('city', e.target.value);
        getWeather();
        } else {
        getCity();
        }
        city.blur();
        }
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === "") {
        focus.value = 'main focus';
    } else {
        focus.value = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
        if (e.target.value.trim() !== "") {
            localStorage.setItem('focus', e.target.value);
        } else {
            getFocus();
        }
        focus.blur();
        }
    }
}

async function getWeather() {
const url = `https://api.openweathermap.org/data/2.5/weather?lang=ru&appid=80a632412a9582ac0af9f6235f30f041&units=metric&q=${localStorage.getItem('city')}`;
const res = await fetch(url);
const data = await res.json();

weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;

temperature.textContent = `${data.main.temp}°C`;
weatherDescription.textContent = data.weather[0].description;
humidity.textContent = `${data.main.humidity}%`;
windSpeed.textContent = `${data.wind.speed}m/s`;
}

if (localStorage.getItem('name') === null || localStorage.getItem('name') === "") {  
    localStorage.setItem('name', 'ваше имя');
} 

if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === "") {  
    localStorage.setItem('focus', 'ваша цель');
}

if (localStorage.getItem('city') === null || localStorage.getItem('city') === "") {  
    localStorage.setItem('city', 'Нижний Новгород');
} 

images = getImagesForToday();

name.addEventListener('keypress', setName);
name.addEventListener('blur', getName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', getFocus);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', getCity);
// Run
showDate();
showTime();
setBgGreet();
setImage();
setQuote();
getName();
getFocus();
getWeather();
getCity();

const now = new Date();
const delay = 60 * 60 * 1000; 
const start = delay - ((now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds());
setTimeout(setImage, start);
