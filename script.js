var create = tag => {
  return document.createElement(tag);
};
var accessoriesContainer = document.getElementById("accessoriesContainer");
var clothingContainer = document.getElementById("clothingContainer");
var carouselWrapper = document.getElementById("carouselWrapper");
var loader = document.getElementById("loader");
var HeaderCart = document.getElementById("cartCount");
var totalCart = JSON.parse(localStorage.getItem("orderTotal"));
HeaderCart.innerHTML = totalCart === null ? 0 : totalCart.totalOrderQuantity;

var Xhttp = new XMLHttpRequest();
Xhttp.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product/", true);
Xhttp.onreadystatechange = function() {
  if (this.readyState === 3) {
    loader.style.display = "flex";
    clothingContainer.style.display = "none";
  }
  if (this.readyState === 4) {
    loader.style.display = "none";
    clothingContainer.style.display = "flex";
    var response = JSON.parse(this.responseText);

    for (var i = 0; i < response.length; i++) {
      if (i < 5) {
        clothingContainer.append(createProductCard(response[i], i));
      } else {
        accessoriesContainer.append(createProductCard(response[i], i));
      }
    }
  }
};
Xhttp.send();

var createProductCard = (data, i) => {
  // console.log(data);

  var productCart = create("a");
  productCart.className = "productCart";
  productCart.href = "../page/Details.html?=" + data.id;

  productImg = create("img");
  productImg.src = data.preview;
  productImg.alt = data.name;
  productCart.append(productImg);
  var productDetail = create("div");
  productDetail.className = "productDetail";

  var productName = create("h2");
  productName.innerHTML = data.name;
  var productBrand = create("h5");
  productBrand.innerHTML = data.brand;
  var priceWrapper = create("div");
  priceWrapper.className = "priceWrapper";

  var productPrice = create("h3");
  productPrice.innerHTML = "Rs. " + data.price;
  priceWrapper.append(productPrice);

  productDetail.append(productName);
  productDetail.append(productBrand);
  productDetail.append(priceWrapper);

  productCart.append(productDetail);
  // console.log(productCart);
  return productCart;
};

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

setInterval(function() {
  plusSlides(1);
}, 3000);
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.zIndex = "-1";
  slides[slideIndex - 1].style.display = "block";

  dots[slideIndex - 1].className += " active";
}
