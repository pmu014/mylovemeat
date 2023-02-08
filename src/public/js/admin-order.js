document.addEventListener('DOMContentLoaded', () => {
  const orderBox = document.getElementById('orderBox');

  axios({
    method: 'get',
    url: '/api/admins/orders',
    data: {},
  })
    .then((response) => {
      const data = response.data;
      const createHTML = new Promise((resolve, reject) => {
        for (const item of data.returnValue) {
          let tempHtml = ``;
          tempHtml = `<div class="items">
                        <div class="itemImage"><img src="/images/${
                          item.Product.img
                        }"></div>
                        <div class="itemName">${item.Product.name}</div>
                        <div class="itemPrice">${
                          item.Product.price * item.quantity
                        }</div>
                        <div class="itemQuantity">${item.quantity}</div>
                        <div class="orderUser">${item.name}</div>
                        <div class="orderStatus">
                          <button class="editBtn" value="${item.id}" ${
            item.status === '배송완료' ? 'disabled' : ''
          }>${item.status}</button>
                        </div>
                      </div>`;

          orderBox.insertAdjacentHTML('beforeend', tempHtml);
        }
        resolve();
      });

      createHTML.then(() => {
        const editBtn = document.getElementsByClassName('editBtn');

        for (const btn of editBtn) {
          const orderId = btn.value;
          const status = btn.innerText;
          btn.addEventListener('click', () => {
            axios({
              method: 'put',
              url: 'api/admins/orders',
              data: { status, orderId },
            })
              .then((response) => {
                const data = response.data;
                alert(data.message);
                window.location.href = '/admin_order';
              })
              .catch((response) => {
                const data = response.response.data;
                console.log(data.errorMessage);
              });
          });
        }
      });
    })
    .catch((response) => {
      console.log(response.response.data);
    });
});
