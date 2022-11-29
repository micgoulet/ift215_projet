ID_CLIENT = 1
TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"
LOREM = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consectetur corporis eos ipsum iure nostrum quis reprehenderit veritatis voluptas voluptate. Blanditiis ea enim itaque labore soluta, tempore temporibus tenetur voluptatibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores fugit laboriosam modi necessitatibus praesentium quia rem sed suscipit unde. Aut beatae error eum laboriosam minima quas quia similique veritatis.\n" +
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aliquid, distinctio, explicabo illum labore laudantium maxime modi molestias obcaecati quis rem suscipit voluptate. Dolorum mollitia perspiciatis quae temporibus voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aliquid, distinctio, explicabo illum labore laudantium maxime modi molestias obcaecati quis rem suscipit voluptate. Dolorum mollitia perspiciatis quae temporibus voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aliquid, distinctio, explicabo illum labore laudantium maxime modi molestias obcaecati quis rem suscipit voluptate. Dolorum mollitia perspiciatis quae temporibus voluptatem."


function add_item(id_item) {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier",
        method: "POST",
        data: {"idProduit": id_item, "quantite": $('#input-qte').val()},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        error: function (result) {
            showQteManquante();
        },
        success: function (result) {
            $('#item_counter').text(result.items.length)
            showAjoutPanier();
        }
    });
}

// HTML de la liste de produit
function item_to_html(item) {
    item_card = $('<div></div>')
        .addClass('card card-body mt-4')
        .append('    <div class="row">\n' +
            '        <div class="col-lg-2 mb-4">\n' +
            '            <img src="images/'+ item.nom +'.jpg" width="150" height="150" alt="'+ item.nom +'">\n' +
            '        </div>\n' +
            '        <div class="col-lg-7">\n' +
            '            <span onclick="getDetail('+ item.id +')"><h1><a href="#">'+ item.nom + '</a></h1></span>\n' +
            '            <p>\n' +
            '                '+ item.description +'\n' +
            '            </p>\n' +
            '        </div>\n' +
            '        <div class="col-md-6 col-xl-3">\n' +
            '            <div>\n' +
            '                <h4>Prix : '+ item.prix +'</h4>\n' +
            '            </div>\n' +
            '            <div>\n' +
            '                Quantité disponible : ' + item.qte_inventaire + '\n' +
            '            </div>\n' +
            '            <div class="mt-2">\n' +
            '                <form>\n' +
            '                    <label for="quantite" id="label-qte">Quantité :</label>\n' +
            '                    <input id="input-qte"/>\n' +
            '                </form>\n' +
            '            </div>\n' +
            '            <div class="d-flex flex-column mt-4">\n' +
            '                <button class="btn btn-primary btn-sm" type="button" onclick="add_item(' + item.id + ')">Ajouter</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>')


    return item_card;
}

// Affiche la barre de recherche et le panier
function getSearchBar() {
        search_bar = $('<div></div>')
            .addClass('input-group mb-3')
            .append('<input type="search" class="form-control" placeholder="search" id="recherche">\n' +
                '       <span class="input-group-text"><i class="bi-search"></i></span>\n')
    return search_bar;
}

// Affiche le bouton de retour vers la page produit
function getButtonRetour() {
    return '<button onclick="chargerproduit()">Retour</button>'
}


function chargerproduit() {
    $.ajax({
        url: "/produits",
        success: function (result) {
            // console.log(result);
            $('#bouton-produit').html(getSearchBar());
            $('#list_items').html("");
            $.each(result, function (key, value) {
                item = item_to_html(value);
                $('#list_items').append(item);
            });
        }
    });
}

function chargerpanier() {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier",
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            console.log(result)
            $("#total").text(result.valeur);
            $.each(result.items, function (key, value) {

                item = $("<tr>" +
                    "<td>" + value.nomProduit + "</td> " +
                    "<td>" + value.prix + "</td> " +
                    "<td>" + value.quantite + "</td> " +
                    "<td>" + value.prix * value.quantite + "</td> " +
                    "</tr>");

                $('#cart_details').append(item);
            });
        }
    });
}

// Pour rendre la barre de recherche fonctionnelle
$(document).keydown(function(e){
    $("#recherche").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#list_items > *").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

// Récupère les détails d'un produit
function getDetail(id) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/produits/' + id,
        dataType: 'json',
        success: function(data) {
            $('#bouton-produit').html(getButtonRetour())
            produit = produit_to_html(data)
            $('#list_items').html(produit)
        }
    });
}

// Affiche un produit
function produit_to_html(item) {
    item_card = $('<div></div>')
        .addClass('card card-body mt-4')
        .append('    <div class="row">\n' +
            '        <div class="col-lg-6 mb-4">\n' +
            '            <img src="images/'+ item.nom +'.jpg" width="400" height="400" alt="'+ item.nom +'">\n' +
            '        </div>\n' +
            '        <div class="col-lg-3">\n' +
            '            <h1>' + item.nom + '</h1>\n' +
            '        </div>\n' +
            '        <div class="col-md-3 col-md-3">\n' +
            '            <div>\n' +
            '                <h4>Prix : '+ item.prix +'</h4>\n' +
            '            </div>\n' +
            '            <div>\n' +
            '                Quantité disponible : ' + item.qte_inventaire + '\n' +
            '            </div>\n' +
            '            <div class="mt-2">\n' +
            '                <form>\n' +
            '                    <label for="quantite" id="label-qte">Quantité :</label>\n' +
            '                    <input id="input-qte"/>\n' +
            '                </form>\n' +
            '            </div>\n' +
            '            <div class="d-flex flex-column mt-4">\n' +
            '                <button class="btn btn-primary btn-sm" type="button" onclick="add_item(' + item.id + ')">Ajouter</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '               <p>' + LOREM + '</p>\n' +
            '    </div>')


    return item_card;
}

function showAjoutPanier() {
    var x = document.getElementById("ajout-panier");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function showQteManquante() {
    var x = document.getElementById("qte-manquante");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// $.ajax
// ({
//     type: "GET",
//     url: "clients",
//     dataType: 'json',
//     // async: false,
//     // data: '{}',
//     beforeSend: function (xhr){
//         xhr.setRequestHeader('Authorization', "Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzUyMzAxLCJleHAiOjE4MzY3NTk1MDF9.QYtVOl6o87doRiT2EsezLqtSpz27K-nEZ4KqcmZV5Ac");
//     },
//     success: function (result){
//         console.log(result)
//     }
// });

