document.addEventListener('DOMContentLoaded', () => {
  let inputName = document.getElementById('inputName');
  let inputPrice = document.getElementById('inputPrice');
  let inputDesc = document.getElementById('inputDesc');
  let inputQuantity = document.getElementById('inputQuantity');
  const editProductBtn = document.getElementById('editProductBtn');
  const productId = editProductBtn.value;

  axios({
    method: 'get',
    url: '/api/products/' + productId,
    data: {},
  })
    .then((response) => {
      const data = response.data;

      inputName.setAttribute('value', data.returnValue.name);
      inputPrice.setAttribute('value', data.returnValue.price);
      inputDesc.append(data.returnValue.description);
      inputQuantity.setAttribute('value', data.returnValue.quantity);

      editProductBtn.addEventListener('click', () => {
        inputName = document.getElementById('inputName').value;
        inputPrice = document.getElementById('inputPrice').value;
        inputDesc = document.getElementById('inputDesc').value;
        inputQuantity = document.getElementById('inputQuantity').value;
        const inputImage = document.getElementsByName('inputImage')[0];

        const formData = new FormData();

        formData.append('inputName', inputName);
        formData.append('inputPrice', inputPrice);

        if (inputImage.files[0]) {
          formData.append('inputImage', inputImage.files[0]);
        } else {
          formData.append('inputImage', data.returnValue.img);
        }

        formData.append('inputDesc', inputDesc);
        formData.append('inputQuantity', inputQuantity);
        formData.append('productId', productId);

        axios({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          method: 'put',
          url: 'api/admins/products',
          data: formData,
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
    })
    .catch((response) => {
      const { data } = response.response;
      alert(data.errorMessage);
      window.location.href = '/admin_index';
    });
});
