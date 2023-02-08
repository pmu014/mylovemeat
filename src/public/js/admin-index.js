document.addEventListener('DOMContentLoaded', () => {
  const productsBox = document.getElementById('productsBox');
  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', () => {
    axios({
      method: 'post',
      url: 'api/admins/logout',
      data: {},
    }).then(() => {
      alert('로그아웃 되었습니다');
      window.location.href = 'admin_login';
    });
  });

  axios({
    method: 'get',
    url: '/api/products',
    data: {},
  })
    .then(async (response) => {
      const data = response.data;

      const createHTML = new Promise((resolve, reject) => {
        for (const item of data.products) {
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

        for (const deleteBtn of deleteBtns) {
          const productId = deleteBtn.value;
          deleteBtn.addEventListener('click', () => {
            axios({
              method: 'delete',
              url: '/api/admins/products/' + productId,
              data: {},
            })
              .then(() => {
                alert('상품이 삭제 되었습니다');
                window.location.href = '/admin_index';
              })
              .catch((response) => {
                const { data } = response.response;
                alert(data.errorMessage);
                window.location.href = '/admin_index';
              });
          });
        }
      });
    })
    .catch((response) => {
      const { data } = response.response;
      alert(data.errorMessage);
      window.location.href = '/admin_index';
    });
});
