/*
let tema=localStorage.getItem("tema");
if(tema){
    document.body.classList.add("dark");
}
else{
    document.body.classList.remove("dark");
}    
window.addEventListener("DOMContentLoaded", function(){
    const themeSwitch = document.getElementById("schimba_tema");
    
    // Set the initial state of the switch
    themeSwitch.checked = tema ? true : false;
    document.getElementById("schimba_tema").onclick= function(){
        if(document.body.classList.contains("dark")){
            document.body.classList.remove("dark")
            localStorage.removeItem("tema");
        }
        else{
            document.body.classList.add("dark")
            localStorage.setItem("tema","dark");
        }
    }
});*/
document.addEventListener("DOMContentLoaded", function() {
    const lightThemeRadio = document.getElementById("lightTheme");
    const darkThemeRadio = document.getElementById("darkTheme");
    const blueThemeRadio = document.getElementById("blueTheme");

    const savedTheme = localStorage.getItem("tema");

    // Set the initial theme
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        document.getElementById(`${savedTheme}Theme`).checked = true;
    } else {
        document.body.classList.add("light");
        lightThemeRadio.checked = true;
    }

    // Add event listeners to the radio buttons
    lightThemeRadio.addEventListener("change", function() {
        if (this.checked) {
            changeTheme("light");
        }
    });

    darkThemeRadio.addEventListener("change", function() {
        if (this.checked) {
            changeTheme("dark");
        }
    });

    blueThemeRadio.addEventListener("change", function() {
        if (this.checked) {
            changeTheme("blue");
        }
    });

    function changeTheme(theme) {
        document.body.classList.remove("light", "dark", "blue");
        document.body.classList.add(theme);
        localStorage.setItem("tema", theme);
    }
});
