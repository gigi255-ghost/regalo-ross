document.addEventListener('DOMContentLoaded', () => {
    actualizarCandado();
    setInterval(actualizarCandado, 1000);
    configurarNavegacion();
});

// ===== LOGICA DEL CANDADO CON CUENTA REGRESIVA =====
function obtenerProximoCumple() {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const finDelDiaCumple = new Date(anio, 8, 23, 23, 59, 59);
    let cumple = new Date(anio, 8, 23, 0, 0, 0);
    if (ahora > finDelDiaCumple) {
        cumple = new Date(anio + 1, 8, 23, 0, 0, 0);
    }
    return cumple;
}

function actualizarCandado() {
    const modoPrueba = window.location.search.includes('test=true');
    const circulo = document.getElementById('candado-circulo');
    const icono = document.getElementById('candado-icono');
    const mensaje = document.getElementById('mensaje-candado');
    const cumple = obtenerProximoCumple();
    const ahora = new Date();
    const diferencia = cumple - ahora;

    if (diferencia <= 0 || modoPrueba) {
        document.getElementById('dias').textContent = '00';
        document.getElementById('horas').textContent = '00';
        document.getElementById('minutos').textContent = '00';
        document.getElementById('segundos').textContent = '00';
        circulo.classList.add('desbloqueado');
        icono.textContent = '🔓';
        mensaje.textContent = modoPrueba
            ? '🔓 Modo de prueba activado'
            : '¡Feliz cumpleaños! Toca el candado 🎁';
    } else {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        document.getElementById('dias').textContent = String(dias).padStart(2, '0');
        document.getElementById('horas').textContent = String(horas).padStart(2, '0');
        document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
        document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');

        circulo.classList.remove('desbloqueado');
        icono.textContent = '🔒';
        mensaje.textContent = 'Toca el candado el día de tu cumpleaños 🌷';
    }
}

// ===== CAMBIAR DE UNA PANTALLA A OTRA =====
function cambiarPantalla(idActual, idSiguiente) {
    document.getElementById(idActual).classList.remove('activa');
    document.getElementById(idSiguiente).classList.add('activa');
}

// ===== BOTONES Y CLICS =====
function configurarNavegacion() {
    document.getElementById('candado-circulo').addEventListener('click', () => {
        if (document.getElementById('candado-circulo').classList.contains('desbloqueado')) {
            cambiarPantalla('pantalla-candado', 'pantalla-carta');
        }
    });

    document.getElementById('sobre').addEventListener('click', () => {
        document.getElementById('sobre').classList.add('deslizado');
        document.getElementById('carta-texto').classList.add('visible');
    });

    document.getElementById('btn-siguiente-1').addEventListener('click', () => {
        cambiarPantalla('pantalla-carta', 'pantalla-galeria');
    });

    document.getElementById('btn-siguiente-2').addEventListener('click', () => {
        cambiarPantalla('pantalla-galeria', 'pantalla-lirios');
    });

    document.getElementById('btn-siguiente-3').addEventListener('click', () => {
        cambiarPantalla('pantalla-lirios', 'pantalla-final');
    });
}

// ===== FONDO DE UNIVERSO (ESTRELLAS + NEBULOSA) =====
const canvasUniverso = document.getElementById('universo-canvas');
const ctxUniverso = canvasUniverso.getContext('2d');

function ajustarCanvasUniverso() {
    canvasUniverso.width = window.innerWidth;
    canvasUniverso.height = window.innerHeight;
}
ajustarCanvasUniverso();
window.addEventListener('resize', ajustarCanvasUniverso);

const cantidadEstrellas = 150;
const estrellas = [];
for (let i = 0; i < cantidadEstrellas; i++) {
    estrellas.push({
        x: Math.random() * canvasUniverso.width,
        y: Math.random() * canvasUniverso.height,
        radio: Math.random() * 1.4 + 0.3,
        velocidad: Math.random() * 0.15 + 0.02,
        fase: Math.random() * Math.PI * 2,
        velocidadTitilar: Math.random() * 0.02 + 0.01,
        tinte: Math.random() < 0.35 ? '246,220,236' : '200,210,255'
    });
}

