const path = window.location.pathname;
const isEN = path.includes("/en/");
let isDarkMode = document.body.classList.contains("dark-mode");

const basePath = path.includes("/HERO-form-P2") ?
"/HERO-form-P2/" : "/";

const homePath = isEN ?
`${basePath}en/index.html` : `${basePath}pt/index.html`;

const isHome =
    path === `${basePath}pt/` || path === `${basePath}en/` ||
    path === `${basePath}pt/index.html` || path === `${basePath}en/index.html`;

/* Sistema da mensagem de disclaimer */
function disclaimerState(){
    const btn = document.getElementById("understand-btn");
    let disclaimer_msg = document.getElementById("disclaimer-tab");
    disclaimer_msg.classList.toggle("hide-info");
    btn.disabled = true;

    setTimeout(() => { disclaimer_msg.style.display = "none"; }, 2000);
    localStorage.setItem("disclaimer", true);
}

if (localStorage.getItem("disclaimer") !== "true" && !isHome) {
    window.location.replace(homePath);
}

/* Som dos botões */
window.addEventListener("load", () => {
    const hover_snd = document.getElementById("hover-snd");
    const click_snd = document.getElementById("click-snd");
    const noise_snd = document.getElementById("noise-snd");
    const disabled_snd = document.getElementById("disabled-snd");
    const disabled_btns = document.querySelectorAll(".disabled-snd");
    const enabled_btns = document.querySelectorAll(".enabled-snd");
    const exp_snd = document.getElementById("exp-snd");
    const str_btn = document.querySelector(".grind-btn");
    const reset_btn = document.getElementById("reset-btn");

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

    if(reset_btn){
        reset_btn.addEventListener("mouseenter", () => {
            hover_snd.currentTime = 0;
            hover_snd.play();
        });
        reset_btn.addEventListener("click", () => {
            noise_snd.currentTime = 0;
            noise_snd.volume = 0.5;
            noise_snd.play();
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

if(isHome){
    /* mensagem de saudações */
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


    /* DISCLAIMER MESSAGE */
    let disclaimer_tab = document.getElementById("disclaimer-tab");
    if(localStorage.getItem("disclaimer") === "true") { disclaimer_tab.style.display = "none"; }

    let understand_btn = document.getElementById("understand-btn");
    understand_btn.disabled = true;

    setTimeout(() => {
        understand_btn.classList.add("fadein");
        understand_btn.style.cursor = "pointer";

        setTimeout(() => { 
            understand_btn.style.transition = "0.1s"; 
            understand_btn.classList.remove("noHover");
            understand_btn.disabled = false;
        }, 2000);
    }, 5000);
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

/* Barra de progresso */
function getStronger(){
    const lvlup_snd = document.getElementById("lvlup-snd");
    lvlup_snd.volume = 0.5;

    let progressBar = document.querySelector(".lvl-progress-bar");
    const currentExpDisplays = document.querySelectorAll(".current-exp-display");
    const maxExpDisplay = document.querySelector(".max-exp-display");
    const nextLevelDisplays = document.querySelectorAll(".next-lvl-display");
    const levelDisplay = document.querySelector(".current-lvl-display");
    const standaloneLevelDisplays = document.querySelectorAll(".scurrent-lvl-display");

    const lv_up_txt = document.querySelector(".lv-up-txt");
    
    current_exp += 2;

    while(current_exp >= total_exp){
        current_exp -= total_exp;
        total_exp += 25;

        lvlup_snd.currentTime = 0;
        lvlup_snd.play();

        lv_up_txt.classList.toggle("lv-up-txt-appear");
        setTimeout(() => { lv_up_txt.classList.toggle("lv-up-txt-appear"); }, 1500);

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
    /* cards de items */
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

    /* cards de habilidades */
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
        cost.textContent = isEN ? `COST: ${ability.cost}%`: `CUSTO: ${ability.cost}%`;

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

if(path.includes("/gallery.html")){
    /* cards de artworks */
    function cardGen(art) {
        const card = document.createElement("div");
        card.classList.add("art-box");

        const cardImgLink = document.createElement("a");
        cardImgLink.classList.add("enabled-snd");
        cardImgLink.href = art.link;
        cardImgLink.target = "_blank";

        const cardImg = document.createElement("img");
        cardImg.src = art.image;
        cardImg.alt = art.title;

        cardImgLink.appendChild(cardImg);
        card.appendChild(cardImgLink);

        const titleBox = document.createElement("div");
        titleBox.classList.add("art-title-box");

        const title = document.createElement("p");
        title.classList.add("art-title");
        title.textContent = art.title;

        const data = document.createElement("p");
        data.classList.add("art-date");
        data.textContent = art.date;

        titleBox.appendChild(title);
        titleBox.appendChild(data);

        const description = document.createElement("p");
        description.classList.add("art-desc");

        if(art.description != ""){
            description.textContent = art.description;
            titleBox.appendChild(description);
        }
        else{
            description.textContent = "(NO DESCRIPTION.)";
            titleBox.appendChild(description);
        }
        
        const videoLink_p = document.createElement("p");
        const videoLink = document.createElement("a");

        if(art.video != ""){
            videoLink.href = art.video;
            videoLink.target = "_blank";
            videoLink_p.classList.add("art-link", "enabled-snd");
            videoLink_p.textContent = ">>See timelapse";
            videoLink_p.style.cursor = "pointer";

            videoLink.appendChild(videoLink_p);
            titleBox.appendChild(videoLink);
        }
        else{
            videoLink_p.classList.add("art-link");
            videoLink_p.textContent = ".";
            videoLink_p.style.opacity = 0;
            titleBox.appendChild(videoLink_p);
        }

        card.appendChild(titleBox);
        return card;
    }

    const specialsContainer = document.querySelector(".specials-carousel");
    const artworksContainer = document.querySelector(".artworks-carousel");

    specials.forEach(function(art) {
        const card = cardGen(art);
        specialsContainer.appendChild(card);
    });

    artworks.forEach(function(art) {
        const card = cardGen(art);
        artworksContainer.appendChild(card);
    });    
}

if(path.includes("/contact.html")){
    /* validação do formulário */
    const form = document.querySelector(".contact-form");
    let feedback = document.querySelector(".form_feedback");

    let name_field = document.getElementById("name");
    let email_field = document.getElementById("email");
    let comment_field = document.getElementById("comment");
    let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const submit_btn = document.getElementById("submit-btn");
    const reset_btn = document.getElementById("reset-btn");

    function verifyFields(){
        if(name_field.value.trim() === "" || comment_field.value.trim() === "" || 
        !emailFormat.test(email_field.value.trim())){
            submit_btn.disabled = true;
        }
        else submit_btn.disabled = false;
    }

    name_field.addEventListener("input", verifyFields);
    email_field.addEventListener("input", verifyFields);
    comment_field.addEventListener("input", verifyFields);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        feedback.style.color = "red";

        if(name_field.value.trim() === "" || comment_field.value.trim() === ""){
            feedback.textContent = isEN ? 
            "Please, fill all the required fields." : 
            "Por gentileza, preencha todos os campos obrigatórios.";
            return;
        }
        if(!emailFormat.test(email_field.value.trim())){
            feedback.textContent = isEN ? 
            "Please, enter a valid email address." : 
            "Por gentileza, use um endereço de email válido.";
            return;
        }

        feedback.style.color = "white";
        feedback.textContent = isEN ? 
        "Opening your email application." : 
        "Abrindo seu aplicativo de email.";

        submit_btn.addEventListener("click", () => {
            submit_btn.textContent = isEN ? "EMAIL SENT" : "EMAIL ENVIADO";
            setTimeout(() => { submit_btn.textContent = isEN ? "SEND" : "ENVIAR"; }, 2000);
        });

        setTimeout(() => { form.submit(); }, 1000);
    });

    reset_btn.addEventListener("click", () => { submit_btn.disabled = true });
}

function garbageNoise(){
    const smile = new Audio("../sounds/snd_smile.wav");
    smile.volume = 0.5;
    const ring = new Audio("../sounds/snd_phone.wav");
    ring.volume = 0.5;

    setTimeout(() => { ring.play(); }, 1000);
    setTimeout(() => { smile.play(); }, 4000);

    setTimeout(() => { alert("Nothing but garbage noise."); }, 9999);
}
function smile(){
    const smile = new Audio("../music/premonition.mp3");
    smile.volume = 0.3;
    const ring = new Audio("../sounds/snd_phone.wav");
    ring.volume = 0.5;

    setTimeout(() => { ring.play(); }, 1000);
    setTimeout(() => { smile.play(); }, 5000);

}

function dogdollar(){
    setTimeout(() => { alert("A dollar with a certain dog on it.", "Description"); }, 200);
}
function noodles(){
    setTimeout(() => { alert("Comes with everything you need for a quick meal!", "Description"); }, 200);
}
function purecrystal(){
    setTimeout(() => { alert("You can see the skies while peering inside it's structure.", "Description"); }, 200);
}
function shadowcrystal(){
    setTimeout(() => { alert("A sharp shadow moves like water in the hand.", "Description"); }, 200);
}
function egg(){
    setTimeout(() => { alert("Not too important, not too unimportant.", "Description"); }, 200);
}
function astronautfood(){
    setTimeout(() => { alert("For feeding a pet astronaut.", "Description"); }, 200);
}
function quiche(){
    setTimeout(() => { alert("A spinach egg pie almost psychologically damaged.", "Description"); }, 200);
}