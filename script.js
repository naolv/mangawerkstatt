const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');

let isDrawing = false;

// Zeichen-Events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch-Support für iPads/Tablets
canvas.addEventListener('touchstart', (e) => startDrawing(e.touches[0]));
canvas.addEventListener('touchmove', (e) => {
  draw(e.touches[0]);
  e.preventDefault();
});
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  const rect = canvas.getBoundingClientRect();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = lineWidth.value;
  ctx.lineCap = 'round';
  
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download-Button für das fertige Bild
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'mein-manga-held.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Integrierte Hilfslinien (Keine externen Bilder mehr nötig!)
function drawGuide(type) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#cccccc'; // Blassgrau zum Nachfahren
  ctx.lineWidth = 2;

  if (type === 'augen') {
    // Links Auge
    ctx.beginPath();
    ctx.arc(200, 180, 40, 3.8, 5.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(200, 200, 25, 0, Math.PI * 2);
    ctx.stroke();

    // Rechts Auge
    ctx.beginPath();
    ctx.arc(400, 180, 40, 3.8, 5.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(400, 200, 25, 0, Math.PI * 2);
    ctx.stroke();
  } 
  else if (type === 'gesicht') {
    // Gesichtsform
    ctx.beginPath();
    ctx.arc(300, 180, 100, 0, Math.PI);
    ctx.lineTo(300, 320);
    ctx.closePath();
    ctx.stroke();

    // Hilfskreuz für Augen/Nase
    ctx.beginPath();
    ctx.moveTo(300, 80); ctx.lineTo(300, 320);
    ctx.moveTo(200, 200); ctx.lineTo(400, 200);
    ctx.stroke();
  } 
  else if (type === 'steckbrief') {
    ctx.fillStyle = '#666666';
    ctx.font = '16px sans-serif';
    ctx.fillText('MEIN MANGA-HELD', 30, 40);
    ctx.fillText('Name: ______________________', 30, 80);
    ctx.fillText('Stärke: ____________________', 30, 120);
    ctx.fillText('Haiku: _____________________', 30, 160);
    
    // Rahmen für das Bild
    ctx.strokeRect(350, 40, 220, 300);
    ctx.fillText('Zeichnung hier ->', 390, 200);
  }
}
