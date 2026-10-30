const path = window.location.pathname;
const isEN = path.includes("/en/");

window.addEventListener("load", () => {
    const hover_snd = document.getElementById("hover-snd");
    const click_snd = document.getElementById("click-snd");
    const disabled_snd = document.getElementById("disabled-snd");
    const disabled_btns = document.querySelectorAll(".disabled-snd");
    const enabled_btns = document.querySelectorAll(".enabled-snd");
    const exp_snd = document.getElementById("exp-snd");
    const str_btn = document.querySelector(".grind-btn");

    if(str_btn){
        str_btn.addEventListener("mouseenter", () => {
            hover_snd.currentTime = 0;
            hover_snd.play();
        });
        str_btn.addEventListener("click", () => {
            exp_snd.currentTime = 0;
            exp_snd.volume = 0.5;
            exp_snd.play();
        });
    }

    disabled_btns.forEach(disabled_btn => {
        disabled_btn.addEventListener("mouseenter", () => {
            hover_snd.currentTime = 0;
            hover_snd.play();
        });

        disabled_btn.addEventListener("click", () => {
            disabled_snd.currentTime = 0;
            disabled_snd.play();
        });
    });

    enabled_btns.forEach(enabled_btn => {
        enabled_btn.addEventListener("mouseenter", () => {
            hover_snd.currentTime = 0;
            hover_snd.play();
        });

        enabled_btn.addEventListener("click", () => {
            click_snd.currentTime = 0;
            click_snd.play();
        });
    });
});

function mobileMenu(){
    const menu = document.getElementById("mobile-navbar");
    const menu_opt = document.getElementById("menu-btn");
    const visibility = menu.classList.contains("hidden-menu");

    if(visibility){
        menu.classList.remove("hidden-menu");
        menu_opt.textContent = "Close";
        menu_opt.classList.add("selected-opt-mobile");
    }
    else {
        menu.classList.add("hidden-menu");
        menu_opt.textContent = "Menu";
        menu_opt.classList.remove("selected-opt-mobile");
    }
}

if(path.includes("/index.html")){
    const date = new Date();
    const hour = date.getHours();
    const salute_p = document.querySelector(".salute-p");

    let salute = "";

    if(hour >= 5 && hour < 12){
        salute = isEN ? "Good morning," : "Bom dia,";
    }
    else if(hour >= 12 && hour < 18){
        salute = isEN ? "Good afternoon," : "Boa tarde,";
    } 
    else {
        salute = isEN ? "Good evening," : "Boa noite,";
    }
    salute_p.textContent = salute;
}

function readMore(){
    const more_text = document.querySelector("#about-more");
    const more_btn = document.querySelector(".readmore-text");

    const isVisible = more_text.classList.contains("more-text");
    more_text.classList.toggle("more-text", !isVisible);

    more_btn.textContent = isVisible ?
    (isEN ? "[READ LESS.]" : "[VER MENOS.]") :
    (isEN ? "[READ MORE.]" : "[VER MAIS.]");
}

let current_exp = 37;
let total_exp = 50;
let progress = 0;
let level = 4;

function getStronger(){
    const lvlup_snd = document.getElementById("lvlup-snd");
    lvlup_snd.volume = 0.5;

    let progressBar = document.querySelector(".lvl-progress-bar");
    const currentExpDisplays = document.querySelectorAll(".current-exp-display");
    const maxExpDisplay = document.querySelector(".max-exp-display");
    const nextLevelDisplays = document.querySelectorAll(".next-lvl-display");
    const levelDisplay = document.querySelector(".current-lvl-display");
    const standaloneLevelDisplays = document.querySelectorAll(".scurrent-lvl-display");
    
    current_exp += 2;

    while(current_exp >= total_exp){
        current_exp -= total_exp;
        total_exp += 25;

        lvlup_snd.currentTime = 0;
        lvlup_snd.play();

        level++;
    }
    if(current_exp < total_exp){
        progress = (current_exp / total_exp) * 100.0;
    }
    let exp_left = total_exp - current_exp;

    if(level == 9){
        document.documentElement.style.filter = "grayscale(100%)";
        document.getElementById("paige-fullbody").setAttribute('style', 'visibility: hidden;');
        document.getElementById("paige-fullbody-mobile").setAttribute('style', 'visibility: hidden;');
        document.getElementById("portrait-icon").setAttribute('style', 'visibility: hidden;');
        const ability_icons = document.querySelectorAll(".ability-icon");
        ability_icons.forEach(ability_icon => {
            ability_icon.style.visibility = 'hidden';
        });

        const button = document.querySelector(".grind-btn");
        button.remove();
    }

    currentExpDisplays.forEach(currentExpDisplay => {
        currentExpDisplay.textContent = `EXP: ${current_exp}`;
    });
    nextLevelDisplays.forEach(nextLevelDisplay => {
        nextLevelDisplay.textContent = `NEXT: ${exp_left}`;
    });
    standaloneLevelDisplays.forEach(standaloneLevelDisplay => {
        standaloneLevelDisplay.textContent = level;
    });
    levelDisplay.textContent = `LV: ${level}`;

    progressBar.style.width = `${progress}%`;
    maxExpDisplay.textContent = `MAX: ${total_exp}`;
}


