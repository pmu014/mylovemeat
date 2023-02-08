document.addEventListener('DOMContentLoaded', () => {
  const lists = document.getElementById('lists');
  const order = document.getElementById('order');

  axios({
    method: 'get',
    url: '/api/carts',
    data: {
    },
  })
    .then((response) => {
      const data = response.data;
      let sumPrice = 0
      for (let i = 0; i < data.returnValue.length; i++) {
        const quantity = data.returnValue[i].quantity
        const productId = data.returnValue[i].productId
        const name = data.returnValue[i].name
        const price = data.returnValue[i].price
        const img = data.returnValue[i].img
        const productPrice = price*quantity
      
        sumPrice += parseInt(productPrice)
        let container1 =`<div class="container1">
                          <div class="img"><img src="/images/${img}"></div>
                          <div class="name">${name}</div>
                          <div class="price">${parseInt(price).toLocaleString()}</div>
                          <div class="quantityName">수량</div>
                          <input type="text" id="quantity${i}"class="quantity" value="${quantity}">
                          <button value="${productId}" class="updateBtn" >수정</button>
                          <button value="${productId}" class="deleteBtn" >삭제</button>
                          <div class="productPrice">상품 금액 : ${parseInt(productPrice).toLocaleString()}</div>
                        </div>`

        lists.insertAdjacentHTML('beforeend', container1);
      }
      let container2 = `<div>주문금액 : ${parseInt(sumPrice).toLocaleString()}</div>`
      order.insertAdjacentHTML('beforebegin', container2);

      const updateBtns = document.getElementsByClassName('updateBtn');
      const quantities = document.getElementsByClassName('quantity');

      for (let i = 0; i < updateBtns.length; i++) {
        const productId = updateBtns[i].value;
        updateBtns[i].addEventListener('click', () => {
          const quantity = document.getElementById(`quantity${i}`).value;

          axios({
            method: 'put',
            url: '/api/carts/' + productId,
            data: {quantity},
          })
            .then(() => {
              window.location.reload()
            })
            .catch((response) => {
              console.log(response);
            });
        });
      }

      const deleteBtns = document.getElementsByClassName('deleteBtn');
      console.log(deleteBtns);
      for (const deleteBtn of deleteBtns) {
        const productId = deleteBtn.value;
        deleteBtn.addEventListener('click', () => {
          console.log(productId);
          axios({
            method: 'delete',
            url: '/api/carts/' + productId,
            data: {},
          })
            .then(() => {
              window.location.reload()
            })
            .catch((response) => {
              console.log(response);
            });
        });
      }

    })
    .catch((response) => {
      // const data = response.response.data
      // console.log(data);
      // alert(data.errorMessage);
    });
  });

  function order() {
    window.location.href = '/order_order';
  }

