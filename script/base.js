var sideBar = document.getElementById("sidebar");
var hamburger = document.getElementById("navBar");

hamburger.addEventListener("click", function() {
  //   console.log("hye....");
  if (sideBar.className === "sidebarClose") {
    sideBar.className = "sidebarCls";
    hamburger.classList.remove("sidebarClose");
  } else {
    sideBar.className = "sidebarClose";
  }
});

function createSideNav() {
  var sideBarWrapper = document.createElement("div");
  sideBarWrapper.className = "sideBarWrapper";
  var logo = document.createElement("h2");
  logo.innerHTML = "SHOPLANE";
  logo.className = "logoName";
  sideBarWrapper.append(logo);

  var navigator = document.createElement("div");
  navigator.className = "navigator";

  linkClothing = document.createElement("a");
  linkClothing.innerHTML = "Clothing";
  linkClothing.src = "/#";
  navigator.append(linkClothing);

  linkAccessories = document.createElement("a");
  linkAccessories.innerHTML = "Accessories";
  linkAccessories.src = "#";
  navigator.append(linkAccessories);
  sideBarWrapper.append(navigator);
  return sideBarWrapper;
}

sideBar.append(createSideNav());

var openLink = document.getElementById("designName");
console.log(openLink);

openLink.addEventListener("click", function() {
  window.open("https://www.linkedin.com/in/kumbharetapish/", "_black");
});
