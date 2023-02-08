$(document).ready(function(){
    show_products();
});

const url = window.location.search;
const url_split = url.split('=')
const productId = url_split[1]

function show_products(){
    $.ajax({
        type: 'GET',
        url: `/api/products/${productId}`,
        data: {},
        success: function (response) {
            let rows = response['products']
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
                                        <input class="form-control products-detail-form" type="text" id="quantity" value="${quantity}" aria-label="Disabled input example" disabled readonly>
                                        <input class="form-control products-detail-form" type="text" value="${description}" aria-label="Disabled input example" disabled readonly>
                                    </div>
                                    <input class="form-control products-detail-form-description " type="text" value="${description}" aria-label="Disabled input example" disabled readonly>                 
            `         
            
            
            $('#products-detail').append(temp_html)
        }
    });
}

function cart(){
    
    const quantity = $('#quantity').val();
    $.ajax({
        type: 'POST',
        url: `/api/carts`,
        data: {productId : productId,quantity : quantity},
        success: function (response) {
            alert(response['message'])
            window.location.replace("/products");
        },
        error: function (error) {
            console.log(error)
            let errorMessages = error['responseJSON']
                alert(errorMessages['errorMessage'])
        
            
        },
    });
}
function order(){
    if (!localStorage.getItem("token")) {
        alert("로그인 후 이용가능한 페이지 입니다.");
        window.location.replace("/products");
    } 
}

function logOut() {
    if ( confirm("로그아웃 하시겠습니까?") ) { 
    alert("확인을 누르셨습니다.");
    localStorage.clear();
    window.location.href = "/user_login";
    } else { 
    alert("취소를 누르셨습니다.");
    }
};

function login(){
    window.location.href = "/user_login";
}

function signup(){
    window.location.href = "/user_signup";
}
function mypage(){
    window.location.href = "/mypage";
}