const token = localStorage.getItem("token");

async function fetchCrops() {
    const crops = await apiFetch("/crops", "GET", null, token);
    const list = document.getElementById("cropList");
    list.innerHTML = "";
    crops.forEach(c => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerText = `${c.cropName} | Min Rain: ${c.minRainfall} | Max Temp: ${c.maxTemp}`;
        list.appendChild(div);
    });
}

async function addCrop() {
    const cropName = document.getElementById("cropName").value;
    const minRainfall = document.getElementById("minRainfall").value;
    const maxTemp = document.getElementById("maxTemp").value;
    await apiFetch("/crops", "POST", { cropName, minRainfall, maxTemp }, token);
    document.getElementById("cropName").value = "";
    document.getElementById("minRainfall").value = "";
    document.getElementById("maxTemp").value = "";
    fetchCrops();
}

function goWeather() { window.location.href = "weather.html"; }
function goAlerts() { window.location.href = "alerts.html"; }

fetchCrops();
