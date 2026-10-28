function applyTheme(theme){
    theme = theme || "light";
    const buttons = document.querySelectorAll(".theme-btn");
    const label = theme === "dark" ? "Light" : "Dark";

    const depths = document.querySelector(".depths");

    document.documentElement.dataset.theme = theme;
    if(document.body) document.body.classList.toggle("dark-mode", theme === "dark");
    if(depths) depths.classList.toggle("isHidden", theme !== "dark");

    buttons.forEach((button) => {
        const mobileOpt = button.querySelector("li");

        if(mobileOpt) mobileOpt.textContent = label;
        else button.textContent = label;
    });
}

function Theme(){
    const lightMode = !document.body.classList.contains("dark-mode");
    const theme = lightMode ? "dark" : "light";
    
    localStorage.setItem("theme", theme);
    applyTheme(theme);
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);