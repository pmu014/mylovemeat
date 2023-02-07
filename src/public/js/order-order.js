// const socket = io.connect("/");
// socket.emit('asdf', "살려줘")
// socket.on("dd", (dd) => {
//   console.log(dd)
// })
document.addEventListener('DOMContentLoaded', () => {
  
  const list1 = document.getElementById('list1');
  const list2 = document.getElementById('list2');
  const list3 = document.getElementById('list3');

  axios({
    method: 'get',
    url: '/api/orders',
    data: {
    },
  })
    .then((response) => {
      const data = response.data.data;
      // console.log(data);
      const userName = data[0].userName
      const address = data[0].address
      const phone = data[0].phone
      // console.log(userName);
      // console.log(address);
      // console.log(phone);
      let sumPrice = 0
      for (let i = 1; i < data.length; i++) {
        const quantity = data[i].quantity
        const productId = data[i].productId
        const name = data[i].name
        const price = data[i].price
        const img = data[i].img
        const productPrice = price*quantity
      
        sumPrice += parseInt(productPrice)
        let container1 =`<div class="container1">
                          <div class="img">${img}</div>
                          <div class="name">${name}</div>
                          <div class="price">${price}</div>
                          <div class="quantity">수량 : ${quantity}</div>
                          <div class="productPrice">상품 금액 : ${productPrice}</div>
                        </div>`

        list1.insertAdjacentHTML('beforeend', container1);
      }
      let container2 = `<div class="container2">
                          <h1>배송 정보</h1>
                          <div>
                            <label for="account" class="form-label">주문자</label>
                            <input type="text" id="userName" class="userName" value="${userName}">
                          </div>  
                          <div>
                            <label for="account" class="form-label">연락처</label>
                            <input type="text" id="phone" class="phone" value="${phone}">
                          </div>  
                          <div>
                            <label for="account" class="form-label">배송지</label>
                            <input type="text" id="address" class="address" value="${address}">
                          </div>  
                        </div>`
      list2.insertAdjacentHTML('beforeend', container2);
      
      let container3 = `<div>주문금액 : ${sumPrice}</div>`
      list3.insertAdjacentHTML('beforebegin', container3);

  
      const orderBtn = document.getElementById('orderBtn');
      orderBtn.addEventListener('click', () => {
        console.log(data);
        const inputUserName = document.getElementById('userName').value;
        const inputPhone = document.getElementById('phone').value;
        const inputAddress = document.getElementById('address').value;
        // console.log(inputUserName);
            axios({
              method: 'post',
              url: '/api/orders',
              data: {
                name:inputUserName,
                phone:inputPhone,
                address:inputAddress,
                data
              },
            })
              .then(() => {
                alert('주문이 완료되었습니다.');
              })
              .catch((response) => {
                console.log(response);
              });
          });
    })
    .catch((response) => {
      // const data = response.response.data
      // console.log(data);
      // alert(data.errorMessage);
    });
  });

