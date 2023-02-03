document.addEventListener('DOMContentLoaded', () => {
  const addProductBtn = document.getElementById('addProductBtn');

  addProductBtn.addEventListener('click', () => {
    const inputName = document.getElementById('inputName').value;
    const inputPrice = document.getElementById('inputPrice').value;
    const inputImage = document.getElementsByName('inputImage')[0];
    const inputDesc = document.getElementById('inputDesc').value;
    const inputQuantity = document.getElementById('inputQuantity').value;

    const formData = new FormData();

    formData.append('inputName', inputName);
    formData.append('inputPrice', inputPrice);
    formData.append('inputImage', inputImage.files[0]);
    formData.append('inputDesc', inputDesc);
    formData.append('inputQuantity', inputQuantity);

    axios({
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8',
      },
      method: 'post',
      url: 'api/admins/products',
      data: formData,
    })
      .then((response) => {
        const data = response.data;
        alert(data.message);
      })
      .catch((response) => {
        console.log(response);
      });
  });
});
