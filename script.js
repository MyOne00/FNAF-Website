// ===============================
// Augen-Effekt für Freddy-Bild
// ===============================
const eyesPercent = [
  { x: 0.40, y: 0.49 }, // linkes Auge
  { x: 0.579, y: 0.49}  // rechtes Auge
];

// Positioniert die roten Augen auf dem Freddy-Bild
function positionEyes() {
    const freddyImg = document.getElementById('freddy-image');
    const bg = document.querySelector('.freddy-bg');
    document.querySelectorAll('.eye').forEach(e => e.remove());
    const rect = freddyImg.getBoundingClientRect();
    eyesPercent.forEach((eye) => {
        const eyeDiv = document.createElement('div');
        eyeDiv.className = 'eye';
        eyeDiv.style.position = 'absolute';
        eyeDiv.style.left = (rect.left + eye.x * rect.width - 10) + 'px';
        eyeDiv.style.top  = (rect.top  + eye.y * rect.height - 10) + 'px';
        bg.appendChild(eyeDiv);
    });
    startEyeAnimation();
}

// Startet die animierte Glow-Augen-Funktion
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

// ===============================
// DOMContentLoaded: Init alles
// ===============================
window.addEventListener('DOMContentLoaded', () => {
    // Augen initialisieren
    const img = document.getElementById('freddy-image');
    if (img.complete) {
        positionEyes();
    } else {
        img.addEventListener('load', positionEyes);
    }
    window.addEventListener('resize', positionEyes);

    // ===============================
    // Ausklappbare Texte (Mehr anzeigen/Weniger anzeigen)
    // ===============================
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const fullText = document.getElementById(targetId);
            const isVisible = fullText.classList.toggle('open');
            btn.textContent = isVisible ? 'Weniger' : 'Mehr';
        });
    });
});