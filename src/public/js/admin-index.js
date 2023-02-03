document.addEventListener('DOMContentLoaded', () => {
  const productsBox = document.getElementById('productsBox');

  axios({
    method: 'get',
    url: '/api/products',
    data: {},
  })
    .then(async (response) => {
      const data = response.data;

      const createHTML = new Promise((resolve, reject) => {
        for (const item of data.returnValue) {
          let tempHtml = ``;
          tempHtml = `<div class="items">
                        <div class="itemImage"><img src="/images/${item.img}"></div>
                        <div class="itemName">${item.name}</div>
                        <div class="itemPrice">${item.price}</div>
                        <div class="itemQuantity">${item.quantity}</div>
                        <div class="itemDesc">${item.description}</div>
                        <div class="itemEdit">
                          <button class="editBtn" value="${item.id}">수정</button>
                          <button class="deleteBtn" value="${item.id}">삭제</button>
                        </div>
                      </div>`;

          productsBox.insertAdjacentHTML('beforeend', tempHtml);
        }
        resolve();
      });

      createHTML.then(() => {
        const editBtns = document.getElementsByClassName('editBtn');
        const deleteBtns = document.getElementsByClassName('deleteBtn');

        for (const editBtn of editBtns) {
          const productId = editBtn.value;
          editBtn.addEventListener('click', () => {
            window.location.href = '/admin_edit_product?productId=' + productId;
          });
        }
      });
    })
    .catch((response) => {
      const data = response.data;

      console.log(data);
    });
});
