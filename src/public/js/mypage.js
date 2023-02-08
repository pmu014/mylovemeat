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
