const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

// Jogador
let player = { x: 50, y: 50, width: 20, height: 20, monsters: [], keys: 0 };

// Mundo aberto com cidades
const cities = [
    { x: 100, y: 100, name: "Cidade 1 (Líder de Grama)" },
    { x: 300, y: 200, name: "Cidade 2 (Líder de Fogo)" },
    { x: 500, y: 300, name: "Cidade 3 (Líder de Água)" }
];

// Grama para encontros
const grassPatches = [
    { x: 200, y: 150 }, { x: 400, y: 250 }, { x: 250, y: 350 }
];

// Monstros disponíveis
const monsters = [
    { name: "Leão de Fogo", type: "Fogo", level: 1, hp: 20 },
    { name: "Tubarão de Água", type: "Água", level: 1, hp: 20 },
    { name: "Árvore Viva", type: "Grama", level: 1, hp: 20 }
];

// Movimentação
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp": player.y -= 10; break;
        case "ArrowDown": player.y += 10; break;
        case "ArrowLeft": player.x -= 10; break;
        case "ArrowRight": player.x += 10; break;
    }
    checkGrass();
    checkCity();
});

// Verifica encontro na grama
function checkGrass() {
    for (let grass of grassPatches) {
        if (player.x >= grass.x && player.x <= grass.x + 30 &&
            player.y >= grass.y && player.y <= grass.y + 30) {
            if (Math.random() < 0.3) {
                startBattle();
                return;
            }
        }
    }
}

// Iniciar batalha
function startBattle() {
    document.getElementById("battleScreen").classList.remove("hidden");
    let enemy = monsters[Math.floor(Math.random() * monsters.length)];
    document.getElementById("battleInfo").innerText = `Você encontrou um ${enemy.name} de nível ${enemy.level}!`;
}

// Verifica cidades
function checkCity() {
    for (let city of cities) {
        if (player.x >= city.x && player.x <= city.x + 50 &&
            player.y >= city.y && player.y <= city.y + 50) {
            document.getElementById("cityMessage").classList.remove("hidden");
            document.getElementById("cityInfo").innerText = `Você chegou em ${city.name}!`;
            return;
        }
    }
}

// Fecha mensagem de cidade
document.getElementById("closeCity").addEventListener("click", () => {
    document.getElementById("cityMessage").classList.add("hidden");
});

// Desenha jogador e cenário
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Desenha cidades
    ctx.fillStyle = "gray";
    for (let city of cities) {
        ctx.fillRect(city.x, city.y, 50, 50);
    }

    // Desenha grama
    ctx.fillStyle = "green";
    for (let grass of grassPatches) {
        ctx.fillRect(grass.x, grass.y, 30, 30);
    }
    
    requestAnimationFrame(draw);
}

draw();
