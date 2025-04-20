 
function updateSensorData() {
  const temp = (Math.random() * 10 + 20).toFixed(1); // 20°C to 30°C
  const moisture = (Math.random() * 50 + 30).toFixed(1); // 30% to 80%

  document.getElementById('temp').textContent = `${temp} °C`;
  document.getElementById('moisture').textContent = `${moisture} %`;

  checkForAlerts(temp, moisture);
}

// Alerts based on sensor values
function checkForAlerts(temp, moisture) {
  const alertList = document.getElementById('alert-list');
  alertList.innerHTML = ''; // clear previous alerts

  if (parseFloat(temp) > 28) {
    const li = document.createElement('li');
    li.textContent = '🔥 Temperature is too high!';
    alertList.appendChild(li);
  }

  if (parseFloat(moisture) < 40) {
    const li = document.createElement('li');
    li.textContent = '💧 Soil moisture is too low!';
    alertList.appendChild(li);
  }
}

// Water pump logic
let pumpOn = false;

function togglePump() {
  pumpOn = !pumpOn;
  const status = document.getElementById('pump-status');
  status.textContent = pumpOn ? 'ON' : 'OFF';

  // Optional: Add a fake alert
  const alertList = document.getElementById('alert-list');
  const li = document.createElement('li');
  li.textContent = pumpOn ? '🚿 Pump activated.' : '🚿 Pump deactivated.';
  alertList.appendChild(li);
}

// Start sensor simulation
setInterval(updateSensorData, 5000);
updateSensorData(); // run once at start
// Register service worker for offline use
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
