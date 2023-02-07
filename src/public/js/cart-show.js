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
                          <div class="img">${img}</div>
                          <div class="name">${name}</div>
                          <div class="price">${price}</div>
                          <div class="quantity">수량 : ${quantity}</div>
                          <button value="${productId}" class="deleteBtn" onclick="deleteProduct()">삭제</button>
                          <div class="productPrice">상품 금액 : ${productPrice}</div>
                        </div>`

        lists.insertAdjacentHTML('beforeend', container1);
      }
      let container2 = `<div>주문금액 : ${sumPrice}</div>`
      order.insertAdjacentHTML('beforebegin', container2);

      const productId = deleteBtn.value;
      console.log(productId);
      
      const deleteBtns = document.getElementsByClassName('deleteBtn');
      console.log(deleteBtns);
      for (const deleteBtn of deleteBtns) {
        const productId = deleteBtn.value;
        deleteBtn.addEventListener('click', () => {
          console.log(productId);
          // axios({
          //   method: 'delete',
          //   url: '/api/carts' + productId,
          //   data: {},
          // })
          //   .then(() => {
          //     alert('상품이 삭제 되었습니다');

          //     // window.location.href = '/admin_index';
          //   })
          //   .catch((response) => {
          //     console.log(response);
          //   });
        });
      }

    })
    .catch((response) => {
      // const data = response.response.data
      // console.log(data);
      // alert(data.errorMessage);
    });
  });

