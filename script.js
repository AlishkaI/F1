const OPENWEATHER_KEY = '01aecd6600d0385b32ac426a08294831'; // <- вставь ключ OpenWeatherMap

// 24 гонки сезона 2025
const races = [
  {id:'race-1', raceName:'Australian GP', circuit:'Albert Park', locality:'Melbourne', country:'Australia', date:'2025-03-16', time:'05:00:00Z', img:'images/albert-park.jpg'},
  {id:'race-2', raceName:'Bahrain GP', circuit:'Bahrain International Circuit', locality:'Sakhir', country:'Bahrain', date:'2025-03-30', time:'14:00:00Z', img:'images/bahrain.jpg'},
  {id:'race-3', raceName:'Saudi Arabia GP', circuit:'Jeddah Street Circuit', locality:'Jeddah', country:'Saudi Arabia', date:'2025-04-06', time:'17:00:00Z', img:'images/jeddah.jpg'},
  {id:'race-4', raceName:'Emilia Romagna GP', circuit:'Imola', locality:'Imola', country:'Italy', date:'2025-04-20', time:'13:00:00Z', img:'images/imola.jpg'},
  {id:'race-5', raceName:'Miami GP', circuit:'Miami International Autodrome', locality:'Miami', country:'USA', date:'2025-05-04', time:'19:30:00Z', img:'images/miami.jpg'},
  {id:'race-6', raceName:'Spanish GP', circuit:'Circuit de Barcelona-Catalunya', locality:'Barcelona', country:'Spain', date:'2025-05-18', time:'14:00:00Z', img:'images/barcelona.jpg'},
  {id:'race-7', raceName:'Monaco GP', circuit:'Circuit de Monaco', locality:'Monaco', country:'Monaco', date:'2025-05-25', time:'13:00:00Z', img:'images/monaco.jpg'},
  {id:'race-8', raceName:'Canadian GP', circuit:'Circuit Gilles Villeneuve', locality:'Montreal', country:'Canada', date:'2025-06-08', time:'18:00:00Z', img:'images/montreal.jpg'},
  {id:'race-9', raceName:'Austrian GP', circuit:'Red Bull Ring', locality:'Spielberg', country:'Austria', date:'2025-06-22', time:'13:00:00Z', img:'images/austria.jpg'},
  {id:'race-10', raceName:'British GP', circuit:'Silverstone Circuit', locality:'Silverstone', country:'UK', date:'2025-06-29', time:'14:00:00Z', img:'images/silverstone.jpg'},
  {id:'race-11', raceName:'Hungarian GP', circuit:'Hungaroring', locality:'Budapest', country:'Hungary', date:'2025-07-20', time:'13:00:00Z', img:'images/hungaroring.jpg'},
  {id:'race-12', raceName:'Belgian GP', circuit:'Circuit de Spa-Francorchamps', locality:'Spa', country:'Belgium', date:'2025-07-27', time:'13:00:00Z', img:'images/spa.jpg'},
  {id:'race-13', raceName:'Dutch GP', circuit:'Circuit Zandvoort', locality:'Zandvoort', country:'Netherlands', date:'2025-08-31', time:'13:00:00Z', img:'images/zandvoort.jpg'},
  {id:'race-14', raceName:'Italian GP', circuit:'Monza Circuit', locality:'Monza', country:'Italy', date:'2025-09-07', time:'13:00:00Z', img:'images/monza.jpg'},
  {id:'race-15', raceName:'Singapore GP', circuit:'Marina Bay Street Circuit', locality:'Singapore', country:'Singapore', date:'2025-09-21', time:'13:00:00Z', img:'images/singapore.jpg'},
  {id:'race-16', raceName:'Japanese GP', circuit:'Suzuka Circuit', locality:'Suzuka', country:'Japan', date:'2025-09-28', time:'06:00:00Z', img:'images/suzuka.jpg'},
  {id:'race-17', raceName:'Qatar GP', circuit:'Losail International Circuit', locality:'Lusail', country:'Qatar', date:'2025-10-05', time:'14:00:00Z', img:'images/qatar.jpg'},
  {id:'race-18', raceName:'US GP', circuit:'Circuit of the Americas', locality:'Austin', country:'USA', date:'2025-10-19', time:'20:00:00Z', img:'images/cota.jpg'},
  {id:'race-19', raceName:'Mexico GP', circuit:'Autódromo Hermanos Rodríguez', locality:'Mexico City', country:'Mexico', date:'2025-10-26', time:'19:00:00Z', img:'images/mexico.jpg'},
  {id:'race-20', raceName:'Brazilian GP', circuit:'Interlagos', locality:'São Paulo', country:'Brazil', date:'2025-11-02', time:'17:00:00Z', img:'images/interlagos.jpg'},
  {id:'race-21', raceName:'Las Vegas GP', circuit:'Las Vegas Street Circuit', locality:'Las Vegas', country:'USA', date:'2025-11-16', time:'01:30:00Z', img:'images/las-vegas.jpg'},
  {id:'race-22', raceName:'Abu Dhabi GP', circuit:'Yas Marina Circuit', locality:'Abu Dhabi', country:'UAE', date:'2025-12-07', time:'13:00:00Z', img:'images/abu-dhabi.jpg'},
  
];


