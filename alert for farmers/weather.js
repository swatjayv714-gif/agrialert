const token = localStorage.getItem("token");

async function getWeather() {
    const location = document.getElementById("location").value;
    const data = await apiFetch(`/weather/${location}`, "GET", null, token);
    const div = document.getElementById("weatherResult");
    div.innerHTML = `
        <div class="card">
            Temperature: ${data.temperature} °C<br>
            Rainfall: ${data.rainfall} mm<br>
            Condition: ${data.condition}
        </div>
    `;
}
