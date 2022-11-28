ID_CLIENT = 1
TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"

function add_item(id_item) {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier",
        method: "POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            $('#item_counter').text(result.items.length)
        }
    });
}

function item_to_html(item) {
    item_card = $('<div></div>')
        .addClass('card card-body mt-4')
        .append('    <div class="row">\n' +
            '        <div class="col-lg-2 mb-4">\n' +
            '            <img src="images/'+ item.nom +'.jpg" width="150" height="150" alt="'+ item.nom +'">\n' +
            '        </div>\n' +
            '        <div class="col-lg-7">\n' +
            '            <h1><a href="#">'+ item.nom + '</a></h1>\n' +
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


function chargerproduit() {
    $.ajax({
        url: "/produits",
        success: function (result) {
            // console.log(result);
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


$(function () {

});

// Pour la barre de recherche
$(document).keydown(function(e){
    $("#recherche").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#list_items > *").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


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

