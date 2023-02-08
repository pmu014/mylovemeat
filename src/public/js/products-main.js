$(document).ready(function () {
  show_products();
});
function show_products() {
  $.ajax({
    type: 'GET',
    url: '/api/products',
    data: {},
    success: function (response) {
      console.log(response);
      let rows = response['products'];
      console.log(rows);
      let temp_html = '';
      for (let i = 0; i < rows.length; i++) {
        let name = rows[i]['name'];
        let price = rows[i]['price'];
        let img = rows[i]['img'];
        let id = rows[i]['id'];

        temp_html += `<div class="products-img" type="submit">
            <button><a href="/products/products-detail?id=${id}"><img src="/images/${img}" width="300" height= "400"alt=""></a></button>
            <div>
            <label class="form-label" >제품: ${name} <br>가격: ${price}</label>
            </div>
            </div>
            `;
      }

      $('#products-main').append(temp_html);
    },
  });
}

function logOut() {
  if (confirm('로그아웃 하시겠습니까?')) {
    alert('확인을 누르셨습니다.');
    $.ajax({
      type: 'POST',
      url: '/api/users/logout',
      data: {},
      success: function () {
        window.location.href = '/user_login';
      },
    });
  } else {
    alert('취소를 누르셨습니다.');
  }
}

function login() {
  window.location.href = '/user_login';
}

function signup() {
  window.location.href = '/user_signup';
}
function mypage() {
  window.location.href = '/mypage';
}
