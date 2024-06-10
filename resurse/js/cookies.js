

//setCookie("a",10, 1000)
function setCookie(nume, val, timpExpirare){//timpExpirare in milisecunde
    d=new Date();
    d.setTime(d.getTime()+timpExpirare)
    document.cookie=`${nume}=${val}; expires=${d.toUTCString()}`;
}

function getCookie(nume){
    vectorParametri=document.cookie.split(";") // ["a=10","b=ceva"]
    for(let param of vectorParametri){
        if (param.trim().startsWith(nume+"="))
            return param.split("=")[1]
    }
    return null;
}

function deleteCookie(nume){
    console.log(`${nume}; expires=${(new Date()).toUTCString()}`)
    document.cookie=`${nume}=0; expires=${(new Date()).toUTCString()}`;
}

function deleteAllCookies(){
    vectorParametri2=document.cookie.split(";");
    for(let param of vectorParametri2){
        deleteCookie(param);
    }
}


window.addEventListener("load", function(){
    if (getCookie("acceptat_banner")){
        document.getElementById("banner").style.display="none";
    }

    this.document.getElementById("ok_cookies").onclick=function(){
        setCookie("acceptat_banner",true,60000);
        document.getElementById("banner").style.display="none"
    }
})

function setLastVisitedPage(page) {
    setCookie("ultima_pagina_accesata", page, 30*24*60*60*1000); // Cookie-ul va expira în 30 de zile
}

// Setați cookie-ul ultima pagină accesată ori de câte ori se încarcă o pagină
window.addEventListener("load", function() {
    var currentPage = window.location.pathname;
    if (currentPage !== "/" && currentPage !== "/index" && currentPage !== "/index.html") {
        setLastVisitedPage(currentPage);
    } else {
        // Dacă suntem pe pagina de index, afișăm ultima pagină accesată
        showCookieInfo();
    }
});

function showCookieInfo() {
    var ultimaPaginaAccesata = getCookie("ultima_pagina_accesata");

    var infoContainer = document.getElementById("cookie_info");

    infoContainer.innerHTML = `
        Ultima pagină accesată: ${ultimaPaginaAccesata ? ultimaPaginaAccesata : "N/A"}<br>
    `;
}

// Apelăm funcția showCookieInfo() când pagina este încărcată
window.addEventListener("load", function () {
    showCookieInfo();
});
