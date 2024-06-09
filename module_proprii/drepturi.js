
/**
 @typedef Drepturi
 @type {Object}
 @property {Symbol} vizualizareUtilizatori Dreptul de a intra pe  pagina cu tabelul de utilizatori.
 @property {Symbol} stergereUtilizatori Dreptul de a sterge un utilizator
 @property {Symbol} modificareUtilizatori Dreptul de a modifica datele unui utilizator
 @property {Symbol} cumparareProduse Dreptul de a cumpara
 @property {Symbol} modifiacreProduse Dreptul de a modifica produse
 @property {Symbol} stergereProduse Dreptul de a sterge produse
 @property {Symbol} adaugareProduse Dreptul de a adauga produse

 @property {Symbol} vizualizareGrafice Dreptul de a vizualiza graficele de vanzari
 */


/**
 * @name module.exports.Drepturi
 * @type Drepturi
 */
const Drepturi = {
	vizualizareUtilizatori: Symbol("vizualizareUtilizatori"),
	stergereUtilizatori: Symbol("stergereUtilizatori"),
	modificareUtilizatori: Symbol("modificareUtilizatori"),
	cumparareProduse: Symbol("cumparareProduse"),
	modifiacreProduse: Symbol("modifiacreProduse"),
	stergereProduse: Symbol("stergereProduse"),
	adaugareProduse: Symbol("adaugareProduse"),
	vizualizareGrafice: Symbol("vizualizareGrafice")
}

module.exports=Drepturi;