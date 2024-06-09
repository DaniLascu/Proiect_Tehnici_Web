window.addEventListener("load",function(){

        function verificaValoriFiltrare() {
            let cond_verificare = true;
            var inpNume_verificare= document.getElementById("inp-nume").value.trim().toLowerCase();
            // var inpPret_verificare = parseInt(document.getElementById("inp-pret").value);
            var inpBrand_verificare = document.getElementById("brand").value.trim().toLowerCase();
            var inpDesc_verificare = document.getElementById("descriere_ceas").value.trim().toLowerCase();

            var numeRegex = /^[a-zA-Z0-9]+$/; // Acceptă doar litere, cifre și spații
            if(inpNume_verificare == ""){
                cond_verificare =  true;
            }
            else if  (!numeRegex.test(inpNume_verificare)) {
                document.getElementById("inp-nume").value = "";
                window.alert("Numele poate conține doar litere, cifre și spații.");
                cond_verificare =  false;
            }

            var brand_list = document.getElementById("brands");
            const options = brand_list.getElementsByTagName('option');
            console.log(inpBrand_verificare);
            if(inpBrand_verificare === ""){
                cond_verificare = true;
            }
            else{
                let ok2 = false;
                for (let i = 0; i < options.length; i++) {
                    console.log(options[i].value.trim().toLocaleLowerCase() == (inpBrand_verificare)); // Access the value attribute of each option
                    if(options[i].value.trim().toLowerCase() == (inpBrand_verificare)){
                        ok2 = true;
                        break;
                    }
                }
                if(!ok2){
                    cond_verificare = false;
                    window.alert("Brand-ul nu se gaseste pe acest site");
                    document.getElementById("brand").value = "";
                }
                else{cond_verificare = true;}
            }
            
            return cond_verificare;
        }
            
        document.getElementById("inp-pret").onchange=function(){
            document.getElementById("infoRange").innerHTML=`(${this.value})`
        }

        //document.getElementById("filtrare").addEventListener("click",function(){})
        document.getElementById("filtrare").onclick=function(){
            var inpNume= document.getElementById("inp-nume").value.trim().toLowerCase();
            var vRadio= document.getElementsByName("gr_rad");
            
            var inpDiametru;
            for(let r of vRadio){
                if(r.checked){
                    inpDiametru = r.value;
                    break;
                }
            }

            let minDiametru, maxDiametru;
            if(inpDiametru!="toate"){
                var aux = inpDiametru.split(":");
                minDiametru = parseInt(aux[0]);
                maxDiametru = parseInt(aux[1]);
            }

            var inpPret = parseInt(document.getElementById("inp-pret").value);

            var inpCateg = document.getElementById("inp-categorie").value.trim().toLowerCase();

            var inpFunc1 = document.getElementById("locatie");
            var valFunc1 = null;
            var inpRadio1;
            var valRadio1 = null;
            if(inpFunc1.checked){
                valFunc1 =  document.getElementById("locatie").value.trim().toLowerCase();
                inpRadio1 = document.getElementsByName("functie_locatie");
                for(let l of inpRadio1){
                    if(l.checked){
                        valRadio1=l.value;
                        break;
                    }
                }
            }

            var inpFunc2 = document.getElementById("data");
            var valFunc2 = null;
            var inpRadio2;
            var valRadio2 = null;
            if(inpFunc2.checked){
                valFunc2 =  document.getElementById("data").value.trim().toLowerCase();
                inpRadio2 = document.getElementsByName("functie_data");
                for(let l of inpRadio2){
                    if(l.checked){
                        valRadio2=l.value;
                        break;
                    }
                }
            }

            var inpFunc3 = document.getElementById("alarma");
            var valFunc3 = null;
            var inpRadio3;
            var valRadio3 = null;
            if(inpFunc3.checked){
                valFunc3 =  document.getElementById("alarma").value.trim().toLowerCase();
                inpRadio3 = document.getElementsByName("functie_alarma");
                for(let l of inpRadio3){
                    if(l.checked){
                        valRadio3=l.value;
                        break;
                    }
                }
            }

            var inpFunc4 = document.getElementById("cronometru");
            var valFunc4 = null;
            var inpRadio4;
            var valRadio4 = null;
            if(inpFunc4.checked){
                valFunc4 =  document.getElementById("cronometru").value.trim().toLowerCase();
                inpRadio4 = document.getElementsByName("functie_cronometru");
                for(let l of inpRadio4){
                    if(l.checked){
                        valRadio4=l.value;
                        break;
                    }
                }
            }

            var inpBrand = document.getElementById("brand").value.trim().toLowerCase();
            var inpDesc = document.getElementById("descriere_ceas").value.trim().toLowerCase();
            var inpMecanism = document.getElementById("inp_mecanism").selectedOptions;
            var values = Array.from(inpMecanism).map(({ value }) => value);

            if(verificaValoriFiltrare() && validateTextarea()){
            var produse= document.getElementsByClassName("produs");
            for(let produs of produse){
                let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
                let cond1 = (valNume.startsWith(inpNume) || levenshteinDistance(valNume, inpNume) <= 2)

                let valDiametru = parseInt(produs.getElementsByClassName("val-diametru")[0].innerHTML);
                let cond2 = (inpDiametru=="toate" || (minDiametru<=valDiametru && valDiametru<=maxDiametru))

                let valPret = parseInt(produs.getElementsByClassName("val-pret")[0].innerHTML);
                let cond3 = valPret > inpPret;

                let valCateg = produs.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
                let cond4 = (inpCateg == "toate" || inpCateg == valCateg);

                let valFunctii = produs.getElementsByClassName("val-functii");
                let cond5 = false;
                let cond6 = false;
                let cond7 = false;
                let cond8 = false;
                let cond9 = false;
                let cond10 = false;
                let cond11 = false;
                let cond12 = false;
                for(let f of valFunctii){
                    //console.log(valRadio1)
                    if((f.innerHTML.includes(valFunc1) && valRadio1 == 'are') || valFunc1==null){
                        cond5 = true;
                    }
                    if((!f.innerHTML.includes(valFunc1) && valRadio1 == 'nu are')||valFunc1==null){
                        cond6 = true;
                    }

                    if((f.innerHTML.includes(valFunc2) && valRadio2 == 'are') || valFunc2==null){
                        cond7 = true;
                    }
                    if((!f.innerHTML.includes(valFunc2) && valRadio2 == 'nu are')||valFunc2==null){
                        cond8 = true;
                    }

                    if((f.innerHTML.includes(valFunc3) && valRadio3 == 'are') || valFunc3==null){
                        cond9 = true;
                    }
                    if((!f.innerHTML.includes(valFunc3) && valRadio3 == 'nu are')||valFunc3==null){
                        cond10 = true;
                    }

                    if((f.innerHTML.includes(valFunc4) && valRadio4 == 'are') || valFunc4==null){
                        cond11 = true;
                    }
                    if((!f.innerHTML.includes(valFunc4) && valRadio4 == 'nu are')||valFunc4==null){
                        cond12 = true;
                    }
                    console.log(cond5);
                }

                let valBrand = produs.getElementsByClassName("val-brand")[0].innerHTML.trim().toLowerCase();
                let cond13 = (inpBrand == valBrand || inpBrand == "");
                console.log(inpBrand);

                let valDesc = produs.getElementsByClassName("val-descriere")[0].innerHTML.trim().toLowerCase();
                let cond14 = true;
                cond14 =  (valDesc.includes(inpDesc) || inpDesc == "");
                console.log(valDesc);
                console.log(inpDesc);

                let valMecanism = produs.getElementsByClassName("val-mecanism")[0].innerHTML.trim().toLowerCase();
                let cond15;
                for(let m of values){
                    if(m.trim().toLowerCase() == valMecanism || m.trim().toLowerCase() == "toate"){
                        cond15 = true;
                    }
                    console.log(values.length);
                }
                //console.log(verificaValoriFiltrare());
                if(cond1 && cond2 && cond3 && cond4 && (cond6 || cond5) && (cond7 || cond8) && (cond9 || cond10) && (cond11 || cond12) && cond13 && cond14 && cond15){
                    produs.style.display="block";
                }
                else{
                    produs.style.display="none";
                }
            }
            }
        }

        document.getElementById("resetare").onclick= function(){

            var confirmReset = confirm("Ești sigur că vrei să resetezi filtrele?");
            
            if(confirmReset){
                document.getElementById("inp-nume").value="";
                
                document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
                document.getElementById("inp-categorie").value="toate";
                document.getElementById("i_rad4").checked=true;
                document.getElementById("locatie").checked=false;
                document.getElementById("i_rad5").checked=true;
                document.getElementById("data").checked=false;
                document.getElementById("i_rad7").checked=true;
                document.getElementById("alarma").checked=false;
                document.getElementById("i_rad9").checked=true;
                document.getElementById("cronometru").checked=false;
                document.getElementById("i_rad11").checked=true;
                document.getElementById("brand").value="";
                document.getElementById("descriere_ceas").value="";
                document.getElementById("inp_mecanism").value="toate";
                document.getElementById("lable1").classList.remove("active");
                document.getElementById("lable2").classList.remove("active");
                document.getElementById("lable3").classList.remove("active");
                document.getElementById("lable4").classList.add("active");
                var produse=document.getElementsByClassName("produs");
                document.getElementById("infoRange").innerHTML="(0)";
                for (let prod of produse){
                    prod.style.display="block";
                }
            }
        }

        function sorteaza(semn){
            var produse=document.getElementsByClassName("produs");
            var v_produse=Array.from(produse);
            v_produse.sort(function(a,b){
                let pret_a = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
                let pret_b = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);

                let diam_a = parseFloat(a.getElementsByClassName("val-diametru")[0].innerHTML);
                let diam_b = parseFloat(b.getElementsByClassName("val-diametru")[0].innerHTML);

                let c1_a = diam_a/pret_a;
                let c1_b = diam_b/pret_b;
                if(c1_a == c1_b){
                    let c2_a = a.getElementsByClassName("val-mecanism")[0].innerHTML;
                    let c2_b = b.getElementsByClassName("val-mecanism")[0].innerHTML;
                    return semn*c2_a.localeCompare(c2_b);
                }
                return semn*(c1_a - c1_b);
            })
            for(let prod of v_produse){
                prod.parentNode.appendChild(prod);
            }
        }

        document.getElementById("sortCrescNume").onclick= function(){
            sorteaza(1);
        }
        document.getElementById("sortDescrescNume").onclick= function(){
            sorteaza(-1);
        }

        window.onkeydown=function(e){
            if(e.key == "c" && e.altKey){
                var suma = 0;
                var produse = document.getElementsByClassName("produs");
                for(let produs of produse){
                    var stil=getComputedStyle(produs)
                    if(stil.display !="none"){
                        suma +=parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
                    }
                }
                if(!document.getElementById("par_suma")){
                    let p = document.createElement("p");
                    p.innerHTML=suma;
                    p.id = "par_suma";
                    let container = document.getElementById("produse");
                    container.insertBefore(p,container.children[0]);
                    setTimeout(function(){
                        let par = document.getElementById("par_suma");
                        if(par){
                            par.remove();
                        }
                    }, 2000);
                }
            }
        }

        function levenshteinDistance(a, b) {
            const an = a.length;
            const bn = b.length;
            if (an === 0) return bn;
            if (bn === 0) return an;
            const matrix = Array(an + 1);
            for (let i = 0; i <= an; i++) {
                matrix[i] = Array(bn + 1).fill(0);
                matrix[i][0] = i;
            }
            for (let j = 0; j <= bn; j++) {
                matrix[0][j] = j;
            }
            for (let i = 1; i <= an; i++) {
                for (let j = 1; j <= bn; j++) {
                    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j] + 1, // deletion
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j - 1] + cost // substitution
                    );
                }
            }
            return matrix[an][bn];
        }

        function validateTextarea() {
            const textarea = document.getElementById("descriere_ceas");
            const descriere = textarea.value.trim();
            if (descriere.length > 20) {
                textarea.classList.add("is-invalid");
                return false;
            } else {
                textarea.classList.remove("is-invalid");
                return true;
            }
        }
        document.getElementById("descriere_ceas").addEventListener("input", validateTextarea);

    }
)

