$(document).ready(function(){
    show_products();
});
function show_products(){
    $.ajax({
        type: 'GET',
        url: '/api/products_main',
        data: {},
        success: function (response) {
            console.log(response);
            let rows = response['products']
            console.log(rows)
            let temp_html = ''
            for (let i =0; i < rows.length; i++){
            let price = rows[i]['price']
            
            temp_html += `<div class="products-img" type="submit">
            <button><a href="/products_detail"><img src="/images/meat.jpg" width="300" height= "400"alt=""></a></button>
            <div>
            <label class="form-label" >이름${price}</label>
            </div>
            </div>
            `         
            } 
            
            $('#products-main').append(temp_html)
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
