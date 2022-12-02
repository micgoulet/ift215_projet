function chargerpanier() {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier",
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        error: function (result) {
            $('#cart_details').append('<h1><a href="#/connexion">Veuillez vous connecter pour accéder au panier</a></h1>');
        },
        success: function (result) {
            console.log(result)
            $('#cart_details').html("");
            $("#total").text(result.valeur);
            $.each(result.items, function (key, value) {

                item = $('<div></div>')
                    .addClass('card card-body mt-4')
                    .append('    <div class="row">\n' +
                        '        <div class="col-lg-2 mb-4">\n' +
                        '            <img src="images/'+ value.nomProduit +'.jpg" width="150" height="150" alt="'+ value.nomProduit +'">\n' +
                        '        </div>\n' +
                        '        <div class="col-lg-7">\n' +
                        '            <h1>'+ value.nomProduit + '</h1>\n' +
                        '            <p> Prix : \n' +
                        '                '+ value.prix +'\n' +
                        '            </p>\n' +
                        '            <div class="mt-2">\n' +
                        '                <form>\n' +
                        '                    <label for="panier-qte'+ value.id +'" id="paniel-label-qte">Quantité :</label>\n' +
                        '                    <input id="panier-qte'+ value.id +'" value="'+ value.quantite +'"/>\n' +
                        '                </form>\n' +
                        '            </div>\n' +
                        '            <div class="mt-2">\n' +
                        '                <button class="btn btn-primary btn-sm" type="button" onclick="modifierQte(' + value.id + ', '+ value.quantite + ')">Modifier</button>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '        <div class="col-md-6 col-xl-3">\n' +
                        '            <div>\n' +
                        '                <h4>Prix : '+ value.prix * value.quantite +'</h4>\n' +
                        '            </div>\n' +

                        '            <div class="d-flex flex-column mt-4">\n' +
                        '                <button class="btn btn-primary btn-sm" type="button" onclick="retirerProduit(' + value.id + ')">Retirer</button>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '    </div>')
                $('#cart_details').append(item);
            });
        }
    });
}

function chargerconfirmation() {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier",
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {

            $('#bouton-retour').html('<button class="btn btn-primary btn-sm" onClick="location.href=\'#/panier\'">Retour</button>')
            $('#bouton-suivant').html('<h5>Total: <span id="total"></span></h5><br>\n' +
                '            <button class="btn btn-primary btn-sm button-panier" onclick="getInfosClient()">Suivant</button>')
            $('#titre-confirmation').html('Récapitulatif');
            $('#confirmation').html("");
            $("#total").text(result.valeur);

            $.each(result.items, function (key, value) {

                item = $('<div></div>')
                    .addClass('card card-body mt-4')
                    .append('    <div class="row">\n' +
                        '        <div class="col-lg-2 mb-4">\n' +
                        '            <img src="images/'+ value.nomProduit +'.jpg" width="150" height="150" alt="'+ value.nomProduit +'">\n' +
                        '        </div>\n' +
                        '        <div class="col-lg-7">\n' +
                        '            <h1>'+ value.nomProduit + '</h1>\n' +
                        '            <p> Prix : \n' +
                        '                '+ value.prix +'\n' +
                        '            </p>\n' +
                            '            <div class="mt-2">\n' +
                            '                <form>\n' +
                            '                    Quantité :\n' +
                            '                    '+ value.quantite +'\n' +
                            '                </form>\n' +
                            '           </div>\n' +
                        '           </div>\n' +
                        '        <div class="col-md-6 col-xl-3">\n' +
                        '            <div>\n' +
                        '                <h4>Prix : '+ value.prix * value.quantite +'</h4>\n' +
                        '            </div>\n' +

                        '            <div class="d-flex flex-column mt-4">\n' +
                        '                <button class="btn btn-primary btn-sm" type="button" onclick="retirerProduit(' + value.id + ')">Retirer</button>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '    </div>')

                $('#confirmation').append(item);
            });
        }
    });
}