function init(){
  races.forEach(race=>{
    createCard(race);
    createModal(race);
  });
}

function createCard(race){
  const card=document.createElement('div');
  card.className='card';
  card.innerHTML=`
    <img src="${race.img}" alt="${race.circuit}">
    <div class="meta">
      <div class="race-name">${race.raceName}</div>
      <div class="race-time">${race.date} ${race.time}</div>
    </div>
    <button onclick="openModal('${race.id}')">Посмотреть детали</button>
  `;
  document.getElementById('races').appendChild(card);
}

function createModal(race){
  const modalBg=document.createElement('div');
  modalBg.className='modal-backdrop';
  modalBg.id=race.id;
  modalBg.style.display='none';
  modalBg.innerHTML=`
    <div class="modal">
      <div class="header">
        <img src="${race.img}" alt="${race.circuit}">
        <div class="info">
          <h2>${race.raceName}</h2>
          <p>${race.circuit} — ${race.locality}, ${race.country}</p>
          <p>Старт: ${race.date} ${race.time}</p>
        </div>
      </div>
      <div class="blocks">
        <div class="block" id="weather-${race.id}">Загрузка погоды...</div>
        <div class="block" id="clock-${race.id}">--:--:--</div>
        <div class="block" id="countdown-${race.id}">--:--:--</div>
      </div>
      <button class="close-btn" onclick="closeModal('${race.id}')">Закрыть</button>
    </div>
  `;
  document.body.appendChild(modalBg);
}

function openModal(id){
  const el=document.getElementById(id);
  if(!el) return;
  el.style.display='flex';
  startCountdown(id);
  startClock(id);
  loadWeather(id);
}

function closeModal(id){
  const el=document.getElementById(id);
  if(el) el.style.display='none';
}

function attachImage(id){
  const input=document.getElementById(`imginput-${id}`);
  const url=input.value.trim();
  if(!url) return alert('Вставь ссылку на изображение');
  const imgEl=document.querySelector(`#${id} img`);
  imgEl.src=url;
}

function startCountdown(id){
  const countEl = document.getElementById(`countdown-${id}`);
  const utcStr = document.querySelector(`#${id} .info p:last-child`).textContent.replace('Старт: ','');
  const startTime = new Date(utcStr);

  const raceDurationMs = 2 * 60 * 60 * 1000; // 2 часа в миллисекундах

  const interval = setInterval(()=>{
    const now = new Date();

    if(now < startTime){
      // Гонка ещё не началась
      const diff = startTime - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      countEl.textContent = `До старта: ${h} ч ${m} мин ${s} сек`;
    } else if(now >= startTime && now < startTime + raceDurationMs){

      // Гонка идёт
      const diff = startTime + raceDurationMs - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      countEl.textContent = `Гонка идёт, до финиша: ${h} ч ${m} мин ${s} сек`;
    } 
    else {
      // Гонка завершена
      countEl.textContent = 'Гонка закончилась!';
      clearInterval(interval);
    }

  }, 1000);
}


// Мировые часы
function startClock(id){
  const clockEl=document.getElementById(`clock-${id}`);
  setInterval(()=>{
    const d=new Date();
    clockEl.textContent=d.toLocaleTimeString();
  },1000);
}

// Погода
async function loadWeather(id){
  const wEl=document.getElementById(`weather-${id}`);
  const locality=document.querySelector(`#${id} .info p:nth-child(2)`).textContent.split(' — ')[1].split(',')[0];
  if(!OPENWEATHER_KEY || OPENWEATHER_KEY==='YOUR_OPENWEATHER_KEY'){ wEl.textContent='Вставь OpenWeatherMap API ключ'; return; }
  try{
    const geoResp=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locality}&limit=1&appid=${OPENWEATHER_KEY}`);
    const geo=await geoResp.json();
    if(!geo[0]){ wEl.textContent='Город не найден'; return; }
    const {lat,lon}=geo[0];
    const weatherResp=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=metric&lang=ru`);
    const w=await weatherResp.json();
    wEl.innerHTML=`🌡 ${w.main.temp}°C<br>💧 ${w.main.humidity}%<br>🌬 ${w.wind.speed} м/с<br>☁️ ${w.clouds.all}%`;
  }catch(e){ wEl.textContent='Ошибка погоды'; }
}


// Запуск
init();
