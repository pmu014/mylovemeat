document.addEventListener('DOMContentLoaded', () => {
  const signupBtn = document.getElementById('signupBtn');

  signupBtn.addEventListener('click', () => {
    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;
    const checkPassword = document.getElementById('checkPassword').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (password !== checkPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    axios({
      method: 'post',
      url: '/api/users',
      data: {
        account,
        password,
        name,
        address,
        phone
      },
    })
      .then((response) => {
        const data = response.data;
        alert(data.message);
        window.location.href = '/user_login'
      })
      .catch((response) => {
        const data = response.response.data
        console.log(data);
        alert(data.errorMessage);
      });
  });
});
