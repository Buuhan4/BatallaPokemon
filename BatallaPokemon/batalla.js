let curacionLimite = true;
let limiteCuracion = true;
let curacionRival = true;
let turnoRed=true;
const jugador = JSON.parse(localStorage.getItem('selectedPokemon'));
const rival = JSON.parse(localStorage.getItem('pokemonRival'));

if (jugador && rival) {
    jugador.currentHp = jugador.hp;
    rival.currentHp = rival.hp;

    document.getElementById("pokemonJugador").src = jugador.img;
    document.getElementById("pokemonJugadorNombre").textContent = jugador.name;
    document.getElementById("pokemonJugadorVida").textContent = jugador.currentHp.toFixed(0);
    document.getElementById("pokemonJugadorVidaMaxima").textContent = jugador.hp;

    document.getElementById("pokemonRival").src = rival.img;
    document.getElementById("pokemonRivalNombre").textContent = rival.name;
    document.getElementById("pokemonRivalVida").textContent = rival.currentHp.toFixed(0);
    document.getElementById("pokemonRivalVidaMaxima").textContent = rival.hp;
} else {
    console.error("Error: Los datos de los Pokémon no se encuentran en localStorage.");
}

function actualizarRegistroDeBatalla(mensaje) {
    const registroDeBatalla = document.getElementById("Registro");
    registroDeBatalla.innerHTML += mensaje + "<br>";
}

function mostrarResultado(ganador) {
    const mensajeResultado = document.createElement("div");
    mensajeResultado.classList.add("mensajeResultado");

    if (ganador == "Red") {
        mensajeResultado.textContent = "Ganador Entrenador Red";
        mensajeResultado.style.backgroundColor = "red";
    } else {
        mensajeResultado.textContent = "Ganador Entrenador Blue";
        mensajeResultado.style.backgroundColor = "blue";
    }

    document.body.appendChild(mensajeResultado);

    setTimeout(() => {
        mensajeResultado.style.display = "block";
    }, 500);

    setTimeout(() => {
        mensajeResultado.style.opacity = 0;
        setTimeout(() => {
            mensajeResultado.remove();
        }, 1000);
    }, 3000);
}

function actualizarBarraVidaJugador() {
    let barraVidaJugador = document.getElementById("pokemonJugadorVidaBarra");
    let porcentajeVida = (jugador.currentHp / jugador.hp) * 100;
    barraVidaJugador.style.width = `${porcentajeVida}%`;

    if (porcentajeVida >= 50) {
        barraVidaJugador.style.backgroundColor = "green";
    } else if (porcentajeVida >= 25) {
        barraVidaJugador.style.backgroundColor = "lightyellow";
    } else {
        barraVidaJugador.style.backgroundColor = "red";
    }
}

function actualizarBarraVidaRival() {
    let barraVidaRival = document.getElementById("pokemonRivalVidaBarra");
    let porcentajeVida = (rival.currentHp / rival.hp) * 100;
    barraVidaRival.style.width = `${porcentajeVida}%`;

    if (porcentajeVida >= 50) {
        barraVidaRival.style.backgroundColor = "green";
    } else if (porcentajeVida >= 25) {
        barraVidaRival.style.backgroundColor = "#FFFF00";
    } else {
        barraVidaRival.style.backgroundColor = "red";
    }
}

function atacar() {
    if(turnoRed){
        document.getElementById("turnoDeRed").textContent = "Turno de Red"; 
    
        let poderMovimiento = 10;
        const randomFactor = Math.random() * (1.2 - 0.8) + 0.8;
        const danoAlDefensor = Math.max(Math.round((jugador.attack / rival.defense) * randomFactor * poderMovimiento), 5);
        rival.currentHp = Math.max(rival.currentHp - danoAlDefensor, 0);
        
        actualizarBarraVidaRival();
        document.getElementById("pokemonRivalVida").textContent = rival.currentHp.toFixed(0);
        actualizarRegistroDeBatalla(`${jugador.name} ataca y causa ${danoAlDefensor} de daño a ${rival.name}!`);
    
        if (rival.currentHp <= 0) {
            actualizarRegistroDeBatalla(`¡${rival.name} ha sido derrotado!`);
            mostrarResultado("Red");
            desactivarBotones();
            return;
        }
    turnoRed=false;
        setTimeout(() => {
            document.getElementById("turnoDeRed").textContent = "Turno del Rival";
            setTimeout(() => {
                turnoRival();
            }, 2000);
        }, 2000);
    }else{
        return;
    }
    
}

