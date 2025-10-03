const apikey = "e75d839dd422972c51f7c9854b71064f"; 
const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// API
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=tr`;

// API'den bilgileri alma
async function lokasyonBilgisi(city) {
  try {
    const resp = await fetch(url(city));
    const respData = await resp.json();

    if (respData.cod === "404") {
      uyariMesaji();
    } else {
      havaDurumuBilgisi(respData);
    }
  } catch (err) {
    console.error("Bağlantı hatası:", err);
    uyariMesaji("Bağlantı hatası oluştu!");
  }
}

function havaDurumuBilgisi(data) {
  const temp = Math.round(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C </h2>
        <small>${data.weather[0].description}</small><br/>
        <small>${data.name}, ${data.sys.country}</small>
    `;

  // cleanup
  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value.trim();
  if (city) {
    lokasyonBilgisi(city);
  } else {
    uyariMesaji("Lütfen şehir girin!");
  }
});

function uyariMesaji(msg = "Konum bilgisi bulunmamaktadır !!!") {
  const notif = document.createElement("div");
  notif.classList.add("mesaj");
  notif.innerText = msg;
  container.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 2000);
  main.innerHTML = "";
}
