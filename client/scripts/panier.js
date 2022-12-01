function chargerconfirmation() {
    $.ajax({
        url: "/clients/" + ID_CLIENT + "/panier",
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN_CLIENT);
        },
        success: function (result) {
            console.log(result)
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