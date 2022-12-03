
// HTML de la liste de commande
function commande_item_to_html(commande) {
    commande_card = $('<div></div>')
        .addClass('card card-body mt-4')
        .append(' <div onclick="getDetailcommande" class="row">\n' +
        '        <div class="col-lg-6 mb-4">\n' +
        '            <span onclick="getDetailcommande('+ commande.id +')"><h1><a href="#">'+ commande.id + '</a></h1></span>\n' +  

        '            <span id="commande-nom'+ commande.idClient +'-' +commande.id+ '"></span>\n' +
        '        </div>\n' +
        
        '        <div class="col-md-3 col-md-3">\n' +
        '            <div>\n' +
        '                <h4>Status : '+ commande.status +'</h4>\n' +
        '            </div>\n' +
        '            <div>\n' +
        '                 Date : ' + commande.date + '\n' +
        '            </div>\n' +
        '    </div>')

    return commande_card;
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
            commandes = Commande_to_html(data)
            $('#list_commande').html("")
            $('#list_commande').html(commandes)
            getInfosClientCommande(data.idClient, data.id)
        }
    });
}

function getInfosClientCommande(idClient, id) {
    $.ajax({
        url: "/clients/" + parseInt(idClient),
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            $('#commande-nom' + idClient + '-'+id).html("");
            $('#commande-nom' + idClient + '-'+id).append('<span>Client : ' +result.prenom+ ' ' +result.nom+'</span><br>' +
            '<span>Courriel : ' +result.courriel+ '</span><br>' +
            '<span>Adresse : ' +result.adresse+ '</span><br>');
        }
    })
}


function chargercommandes() {
    $.ajax({
        url: "/ventes", 
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            $('#list_commande').html("");
            $.each(result, function (key, value) {
                commande = commande_item_to_html(value);
                $('#list_commande').append(commande);
                getInfosClientCommande(value.idClient, value.id);
            });
        }
    });
}

// Affiche une commande
function Commande_to_html(commande) {
    
    commandes_card = $('<div class="card card-body mt-4">'+
      
             '    <div class="row">\n' +    
            '        <div class="col-md-6 col-md-6">\n' +
            '        <div class="col-lg-5">\n' +
            '            <span id="commande-nom'+ commande.idClient +'-' +commande.id+ '"></span>\n' +
            '        </div>\n' +
            '    </div>'+
            '</div>'
          )
    
    haut_commande = $('<span><h1>Informations client</h1><span>').append(commandes_card).append('<br><span><h1>Produits</h1><span>');

    $.each(commande.produits, function (key, value) {
        item_card = $('<div></div>')
        .addClass('card card-body mt-4')
        .append('    <div class="row">\n' +
            '        <div class="col-lg-2 mb-4">\n' +
            '            <img src="images/'+ value.nomProduit +'.jpg" width="150" height="150" alt="'+ value.nomProduit +'">\n' +
            '        </div>\n' +
            '        <div class="col-lg-7">\n' +
            '            <span onclick="getDetail('+ value.idProduit +')"><h1><a href="#">'+ value.nomProduit + '</a></h1></span>\n' +
            '            <p>\n' +
            '                '+ value.descriptionProduit +'\n' +
            '            </p>\n' +
            '        </div>\n' +
            '        <div class="col-md-6 col-xl-3">\n' +
            '            <div>\n' +
            '                <h4>Prix : '+ value.prix +'</h4>\n' +
            '            </div>\n' +
            '            <div>\n' +
            '                Quantité : ' + value.quantite + '\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>')

        haut_commande.append(item_card);
    });

    return haut_commande;
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