if(path.includes("/paige.html") || path.includes("/december.html")){
    function inventoryGen(item) {
        const card = document.createElement("div");
        card.classList.add("abilities-box", "item-card");

        const name = document.createElement("p");
        name.classList.add("ability-name");
        name.textContent = item.name;
        card.appendChild(name);

        const cardImg = document.createElement("img");
        cardImg.classList.add("ability-icon");
        cardImg.src = item.image;
        cardImg.alt = item.name;

        if (item.link != "") {
            const cardImgLink = document.createElement("a");
            cardImgLink.href = item.link;
            cardImgLink.style.cursor = "default";

            cardImgLink.appendChild(cardImg);
            card.appendChild(cardImgLink);
        } else {
            card.appendChild(cardImg);
        }

        const rarity = document.createElement("p");
        rarity.classList.add("item-rarity");
        rarity.textContent = isEN ? `RARITY: ${item.rarity}`: `RARIDADE: ${item.rarity}`;

        if (item.rarity_color !== "") {
            rarity.style.color = item.rarity_color;
        }

        card.appendChild(rarity);

        const description = document.createElement("p");
        description.classList.add("character-desc");
        description.textContent = item.description;
        card.appendChild(description);

        const qtd_label = document.querySelector(".item-qtd");
        let item_qtd = items.length;
        qtd_label.textContent = `TOTAL: ${item_qtd}`;

        return card;
    }

    const inventoryContainer = document.querySelector(".inventory-container");

    items.forEach(function(item) {
        const card = inventoryGen(item);
        inventoryContainer.appendChild(card);
    });

    function rarityFilter(rarity) {
        inventoryContainer.innerHTML = "";

        items.forEach(function(item) {
            if(rarity == "none"  || item.rarity == rarity){
                const card = inventoryGen(item);
                inventoryContainer.appendChild(card);
            }
        });
    }

    function abilityGen(ability) {
        const card = document.createElement("div");
        card.classList.add("abilities-box");

        const name = document.createElement("p");
        name.classList.add("ability-name");
        name.textContent = ability.name;
        card.appendChild(name);

        const cardImg = document.createElement("img");
        cardImg.classList.add("ability-icon");
        cardImg.src = ability.image;
        cardImg.alt = ability.name;

        card.appendChild(cardImg);

        const cost = document.createElement("p");
        cost.classList.add("ability-cost");
        cost.textContent = isEN ? `COST: ${ability.cost}`: `CUSTO: ${ability.cost}`;

        card.appendChild(cost);

        const description = document.createElement("p");
        description.classList.add("character-desc");
        description.textContent = ability.description;
        card.appendChild(description);

        const qtd_label = document.querySelector(".ability-qtd");
        let ability_qtd = abilities.length;
        qtd_label.textContent = `TOTAL: ${ability_qtd}`;

        return card;
    }

    const ability_container = document.querySelector(".ability-container");

    abilities.forEach(function(ability) {
        const card = abilityGen(ability);
        ability_container.appendChild(card);
    });
}

function garbageNoise(){
    const smile = new Audio("../sounds/snd_smile.wav");
    smile.volume = 0.5;
    const ring = new Audio("../sounds/snd_phone.wav");
    ring.volume = 0.5;

    setTimeout(() => { ring.play(); }, 1000);
    setTimeout(() => {
        smile.play();
    }, 4000);

    setTimeout(() => {
        alert("Nothing but garbage noise.");
    }, 9999);
}
function smile(){
    const smile = new Audio("../music/premonition.mp3");
    smile.volume = 0.3;
    const ring = new Audio("../sounds/snd_phone.wav");
    ring.volume = 0.5;

    setTimeout(() => { ring.play(); }, 1000);
    setTimeout(() => {
        smile.play();
    }, 5000);

}

function dogdollar(){
    setTimeout(() => {
        alert("A dollar with a certain dog on it.", "Description");
    }, 200);
}
function noodles(){
    setTimeout(() => {
        alert("Comes with everything you need for a quick meal!", "Description");
    }, 200);
}
function purecrystal(){
    setTimeout(() => {
        alert("You can see the skies while peering inside it's structure.", "Description");
    }, 200);
}
function shadowcrystal(){
    setTimeout(() => {
        alert("A sharp shadow moves like water in the hand.", "Description");
    }, 200);
}
function egg(){
    setTimeout(() => {
        alert("Not too important, not too unimportant.", "Description");
    }, 200);
}
function astronautfood(){
    setTimeout(() => {
        alert("For feeding a pet astronaut.", "Description");
    }, 200);
}
function quiche(){
    setTimeout(() => {
        alert("A spinach egg pie almost psychologically damaged.", "Description");
    }, 200);
}