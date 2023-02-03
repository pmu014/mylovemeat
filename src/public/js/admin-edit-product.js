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
        let inputName = document.getElementById('inputName').value;
        let inputPrice = document.getElementById('inputPrice').value;
        let inputImage = document.getElementsByName('inputImage')[0];
        let inputDesc = document.getElementById('inputDesc').value;
        let inputQuantity = document.getElementById('inputQuantity').value;
        let formData = new FormData();

        formData.append('inputName', inputName);
        formData.append('inputPrice', inputPrice);
        formData.append('inputImage', inputImage.files[0]);
        formData.append('inputDesc', inputDesc);
        formData.append('inputQuantity', inputQuantity);
        formData.append('productId', productId);

        axios({
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8',
          },
          method: 'put',
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
    })
    .catch((response) => {
      console.log(response);
    });
});
