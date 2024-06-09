
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
});