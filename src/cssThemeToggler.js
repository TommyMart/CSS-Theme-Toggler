console.log("CSS Theme toggler loaded and running!");


let themes = [
    {
        name: "dark",
        properties: {
            backgroundColour: "darkgrey",
            fontColour: "white",
            "theme-100": "#4641d1"
        }
    },
    {
        name: "light",
        properties: {
            backgroundColour: "#87E0E0",
            fontColour: "black",
            "theme-100": "#87E0E0"
        }
    }
];

// Read theme name stored in local storage
// and update CSS variables based on that name
function getChosenTheme(){
    let foundTheme = localStorage.getItem("theme");
    console.log(foundTheme);
    return foundTheme;
}

// Set theme name to local storage
// and update CSS variables based on that name 
function setChosenTheme(newThemeName){
    localStorage.setItem("theme", newThemeName);

}

if (getChosenTheme() == null){
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      // Theme set to dark.
      setChosenTheme("dark");
      console.log("No theme found, applied the dark theme");
    } else {
      // Theme set to light.
      setChosenTheme("light");
      console.log("No theme found, applied the light theme");
    }
}

setChosenTheme("dark");

// Loop through properties key in chosen theme object 
// and apply those properties to CSS
function updateCSSVariables(){

}

function toggleTheme(){
    // if ("dark "== "dark"){
    // if ("light" == "dark"){
    if (getChosenTheme() == "dark"){
        // set it to light
        setChosenTheme("light");
    } else {
        // set it to dark
        setChosenTheme("dark");
    }
}

let themeToggleButton = document.getElementById("themeToggle");
themeToggleButton.onclick = toggleTheme;
// themeToggleButton.addEventListener("click", toggleTheme) - same as ^

let rootElement = document.querySelector(":root");


function getVariablesFromCSS(){
    console.log(rootElement);


    // console.log(document.documentElement.style.getPropertyValue("--backgroundColor"));

    let rootStyles = rootElement.getComputedStyle(rootElement);

    console.log(rootStyles.getPropertyValue("--backgroundColor"));



}

getVariablesFromCSS();