document.addEventListener('DOMContentLoaded', () => {
  const regisgerBtn = document.getElementById('registerBtn');

  regisgerBtn.addEventListener('click', () => {
    const inputAccount = document.getElementById('inputAccount').value;
    const inputPassword = document.getElementById('inputPassword').value;
    const checkInputPassword =
      document.getElementById('checkInputPassword').value;
    const inputName = document.getElementById('inputName').value;

    if (inputPassword !== checkInputPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    axios({
      method: 'post',
      url: '/api/admins',
      data: {
        inputAccount,
        inputPassword,
        inputName,
      },
    })
      .then((response) => {
        const data = response.data;
        alert(data.message);
        window.location.href = '/admin_index';
      })
      .catch((response) => {
        const { data } = response.response;
        alert(data.errorMessage);
      });
  });
});
