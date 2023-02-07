$(document).ready(function(){
    show_products();
});
function show_products(){
    $.ajax({
        type: 'GET',
        url: '/api/products',
        data: {},
        success: function (response) {
            console.log(response);
            let rows = response['products']
            console.log(rows)
            let temp_html = ''
            for (let i =0; i < rows.length; i++){
            let price = rows[i]['price']
            let img = rows[i]['img']
            let id = rows[i]['id']
            
            temp_html += `<div class="products-img" type="submit">
            <button><a href="/products/products-detail?id=${id}"><img src="/images/${img}" width="300" height= "400"alt=""></a></button>
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