function curarse() {
    if(turnoRed){
        if (curacionLimite) {
            let curacion = jugador.hp * 0.5;
            jugador.currentHp = Math.min(jugador.currentHp + curacion, jugador.hp);
            
            actualizarBarraVidaJugador();
            document.getElementById("pokemonJugadorVida").textContent = jugador.currentHp.toFixed(0);
            actualizarRegistroDeBatalla(`${jugador.name} se cura y recupera ${curacion.toFixed(0)} puntos de vida!`);
            curacionLimite = false;
    
            turnoRed=false;
            setTimeout(() => {
                document.getElementById("turnoDeRed").textContent = "Turno del Rival";
                setTimeout(() => {
                    turnoRival();
                }, 2000);
            }, 2000);
        } else {
            actualizarRegistroDeBatalla(`${jugador.name} ya no puede curarse más en esta batalla.`);
            document.getElementById("botonCurar").disabled = true;
        }
    }else{
        return;
    }
    
}

function turnoRival() {
    const numeroAleatorio = Math.floor(Math.random() * 2) + 1;
    if (numeroAleatorio == 1) {
        let poderMovimiento = 10;
        const randomFactor = Math.random() * (1.2 - 0.8) + 0.8;
        const danoAlDefensor = Math.max(Math.round((rival.attack / jugador.defense) * randomFactor * poderMovimiento), 5);
        jugador.currentHp = Math.max(jugador.currentHp - danoAlDefensor, 0);
        
        actualizarBarraVidaJugador();
        document.getElementById("pokemonJugadorVida").textContent = jugador.currentHp.toFixed(0);
        actualizarRegistroDeBatalla(`${rival.name} ataca y causa ${danoAlDefensor} de daño a ${jugador.name}!`);

        if (jugador.currentHp <= 0) {
            actualizarRegistroDeBatalla(`¡${jugador.name} ha sido derrotado!`);
            mostrarResultado("Blue");
            desactivarBotones();
            return;
        }
    } else {
        if (curacionRival) {
            let curacion = rival.hp * 0.5;
            rival.currentHp = Math.min(rival.currentHp + curacion, rival.hp);
            
            actualizarBarraVidaRival();
            document.getElementById("pokemonRivalVida").textContent = rival.currentHp.toFixed(0);
            actualizarRegistroDeBatalla(`${rival.name} se cura y recupera ${curacion.toFixed(0)} puntos de vida!`);
            curacionRival = false;
        } else {
            let poderMovimiento = 10;
            const randomFactor = Math.random() * (1.2 - 0.8) + 0.8;
            const danoAlDefensor = Math.max(Math.round((rival.attack / jugador.defense) * randomFactor * poderMovimiento), 5);
            jugador.currentHp = Math.max(jugador.currentHp - danoAlDefensor, 0);
            
            actualizarBarraVidaJugador();
            document.getElementById("pokemonJugadorVida").textContent = jugador.currentHp.toFixed(0);
            actualizarRegistroDeBatalla(`${rival.name} ataca y causa ${danoAlDefensor} de daño a ${jugador.name}!`);

            if (jugador.currentHp <= 0) {
                actualizarRegistroDeBatalla(`¡${jugador.name} ha sido derrotado!`);
                mostrarResultado("Blue");
                desactivarBotones();
                return;
            }
        }
    }

    setTimeout(() => {
        document.getElementById("turnoDeRed").textContent = "Turno de Red";
        turnoRed=true;
    }, 2000);
}

function rendirse() {
    actualizarRegistroDeBatalla(`Te has retirado de la batalla. ¡Es una derrota!`);
    mostrarResultado("Blue");
    desactivarBotones();
}

function desactivarBotones() {
    document.querySelectorAll("#actions button").forEach(button => button.disabled = true);
}
