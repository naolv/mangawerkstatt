const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');

let isDrawing = false;
let eyeIndex = 0;
let faceIndex = 0;

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

// Integrierte Hilfslinien mit Wechsel-Funktion
function drawGuide(type) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#cccccc'; // Blassgrau zum Nachfahren
  ctx.lineWidth = 3;

  if (type === 'augen') {
    eyeIndex = (eyeIndex + 1) % 4; // Schaltet durch 4 verschiedene Augen-Stile

    if (eyeIndex === 1) {
      // 1. Klassische Manga-Augen (Groß & Ausdrucksstark)
      // Linkes Auge
      ctx.beginPath(); ctx.ellipse(200, 200, 35, 55, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(200, 200, 15, 30, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(190, 180, 8, 0, Math.PI * 2); ctx.stroke(); // Glanzpunkt
      // Rechtes Auge
      ctx.beginPath(); ctx.ellipse(400, 200, 35, 55, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(400, 200, 15, 30, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(390, 180, 8, 0, Math.PI * 2); ctx.stroke(); // Glanzpunkt
    } 
    else if (eyeIndex === 2) {
      // 2. Mutige / Entschlossene Augen (Katzenhaft / Spitz)
      // Linkes Auge
      ctx.beginPath(); ctx.moveTo(140, 210); ctx.lineTo(230, 170); ctx.lineTo(250, 210); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(200, 200, 15, 25, 0, 0, Math.PI * 2); ctx.stroke();
      // Rechtes Auge
      ctx.beginPath(); ctx.moveTo(460, 210); ctx.lineTo(370, 170); ctx.lineTo(350, 210); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(400, 200, 15, 25, 0, 0, Math.PI * 2); ctx.stroke();
    } 
    else if (eyeIndex === 3) {
      // 3. Chibi / Niedliche Augen (Sehr rund & fröhlich)
      // Linkes Auge
      ctx.beginPath(); ctx.arc(200, 200, 45, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(185, 185, 12, 0, Math.PI * 2); ctx.stroke(); // Licht
      ctx.beginPath(); ctx.arc(210, 215, 6, 0, Math.PI * 2); ctx.stroke();  // Licht 2
      // Rechtes Auge
      ctx.beginPath(); ctx.arc(400, 200, 45, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(385, 185, 12, 0, Math.PI * 2); ctx.stroke(); // Licht
      ctx.beginPath(); ctx.arc(410, 215, 6, 0, Math.PI * 2); ctx.stroke();  // Licht 2
    } 
    else {
      // 0. Sanfte / Traurige / Ruhige Augen (Sanfter Schwung)
      // Linkes Auge
      ctx.beginPath(); ctx.arc(200, 190, 45, 3.6, 5.7); ctx.stroke(); // Oberes Lid
      ctx.beginPath(); ctx.ellipse(200, 210, 18, 25, 0, 0, Math.PI * 2); ctx.stroke();
      // Rechtes Auge
      ctx.beginPath(); ctx.arc(400, 190, 45, 3.6, 5.7); ctx.stroke(); // Oberes Lid
      ctx.beginPath(); ctx.ellipse(400, 210, 18, 25, 0, 0, Math.PI * 2); ctx.stroke();
    }
  } 
  else if (type === 'gesicht') {
    faceIndex = (faceIndex + 1) % 2;

    if (faceIndex === 1) {
      // Spitzes Manga-Gesicht
      ctx.beginPath();
      ctx.moveTo(200, 150);
      ctx.lineTo(210, 250);
      ctx.lineTo(300, 320); // Kinn
      ctx.lineTo(390, 250);
      ctx.lineTo(400, 150);
      ctx.arc(300, 150, 100, Math.PI, 0);
      ctx.stroke();
      // Hilfslinien
      ctx.beginPath(); ctx.moveTo(300, 50); ctx.lineTo(300, 320); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(200, 200); ctx.lineTo(400, 200); ctx.stroke();
    } else {
      // Rundes Chibi-Gesicht
      ctx.beginPath(); ctx.arc(300, 200, 110, 0, Math.PI * 2); ctx.stroke();
      // Hilfslinien
      ctx.beginPath(); ctx.moveTo(300, 90); ctx.lineTo(300, 310); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(190, 210); ctx.lineTo(410, 210); ctx.stroke();
    }
  } 
  else if (type === 'steckbrief') {
    ctx.fillStyle = '#666666';
    ctx.font = '16px sans-serif';
    ctx.fillText('MEIN MANGA-HELD', 30, 40);
    ctx.fillText('Name: ______________________', 30, 80);
    ctx.fillText('Stärke: ____________________', 30, 120);
    ctx.fillText('Haiku: _____________________', 30, 160);
    
    // Rahmen für das Bild
    ctx.strokeRect(330, 30, 240, 330);
    ctx.fillText('Zeichnung hier ->', 380, 190);
  }
}
