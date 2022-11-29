function menuGaucheClic(lien){
    let menu = document.getElementById('menu-gauche');
    let liens = menu.children;
    for (let i = 0 ; i<liens.length ; i++){
        liens[i].classList.remove("choisi")
    }
    lien.classList.add("choisi");
}

function attacherListenerMenuGauche(){
    let menu = document.getElementById("menu-gauche");
    let liens = menu.children;
    for (let i = 0 ; i<liens.length ; i++){
        liens[i].addEventListener('click', function(){
            menuGaucheClic(liens[i])
        });
    }
}

// Faire l'inscription
function soumettreInscription() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/clients",
        data: {
            "prenom": $('#inscription-prenom').val(),
            "nom": $('#inscription-nom').val(),
            "age": $('#inscription-age').val(),
            "adresse": $('#inscription-adresse').val(),
            "pays": $('#inscription-pays').val(),
            "courriel": $('#inscription-courriel').val(),
            "mdp": $('#inscription-mdp').val(),
        },
        error: function(data) {
            showInscriptionEchouee();
        },
        success: function(data) {
            showInscriptionReussie();
        },
    });
};

function showInscriptionReussie() {
    var x = document.getElementById("inscription-reussie");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function showInscriptionEchouee() {
    var x = document.getElementById("inscription-echouee");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
async function chargerinscription (){
    attacherListenerMenuGauche()
}