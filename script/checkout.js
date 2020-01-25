var orderTotal = JSON.parse(localStorage.getItem("orderTotal"));
var orderData = JSON.parse(localStorage.getItem("orderData"));
var orderID = Math.floor(Math.random() * (100 - 0)) + "@SHOPLANE.co";
var orderConfirm = {
  orderID: orderID,
  totalAmount: orderTotal,
  "Order-product": orderData
};

var create = tag => {
  return document.createElement(tag);
};

var cartContainer = document.getElementById("cartContainer");
var popUp = document.getElementById("popWrapper");
popUp.style.display = "none";
popUp.append(CreatePopUp(orderID));
var HeaderCart = document.getElementById("cartCount");
var totalCart = JSON.parse(localStorage.getItem("orderTotal"));
HeaderCart.innerHTML = totalCart === null ? "0" : totalCart.totalOrderQuantity;

var pageHeading = create("h2");
pageHeading.innerHTML =
  orderData === null ? " Empty cart" : "Total Item: " + orderData.length;
cartContainer.append(pageHeading);

var amountWrapper = document.getElementById("amountWrapper");
amountWrapper.append(createAmountCart(orderTotal));

function CreatePopUp(orderID) {
  var popContainer = create("div");
  popContainer.className = "ponContainer";

  var heading = create("h2");
  heading.innerHTML = "Your Order Number:";
  popContainer.append(heading);

  var orderNo = create("h3");
  orderNo.innerHTML = orderID;
  popContainer.append(orderNo);

  var confirmBtn = create("button");
  confirmBtn.className = "orderPlaceBtn";
  confirmBtn.innerHTML = "Order Confirm";
  confirmBtn.addEventListener("click", function() {
    localStorage.clear();
    window.location.assign("../page/Confirmation.html");
  });

  popContainer.append(confirmBtn);
  return popContainer;
}

function createAmountCart(data) {
  var amountCartHeading = create("h2");
  amountCartHeading.innerHTML = "Total Amount";

  var totalCartAmountText = create("h3");
  totalCartAmountText.innerHTML = "Amount: Rs.";

  var totalCartAmount = create("span");
  totalCartAmount.className = "totalOrderAmount";
  totalCartAmount.innerHTML = data === null ? "0" : data.totalPrice;
  totalCartAmountText.append(totalCartAmount);
  var totalProductQuantity = create("h3");
  totalProductQuantity.innerHTML =
    data === null ? "0" : "Qty.:" + data.totalOrderQuantity;
  var amountDetails = create("div");
  amountDetails.append(amountCartHeading);
  amountDetails.append(totalCartAmountText);
  amountDetails.append(totalProductQuantity);

  var orderPlaceBtn = create("button");
  orderPlaceBtn.className = "orderPlaceBtn";
  orderPlaceBtn.innerHTML = "Place Order";
  orderPlaceBtn.addEventListener("click", function() {
    if (orderConfirm.totalAmount !== null) {
      orderPost(orderConfirm);
      popUp.style.display = "flex";
    }
    if (orderConfirm.totalAmount === null) {
      alert("Sorry , Cart Empty");
    }
    // window.location.assign("../page/Confirmation.html");
  });
  orderPlaceImg = create("img");
  orderPlaceImg.src = "../order-place.png";

  orderPlace = create("div");

  orderPlace.className = "orderPlace";
  orderPlace.append(orderPlaceImg);
  orderPlace.append(orderPlaceBtn);

  var amountContainer = create("div");
  amountContainer.className = "amountContainer";

  amountContainer.append(amountDetails);
  amountContainer.append(orderPlace);
  return amountContainer;
}

var createCheckoutCart = localData => {
  var cartWrapper = create("div");
  cartWrapper.className = "cartWrapper";

  var cartImg = create("img");
  cartImg.className = "cartImg";
  cartImg.alt = localData.name;
  cartImg.src = localData.preview;
  cartWrapper.append(cartImg);

  var cartDetailWrapper = create("div");
  cartDetailWrapper.className = "cartDetailWrapper";

  var productName = create("h3");
  productName.innerHTML = localData.name;
  cartDetailWrapper.append(productName);

  var productQuantity = create("p");
  productQuantity.innerHTML = "Qty.:" + localData.quantity;
  cartDetailWrapper.append(productQuantity);

  var productPrice = create("p");
  productPrice.innerHTML = "Amount:" + " " + "Rs." + localData.price;
  cartDetailWrapper.append(productPrice);

  cartWrapper.append(cartDetailWrapper);

  return cartWrapper;
};

function emptyCart() {
  var cartImg = create("img");
  cartImg.src = "https://www.infoskysolutions.com/images/cart_is_empty.png";

  return cartImg;
}
if (orderData === null) {
  cartContainer.append(emptyCart());
}
if (orderData !== null) {
  for (let i = 0; i < orderData.length; i++) {
    cartContainer.append(createCheckoutCart(orderData[i]));
  }
}

var orderPost = order => {
  var postApi = "https://5d76bf96515d1a0014085cf9.mockapi.io/order";
  var Xhttp = new XMLHttpRequest();
  Xhttp.open("POST", postApi, true);
  Xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  Xhttp.send(JSON.stringify(order));
};
