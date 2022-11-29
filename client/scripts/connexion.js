function seConnecter() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/connexion",
        data: { "courriel": $('#courriel-connexion').val(), "mdp": $('#mdp-connexion').val() },
        error: function(data) {
            showConnexionEchouee();
        },
        success: function(data) {
            showConnexionReussie();
        },
    });
};

function showConnexionReussie() {
    var x = document.getElementById("connexion-reussie");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function showConnexionEchouee() {
    var x = document.getElementById("connexion-echouee");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}