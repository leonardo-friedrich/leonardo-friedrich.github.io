const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let mouseX = 0;
let mouseY = 0;
let missileActive = false; // Adicione esta variável para controlar o estado do míssil

// Variáveis para armazenar as imagens do avião e explosão
const aviao = new Image();
aviao.src = "aviao.png"; // Substitua 'aviao.png' com o caminho para a imagem do avião

const explosao = new Image();
explosao.src = "explosion.png"; // Substitua 'explosion.png' com o caminho para a imagem de explosão

const aviaoWidth = 50;
const aviaoHeight = 50;

// Função para desenhar o avião
function drawAirplane(x, y) {
    ctx.drawImage(aviao, x - aviaoWidth / 2, y - aviaoHeight / 2, aviaoWidth, aviaoHeight);
}

// Função para desenhar o míssil apontando para o avião
function drawMissile(x, y, targetX, targetY) {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();
}

// Função para atualizar a posição do avião e redesenhar a animação
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualiza a posição do avião para seguir o cursor do mouse
    drawAirplane(mouseX, mouseY);

    if (missileActive) {
        // Calcula a direção do míssil em relação ao avião
        const missileX = canvas.width / 2;
        const missileY = canvas.height / 2;
        drawMissile(missileX, missileY, mouseX, mouseY);

        // Verifica se o míssil atingiu o avião
        const distancia = Math.sqrt((mouseX - missileX) ** 2 + (mouseY - missileY) ** 2);
        if (distancia < aviaoWidth / 2) {
            missileActive = false;
            // Substitui a imagem do avião pela imagem de explosão
            const aviao = new Image();
            aviao.src = 'explosion.png'; // Substitua 'explosion.png' com o caminho para a imagem de explosão
            drawAirplane(mouseX, mouseY);
        }
    }

    requestAnimationFrame(update);
}

// Captura a posição do mouse
canvas.addEventListener("mousemove", (event) => {
    mouseX = event.clientX - canvas.getBoundingClientRect().left;
    mouseY = event.clientY - canvas.getBoundingClientRect().top;
});

// Dispara o míssil quando o botão esquerdo do mouse é pressionado
canvas.addEventListener("mousedown", (event) => {
    if (!missileActive && event.button === 0) {
        missileActive = true;
    }
});

// Inicia a animação
aviao.onload = () => {
    explosao.onload = () => {
        update();
    };
};
