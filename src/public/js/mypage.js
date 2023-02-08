$(document).ready(function () {
  getmypage();
});

function getmypage() {
  $.ajax({
    type: 'GET',
    url: '/api/users',
    data: {},
    success: function (response) {
      const user = response.user;
      $('#accountInput').attr('value', user.account);
      $('#nameInput').attr('value', user.name);
      $('#phoneInput').attr('value', user.phone);
      $('#addressInput').attr('value', user.address);
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
