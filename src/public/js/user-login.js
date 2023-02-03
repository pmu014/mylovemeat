document.addEventListener('DOMContentLoaded', () => {
  const signupBtn = document.getElementById('loginBtn');

  signupBtn.addEventListener('click', () => {
    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;

    axios({
      method: 'post',
      url: '/api/users/login',
      data: {
        account,
        password
      },
    })
      .then((response) => {
        const data = response.data;
        alert(data.message);
      })
      .catch((response) => {
        const data = response.response.data
        console.log(data);
        alert(data.errorMessage);
      });
  });
});