function chargerconfirm() {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier",
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {

            $('#confirmation').append('<br><h2>Produits</h2>');
            $("#total").text(result.valeur);
            $.each(result.items, function (key, value) {

                item = $('<div></div>')
                    .addClass('card card-body mt-4')
                    .append('    <div class="row">\n' +
                        '        <div class="col-lg-2 mb-4">\n' +
                        '            <img src="images/'+ value.nomProduit +'.jpg" width="150" height="150" alt="'+ value.nomProduit +'">\n' +
                        '        </div>\n' +
                        '        <div class="col-lg-7">\n' +
                        '            <h1>'+ value.nomProduit + '</h1>\n' +
                        '            <p> Prix : \n' +
                        '                '+ value.prix +'\n' +
                        '            </p>\n' +
                        '            <div class="mt-2">\n' +
                        '                <form>\n' +
                        '                    Quantité :\n' +
                        '                    '+ value.quantite +'\n' +
                        '                </form>\n' +
                        '           </div>\n' +
                        '           </div>\n' +
                        '        <div class="col-md-6 col-xl-3">\n' +
                        '            <div>\n' +
                        '                <h4>Prix : '+ value.prix * value.quantite +'</h4>\n' +
                        '            </div>\n' +

                        '            <div class="d-flex flex-column mt-4">\n' +
                        '                <button class="btn btn-primary btn-sm" type="button" onclick="retirerProduit(' + value.id + ')">Retirer</button>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '    </div>')

                $('#confirmation').append(item);
            });
        }
    });
}

function getInfosClient() {
    $.ajax({
        url: "/clients/" + ID_CLIENT,
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            $('#confirmation').html("")

            $('#bouton-retour').html('<button class="btn btn-primary btn-sm" onClick="chargerconfirmation()">Retour</button>')

            $('#bouton-suivant').html('<h5>Total: <span id="total"></span></h5><br>\n' +
                '            <button class="btn btn-primary btn-sm button-panier" onclick="confirmerCommande()">Confirmer</button>')

            $('#titre-confirmation').html('Confirmation');

            $('#confirmation').append('<h2>Informations</h2>')
                .append('<div class="card card-body mt-4">' +
                    '         <div class="group">\n' +
                    '                <label for="inscription-prenom">Prénom</label>\n' +
                    '                <input type="text" name="inscription-prenom" id="inscription-prenom" value="'+ result.prenom +'" required/>\n' +
                    '            </div>\n' +
                    '            <div class="group">\n' +
                    '                <label for="inscription-nom">Nom</label>\n' +
                    '                <input type="text" name="inscription-nom" id="inscription-nom" value="'+ result.nom +'" required/>\n' +
                    '            </div>\n' +
                    '            <div class="group">\n' +
                    '                <label for="inscription-adresse">Adresse</label>\n' +
                    '                <input type="text" name="inscription-adresse" id="inscription-adresse" value="'+ result.adresse +'" required/>\n' +
                    '            </div>\n' +
                    '            <div class="group">\n' +
                    '                <label for="inscription-pays">Pays</label>\n' +
                    '                <input type="text" name="inscription-pays" id="inscription-pays" value="'+ result.pays +'" required/>\n' +
                    '            </div>\n' +
                    '</div>');

            chargerconfirm();
        }
    })
}

function confirmerCommande() {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/ventes",
        data: JSON.stringify({ idClient: ID_CLIENT }),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
            xhr.setRequestHeader('Content-Type', 'application/json')
        },
        error: function(result) {
            showConfirmationEchouee();
        },
        success: function(result) {

            $('#bouton-retour').html('<button class="btn btn-primary btn-sm" onClick="location.href=\'#/produit\'">Retour aux produits</button>')
            $('#titre-confirmation').html('Commandes envoyées');
            $('#confirmation').html("");
            $('#bouton-suivant').html("")
            },
    });
};

function showConfirmationEchouee() {
    var x = document.getElementById("confirmation-echouee");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
