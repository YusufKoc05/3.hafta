/* Güncel Tarihten Yeni yıl arasındaki gün/saat/dakika/saniye hesabı */
function guncelTarih(currentDate) {
  var time = (currentDate - new Date()) / 1000;
  return {
    gun: Math.floor(time / 3600 / 24),
    saat: Math.floor((time / 3600) % 24),
    dakika: Math.floor((time / 60) % 60),
    saniye: Math.floor(time % 60),
    total: time,
  };
}

function animasyon(span) {
  span.className = "flip";
  setTimeout(function () {
    span.className = "";
  }, 700);
}

function baslat(id, newYear) {
  var timerInterval = setInterval(function () {
    var zaman = document.getElementById(id);
    var zamanlayici = guncelTarih(newYear);

    zaman.innerHTML =
      "<span>" +
      zamanlayici.gun +
      "</span>" +
      "<span>" +
      zamanlayici.saat +
      "</span>" +
      "<span>" +
      zamanlayici.dakika +
      "</span>" +
      "<span>" +
      zamanlayici.saniye +
      "</span>";

    // animasyon
    var spans = zaman.getElementsByTagName("span");
    animasyon(spans[3]);
    if (zamanlayici.saniye === 59) animasyon(spans[2]);
    if (zamanlayici.dakika === 59 && zamanlayici.saniye === 59)
      animasyon(spans[1]);
    if (
      zamanlayici.saat === 23 &&
      zamanlayici.dakika === 59 &&
      zamanlayici.saniye === 59
    )
      animasyon(spans[0]);

    // Tarih kontrolü - zaman bitti mi?
    if (zamanlayici.total < 1) {
      clearInterval(timerInterval);
      zaman.innerHTML =
        "<span>0</span><span>0</span><span>0</span><span>0</span>";
    }
  }, 1000);
}

window.onload = function () {
  // 2026 yılbaşı için ayarlandı 🎉
  var newYear = new Date("1 Jan 2026 00:00:00");
  baslat("clock", newYear);
};
