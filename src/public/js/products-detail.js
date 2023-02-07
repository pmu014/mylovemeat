const url = window.location.search;
console.log(url);
const url_split = url.split('=')
    const productId = url_split[1]
    console.log(productId);
$(document).ready(function(){
    show_products();
});
function show_products(){
    $.ajax({
        type: 'GET',
        url: `/api/products/${productId}`,
        data: {},
        success: function (response) {
            console.log(response);
            let rows = response['products']
            console.log(rows)
            let temp_html = ''
            let price = rows['price']
            let img = rows['img']
            let quantity = rows['quantity']
            let description = rows['description']
            temp_html += `<div class="products-img" type="submit">
                            <img src="/images/${img}" width="400" height= "400" alt="">
                            </div>
                                    <div class="products-detail">
                                        <input class="form-control products-detail-form" type="text" value="${price}" aria-label="Disabled input example" disabled readonly>
                                        <input class="form-control products-detail-form" type="text" value="${quantity}" aria-label="Disabled input example" disabled readonly>
                                        <input class="form-control products-detail-form" type="text" value="${description}" aria-label="Disabled input example" disabled readonly>
                                    </div>
                                    <input class="form-control products-detail-form-description " type="text" value="${description}" aria-label="Disabled input example" disabled readonly>                 
            `         
            
            
            $('#products-detail').append(temp_html)
        }
    });
}

function customAlert(text, confirmCallback) {
    $("#alertText").text(text);
    $("#alertModal").modal("show");
    if (confirmCallback) {
        $("#alertModal .btn-confirm").click(confirmCallback);
    }
    }

