
// HTML de la liste de commande
function commande_item_to_html(commande) {
    commande_card = $('<div></div>')
        .addClass('card card-body mt-4')
        .append(' <div onclick="getDetailcommande" class="row">\n' +
        '        <div class="col-lg-2 mb-4">\n' +
        '            <span onclick="getDetailcommande('+ commande.id +')"><h1><a href="#">'+ commande.id + '</a></h1></span>\n' +  
        '        <div class="col-lg-3">\n' +
        '        </div>\n' +
        '        <div class="col-lg-3">\n' +
        '        </div>\n' +
        '            <h1>' + commande.prenom + '</h1>\n' +
        '        </div>\n' +
        '        <div class="col-lg-3">\n' +
        '            <h1>' + commande.produits + '</h1>\n' +
        '        </div>\n' +
        '        <div class="col-md-3 col-md-3">\n' +
        '            <div>\n' +
        '                <h4>status : '+ commande.status +'</h4>\n' +
        '            </div>\n' +
        '            <div>\n' +
        '                 date : ' + commande.date + '\n' +
        '            </div>\n' +
        '    </div>')
        console.log("commande.idClient");
        console.log(commande.idClient);

    return commande_card;
}

// Affiche le bouton de retour vers la page produit
function getButtonRetour() {
    return '<button onclick="chargercommandes()">Retour</button>'
}

function getDetailcommande(id) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/ventes/' + id,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function(data) {
           // $('#bouton-commandes').html(getButtonRetour())
            commandes = Commande_to_html(data)
            $('#list_commande').html("")
            $('#list_commande').html(commandes)
            //$('#details_commande').html(commandes)
        }
    });
}


function chargercommandes() {
    $.ajax({
        url: "/ventes",  
        //url: "/clients", 
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            // console.log(result);
            $('#list_commande').html("");
            $.each(result, function (key, value) {
                commande = commande_item_to_html(value);
                $('#list_commande').append(commande);
            });
        }
    });
}

// Affiche une commande
function Commande_to_html(commande) {
    
    commandes_card = $('<div></div>')
        .addClass('card card-body mt-4')
        .append(        
             '    <div class="row">\n' +        
            '        <div class="col-md-3 col-md-3">\n' +
            '        <div class="col-lg-3">\n' +
            '            <h1>' + commande.idClient + '</h1>\n' +
            '        </div>\n' +
            '        <div class="col-lg-3">\n' +
            '            <h1>' + commande.montant + '</h1>\n' +
            '        </div>\n' +
            '        <div class="col-lg-3">\n' +
            '            <h1>' + commande.produits + '</h1>\n' +
            '        </div>\n' +
            '        <div class="col-lg-6 mb-4">\n' +
            '            <img src="images/'+ commande.montant +'.jpg" width="400" height="400" alt="'+ commande.montant +'">\n' +
            '        </div>\n' +
            '        </div>\n' +
            '        <div class="col-lg-3">\n' +
            '            <h1>' + commande.produits + '</h1>\n' +
            '        </div>\n' +
            '        <div class="col-md-3 col-md-3">\n' +
            '            <div>\n' +
            '                <h4>status : '+ commande.status +'</h4>\n' +
            '            </div>\n' +
            '            <div>\n' +
            '                 date : ' + commande.date + '\n' +
            '            </div>\n' +
            '            <div class="d-flex flex-column mt-4">\n' +
            '                <button class="btn btn-primary btn-sm" type="button" onclick="add_item(' + item.id + ')">Ajouter</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '               <p>' + LOREM + '</p>\n' +
            '    </div>'
          )

            console.log("commande.idClient");
    return commandes_card;
}





/*

const Vente = require("../../data/Vente");


// HTML de la liste de commande
function commande_item_to_html(commande) {
    commande_card = $('<div></div>')
        .addClass('card card-body mt-4')
        .append(' <div class="row">\n' +
        '        <div class="col-lg-3">\n' +
        '            <h1>' + commande.idClient + '</h1>\n' +
        '        </div>\n' +
        '        <div class="col-lg-3">\n' +
        '            <h1>' + commande.montant + '</h1>\n' +
        '        </div>\n' +
        '        <div class="col-lg-3">\n' +
        '            <h1>' + commande.produits + '</h1>\n' +
        '        </div>\n' +
        '        <div class="col-md-3 col-md-3">\n' +
        '            <div>\n' +
        '                <h4>status : '+ commande.status +'</h4>\n' +
        '            </div>\n' +
        '            <div>\n' +
        '                 date : ' + commande.date + '\n' +
        '            </div>\n' +
        '            <div class="d-flex flex-column mt-4">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>')


    return commande_card;
}






function chargercommande() {
    $.ajax({
        url: "/ventes",
        success: function (result) {
            // console.log(result);
            $('#list_commande').html("");
            $.each(result, function (key, value) {
                commande = commande_item_to_html(value);
                $('#list_commande').append(commande);
            });
        }
    });
}



// Récupère les détails de la commande
function getDetail(id) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/ventes/' + id,
        dataType: 'json',
        success: function(data) {
            Vente = commande_to_html(data)
            $('#list_commande').html(Vente)
        }
    });
}

// Affiche une commande
function Commande_to_html(commande) {
    commande_card = $('<div></div>')
        .addClass('card card-body mt-4')
        .append('    <div class="row">\n' +        
            '        <div class="col-md-3 col-md-3">\n' +
            '        <div class="col-lg-3">\n' +
            '            <h1>' + commande.idClient + '</h1>\n' +
            '        </div>\n' +
            '        <div class="col-lg-3">\n' +
            '            <h1>' + commande.montant + '</h1>\n' +
            '        </div>\n' +
            '        <div class="col-lg-3">\n' +
            '            <h1>' + commande.produits + '</h1>\n' +
            '        </div>\n' +
            '        <div class="col-lg-6 mb-4">\n' +
            '            <img src="images/'+ commande.montant +'.jpg" width="400" height="400" alt="'+ commande.montant +'">\n' +
            '        </div>\n' +
            '        </div>\n' +
            '        <div class="col-lg-3">\n' +
            '            <h1>' + commande.produits + '</h1>\n' +
            '        </div>\n' +
            '        <div class="col-md-3 col-md-3">\n' +
            '            <div>\n' +
            '                <h4>status : '+ commande.status +'</h4>\n' +
            '            </div>\n' +
            '            <div>\n' +
            '                 date : ' + commande.date + '\n' +
            '            </div>\n' +
            '            <div class="d-flex flex-column mt-4">\n' +
            '                <button class="btn btn-primary btn-sm" type="button" onclick="add_item(' + item.id + ')">Ajouter</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '               <p>' + LOREM + '</p>\n' +
            '    </div>')


    return commande_card;
}


*/