const corazones = [];
const cantidadCorazones = 25;
for (let i = 0; i < cantidadCorazones; i++) {
    corazones.push({
        x: Math.random() * canvasUniverso.width,
        y: Math.random() * canvasUniverso.height,
        tamano: Math.random() * 8 + 8,
        velocidad: Math.random() * 0.12 + 0.03,
        fase: Math.random() * Math.PI * 2,
        velocidadTitilar: Math.random() * 0.015 + 0.008
    });
}

const nebulosas = [
    { x: 0.5, y: 0.55, r: 340, color: 'rgba(230,90,170,0.20)' },
    { x: 0.4, y: 0.5, r: 220, color: 'rgba(190,70,190,0.16)' },
    { x: 0.6, y: 0.6, r: 260, color: 'rgba(140,60,190,0.14)' }
];

let fugaz = null;
function crearFugaz() {
    fugaz = {
        x: Math.random() * canvasUniverso.width * 0.5,
        y: Math.random() * canvasUniverso.height * 0.3,
        largo: 120 + Math.random() * 80,
        velocidad: 9 + Math.random() * 4,
        vida: 1
    };
}
setInterval(() => {
    if (Math.random() < 0.5) crearFugaz();
}, 3500);

function dibujarUniverso() {
    ctxUniverso.fillStyle = '#0a0a1a';
    ctxUniverso.fillRect(0, 0, canvasUniverso.width, canvasUniverso.height);

    nebulosas.forEach(n => {
        const grad = ctxUniverso.createRadialGradient(
            n.x * canvasUniverso.width, n.y * canvasUniverso.height, 0,
            n.x * canvasUniverso.width, n.y * canvasUniverso.height, n.r
        );
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctxUniverso.fillStyle = grad;
        ctxUniverso.fillRect(0, 0, canvasUniverso.width, canvasUniverso.height);
    });

    estrellas.forEach(e => {
        e.fase += e.velocidadTitilar;
        const brillo = (Math.sin(e.fase) + 1) / 2;
        const opacidad = 0.3 + brillo * 0.7;

        ctxUniverso.beginPath();
        ctxUniverso.arc(e.x, e.y, e.radio, 0, Math.PI * 2);
        ctxUniverso.fillStyle = `rgba(${e.tinte}, ${opacidad})`;
        ctxUniverso.shadowBlur = 6;
        ctxUniverso.shadowColor = `rgba(${e.tinte}, ${opacidad})`;
        ctxUniverso.fill();
        ctxUniverso.shadowBlur = 0;

        e.y += e.velocidad;
        if (e.y > canvasUniverso.height) {
            e.y = 0;
            e.x = Math.random() * canvasUniverso.width;
        }
    });

    
    corazones.forEach(c => {
        c.fase += c.velocidadTitilar;
        const brillo = (Math.sin(c.fase) + 1) / 2;
        const opacidad = 0.3 + brillo * 0.6;

        ctxUniverso.font = `${c.tamano}px sans-serif`;
        ctxUniverso.globalAlpha = opacidad;
        ctxUniverso.fillText('❤️', c.x, c.y);
        ctxUniverso.globalAlpha = 1;

        c.y -= c.velocidad;
        if (c.y < -20) {
            c.y = canvasUniverso.height + 20;
            c.x = Math.random() * canvasUniverso.width;
        }
    });

    if (fugaz) {
        ctxUniverso.beginPath();
        const grad = ctxUniverso.createLinearGradient(
            fugaz.x, fugaz.y,
            fugaz.x - fugaz.largo, fugaz.y - fugaz.largo * 0.4
        );
        grad.addColorStop(0, `rgba(255,255,255,${fugaz.vida})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctxUniverso.strokeStyle = grad;
        ctxUniverso.lineWidth = 2;
        ctxUniverso.moveTo(fugaz.x, fugaz.y);
        ctxUniverso.lineTo(fugaz.x - fugaz.largo, fugaz.y - fugaz.largo * 0.4);
        ctxUniverso.stroke();

        fugaz.x += fugaz.velocidad;
        fugaz.y += fugaz.velocidad * 0.4;
        fugaz.vida -= 0.02;
        if (fugaz.vida <= 0 || fugaz.x > canvasUniverso.width + 200) fugaz = null;
    }

    requestAnimationFrame(dibujarUniverso);
}

dibujarUniverso();