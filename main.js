// در حال حاضر نیازی به JS خاصی نیست، ولی اگه بخوای اسلایدر، منو یا دینامیک سازی داشته باشی اینجا اضافه می‌کنیم.
console.log("Real Madrid Project Ready");
// ---------------------next event-----------------------------
// دکمه‌های اسکرول راست و چپ رو به اسلایدر وصل می‌کنیم
const slider = document.getElementById('eventsSlider');
document.getElementById('slideLeft').onclick = () => {
    slider.scrollBy({ left: -320, behavior: 'smooth' });
};
document.getElementById('slideRight').onclick = () => {
    slider.scrollBy({ left: 320, behavior: 'smooth' });
};



//------------------A legendary track record-------------------

// ------------------A legendary track record---------------------

let data = {};
fetch('res.json')
    .then(res => res.json())
    .then(json => {
        data = json;
        updateDisplay(2025);
        setBubble(2025, +yearSlider.min, +yearSlider.max);
    });

const yearSlider = document.getElementById("yearSlider");
const yearBubble = document.getElementById("yearBubble");

yearSlider.addEventListener("input", function () {
    setBubble(+this.value, +this.min, +this.max);
    updateDisplay(+this.value);
});

window.addEventListener("resize", () => setBubble(+yearSlider.value, +yearSlider.min, +yearSlider.max));

// این تابع، موقعیت دایره (Bubble) رو روی خط اسلایدر تنظیم می‌کنه و مقدار سال رو توش می‌ذاره
function setBubble(value, min, max) {
    const percent = (value - min) / (max - min);
    const sliderWidth = yearSlider.offsetWidth;
    const bubbleWidth = yearBubble.offsetWidth;
    const offset = percent * (sliderWidth - bubbleWidth);
    yearBubble.style.left = `${offset}px`;
    yearBubble.innerText = value;
}

// این تابع مقدار جام‌ها رو از JSON واکشی و توی اون id مینویسه
function updateDisplay(year) {
    const d = data[year];
    if (!d) return;
    document.getElementById("best club of the 20th").innerText = d["The Best Club of the 20th Century FIFA Trophy"] || 0;
    document.getElementById("laliga").innerText = d["La Liga"] || 0;
    document.getElementById("copa").innerText = d["Copa del Rey"] || 0;
    document.getElementById("supercup").innerText = d["Spanish Super Cup"] || 0;
    document.getElementById("ucl").innerText = d["Champions League"] || 0;
    document.getElementById("uefa").innerText = d["UEFA Super Cup"] || 0;
    document.getElementById("club").innerText = d["FIFA Club World Cup"] || 0;
    document.getElementById("european").innerText = d["European Super Cup"] || 0;
}

// برای هر جام، بیشترین تعدادش در تاریخ رو تنظیم کن (مثلاً uclMax = 15)
const trophyMax = {
    "The Best Club of the 20th Century FIFA Trophy": 5,
    "Champions League":      36,
    "La Liga":              36,
    "Copa del Rey":         36,
    "Spanish Super Cup":     36,
    "UEFA Super Cup":         7,
    "FIFA Club World Cup":    36,
    "European Super Cup":     36, // یا هرچی داری
    // ... بقیه جام‌ها...
};

function updateDisplay(year) {
    const d = data[year];
    if (!d) return;
    // جام‌ها و ProgressBarها را آپدیت کن:
    const fields = [
        ["Champions League", "ucl"],
        ["La Liga", "laliga"],
        ["Copa del Rey", "copadelrey"],
        ["Spanish Super Cup", "supercup"],
        ["UEFA Super Cup", "uefa"],
        ["FIFA Club World Cup", "clubwc"],
        ["The Best Club of the 20th Century FIFA Trophy", "bestclub"],
        ["European Super Cup", "european"],
    ];

    for (let [jsonKey, idBase] of fields) {
        let count = d[jsonKey] || 0;
        // ست کردن عدد
        document.getElementById(idBase + "-count").innerText = count;
        // ست کردن پروگرس
        let barId = idBase + "-bar";
        let max = trophyMax[jsonKey] || 1;
        let percent = Math.round((count / max) * 100);
        document.getElementById(barId).style.width = `${percent}%`;
    }
}
// ----------------store-------------------
const track = document.getElementById('carouselTrack');
const btnPrev = document.querySelector('.carousel-btn.prev');
const btnNext = document.querySelector('.carousel-btn.next');
const card = track.querySelector('.store-card');

let scrollDist = card ? card.offsetWidth + 28 : 330; // کارت + گپ

// دکمه‌ها فقط روی دسکتاپ فعال باشن
function checkBtns() {
    if(window.innerWidth <= 900){
        btnPrev.style.display = 'none';
        btnNext.style.display = 'none';
        track.style.overflowX = 'auto';
    } else {
        btnPrev.style.display = '';
        btnNext.style.display = '';
        track.style.overflowX = 'hidden';
    }
}
checkBtns();
window.addEventListener('resize', checkBtns);

btnPrev.addEventListener('click', () => {
    track.scrollBy({left: -scrollDist, behavior: 'smooth'});
});
btnNext.addEventListener('click', () => {
    track.scrollBy({left: scrollDist, behavior: 'smooth'});
});
// ------------------weather------------------------
document.getElementById("weatherBtn").onclick = function() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;
    const result = document.getElementById("weatherResult");
    result.innerHTML = "Loading...";
    fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`)
        .then(res => res.json())
        .then(data => {
            if (!data.current_condition) {
                result.innerHTML = "City not found!";
                return;
            }
            const c = data.current_condition[0];

            // این قسمت تشخیص آیکون بر اساس وضعیت
            let iconHTML = '';
            const desc = c.weatherDesc[0].value.toLowerCase();

            if (desc.includes('cloud')) {
                iconHTML = `<img src="img/icons8-cloud-50.png" height="54" alt="Cloudy">`;
            } else if (desc.includes('rain')) {
                iconHTML = `<img src="img/icons8-rain-50.png" height="54" alt="Rainy">`;
            } else if (desc.includes('snow')) {
                iconHTML = `<img src="img/icons8-light-snow-50.png" height="54" alt="Snowy">`;
            } else {
                iconHTML = `<img src="img/icons8-sun-50.png" height="54" alt="Sunny">`;
            }

            result.innerHTML = `
                <div class="weather-icon-big">${iconHTML}</div>
                <b>${city}</b> <br>
                Condition: ${c.weatherDesc[0].value} <br>
                Temperature: ${c.temp_C}°C <br>
                Humidity: ${c.humidity}%
            `;
        })
        .catch(() => {
            result.innerHTML = "Error fetching data!";
        });
};
