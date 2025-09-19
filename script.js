// Koordinaten der Pupillen in Prozent (ermittelt am Bild, z.B. links ca. 36%, rechts ca. 63%)
const eyesPercent = [
  { x: 0.39, y: 0.49 }, // linkes Auge
  { x: 0.58, y: 0.49 }  // rechtes Auge
];

function positionEyes() {
  const freddyImg = document.getElementById('freddy-image');
  const bg = document.querySelector('.freddy-bg');
  // Alte Augen entfernen
  document.querySelectorAll('.eye').forEach(e => e.remove());
  const rect = freddyImg.getBoundingClientRect();
  eyesPercent.forEach((eye, i) => {
    const eyeDiv = document.createElement('div');
    eyeDiv.className = 'eye';
    eyeDiv.style.position = 'absolute';
    // Position relativ zum Bild!
    eyeDiv.style.left = (rect.left + eye.x * rect.width - 23) + 'px'; // 23 = Hälfte der eye-Größe
    eyeDiv.style.top  = (rect.top  + eye.y * rect.height - 23) + 'px';
    bg.appendChild(eyeDiv);
  });
  startEyeAnimation();
}

function startEyeAnimation() {
  function randomEyes() {
    const eyes = document.querySelectorAll(".eye");
    const delay = Math.random() * 8000 + 2000;
    setTimeout(() => {
      eyes.forEach(e => e.classList.add("active"));
      setTimeout(() => {
        eyes.forEach(e => e.classList.remove("active"));
        randomEyes();
      }, 900);
    }, delay);
  }
  randomEyes();
}

window.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('freddy-image');
  if (img.complete) {
    positionEyes();
  } else {
    img.addEventListener('load', positionEyes);
  }
  window.addEventListener('resize', positionEyes);
});