var apiEndPoint =
  "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" +
  location.search.split("=")[1];
var create = tag => {
  return document.createElement(tag);
};
var detailContainer = document.getElementById("detailContainer");
var HeaderCart = document.getElementById("cartCount");
var totalCart = JSON.parse(localStorage.getItem("orderTotal"));
HeaderCart.innerHTML = totalCart === null ? "0" : totalCart.totalOrderQuantity;

var Xhttp = new XMLHttpRequest();
Xhttp.open("GET", apiEndPoint, true);
Xhttp.onreadystatechange = function() {
  if (this.readyState === 3) {
    loader.style.display = "flex";
    detailContainer.style.display = "none";
  }
  if (this.readyState === 4) {
    loader.style.display = "none";
    detailContainer.style.display = "flex";
    var response = JSON.parse(this.responseText);
    detailContainer.append(cerateProductDetail(response));
  }
};
Xhttp.send();

var OrderData = localStorage.getItem("orderData");
var cerateProductDetail = data => {
  var detailWrapper = create("div");
  detailWrapper.className = "detailsWrapper";

  var imgWrapper = create("div");
  imgWrapper.className = "imgWrapper";

  var productDetailImg = create("img");
  productDetailImg.className = " productDetailImg";
  productDetailImg.src = data.preview;
  productDetailImg.alt = data.name;
  imgWrapper.append(productDetailImg);

  detailWrapper.append(imgWrapper);
  var productName = create("h1");
  productName.className = "productName";
  productName.innerHTML = data.name;
  var productBrand = create("h5");
  productBrand.className = "productBrand";
  productBrand.innerHTML = data.brand;
  var productHeadingWrapper = create("div");
  productHeadingWrapper.className = "productHeadingWrapper";
  productHeadingWrapper.append(productName);
  productHeadingWrapper.append(productBrand);

  var descriptionHeading = create("h3");
  descriptionHeading.innerHTML = "Description";
  var productDescription = create("p");
  productDescription.innerHTML = data.description;
  var descriptionWrapper = create("div");
  descriptionWrapper.className = "descriptionWrapper";
  descriptionWrapper.append(descriptionHeading);
  descriptionWrapper.append(productDescription);

  var previewWrapper = create("div");
  previewWrapper.className = "previewWrapper";
  var previewHeading = create("h3");
  previewHeading.innerHTML = "Product Preview";
  previewWrapper.append(previewHeading);
  var previewImgWrapper = create("div");
  previewImgWrapper.className = "previewImgWrapper";
  previewImg = (img, i) => {
    var imgFirst = create("img");
    imgFirst.className = "imgFirst";
    imgFirst.src = img;

    imgFirst.addEventListener("click", function(e) {
      var a = document.querySelectorAll(".imgFirst");
      for (let i = 0; i < a.length; i++) {
        if (a[i].classList[1] === "highLighter")
          a[i].classList.remove("highLighter");
      }
      imgFirst.classList.add("highLighter");
      productDetailImg.src = e.target.src;
    });
    return imgFirst;
  };
  for (let i = 0; i < data.photos.length; i++) {
    previewImgWrapper.append(previewImg(data.photos[i], i));
  }

  previewWrapper.append(previewImgWrapper);
  priceWrapper = create("h2");
  priceWrapper.className = "priceWrapper";
  priceWrapper.innerHTML = "Price :";

  productPrice = create("p");
  productPrice.className = "productPrice";
  productPrice.innerHTML = "Rs." + data.price;
  priceWrapper.append(productPrice);

  var cartBtn = create("button");
  cartBtn.className = "cartBtn";
  cartBtn.innerHTML = "Add to Cart";
  var counter = 0;
  var price = data.price;
  cartBtn.addEventListener("click", function() {
    counter += 1;
    price = counter * price;
    var Data = {
      id: data.id,
      preview: data.preview,
      name: data.name,
      brand: data.brand,
      price: price,
      quantity: counter
    };

    var grandTotal = {
      totalOrderQuantity: counter,
      totalPrice: price
    };
    var orderTotal = JSON.parse(localStorage.getItem("orderTotal"));

    if (orderTotal === null) {
      orderTotal = [];
      localStorage.setItem("orderTotal", JSON.stringify(grandTotal));
      HeaderCart.innerHTML = grandTotal.totalOrderQuantity;
    } else {
      HeaderCart.innerHTML = orderTotal.totalOrderQuantity;
      orderTotal.totalOrderQuantity = orderTotal.totalOrderQuantity + 1;
      orderTotal.totalPrice = orderTotal.totalPrice + data.price;
      localStorage.setItem("orderTotal", JSON.stringify(orderTotal));
      HeaderCart.innerHTML = orderTotal.totalOrderQuantity;
    }

    var OrderData = JSON.parse(localStorage.getItem("orderData"));
    let localOrderData;
    if (OrderData === null) {
      OrderData = [];
      localStorage.setItem("orderData", JSON.stringify([Data]));
    } else {
      for (let i = 0; i < OrderData.length; i++) {
        if (OrderData[i].id === Data.id) {
          OrderData[i].quantity = counter;
          OrderData[i].price = price;
          console.log(OrderData);
          localStorage.setItem("orderData", JSON.stringify(OrderData));
        } else {
          localOrderData = JSON.parse(localStorage.getItem("orderData"));
          if (i + 1 === OrderData.length) {
            localOrderData.push(Data);
            localStorage.setItem("orderData", JSON.stringify(localOrderData));
          }
        }
      }
    }
  });

  var details = create("div");
  details.className = "productDetails";
  details.append(productHeadingWrapper);
  details.append(descriptionWrapper);
  details.append(priceWrapper);
  details.append(previewWrapper);
  details.append(cartBtn);
  detailWrapper.append(details);
  return detailWrapper;
};
