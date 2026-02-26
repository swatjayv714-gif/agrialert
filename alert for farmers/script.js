// Sample alerts for demo
const sampleAlerts = [
    {date: '24 Feb', type: 'Weather', severity: 'High', status: 'Seen'},
    {date: '23 Feb', type: 'Disease', severity: 'Medium', status: 'Unseen'},
    {date: '22 Feb', type: 'Weather', severity: 'Low', status: 'Seen'}
];

// Populate alert table
const alertTable = document.getElementById('alert-table');
if(alertTable){
    sampleAlerts.forEach(alert => {
        const row = `<tr>
            <td>${alert.date}</td>
            <td>${alert.type}</td>
            <td>${alert.severity}</td>
            <td>${alert.status}</td>
        </tr>`;
        alertTable.innerHTML += row;
    });
}

// Sample dashboard messages
const weatherMsg = document.getElementById('weather-msg');
if(weatherMsg){
    weatherMsg.textContent = "Heavy rainfall expected tomorrow!";
}

const diseaseMsg = document.getElementById('disease-msg');
if(diseaseMsg){
    diseaseMsg.textContent = "Maize rust disease risk is high in your area!";
}