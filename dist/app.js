//global variables
let hamburger = document.querySelector(".hamburger"),
  closeNav = document.querySelector(".close-nav"),
  navbar = document.querySelector(".navbar"),
  navItems = document.querySelector(".navbar nav"),
  cart = document.getElementById("cart"),
  minus = document.getElementById("minus"),
  plus = document.getElementById("plus"),
  shoesCounter = document.getElementById("shoesCounter"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  counter = 0,
  warning = document.querySelector(".warning-msg"),
  btnAdd = document.querySelector(".btn-add"),
  numsOfItems = document.querySelector(".cart-counter span"),
  cartItems = document.querySelector(".cart-items"),
  arrOfItems = [],
  thumbs = document.querySelectorAll(".thumbs img");
const imgs = [
  {
    id: 1,
    src: "images/image-product-1.jpg",
  },
  {
    id: 2,
    src: "images/image-product-2.jpg",
  },
  {
    id: 3,
    src: "images/image-product-3.jpg",
  },
  {
    id: 4,
    src: "images/image-product-4.jpg",
  },
];

hamburger.onclick = function () { //open navbar
  navbar.classList.add("showNav");
  navItems.classList.add("stretchNav");
};
closeNav.onclick = function () { //close navbar
  navbar.classList.remove("showNav");
  navItems.classList.remove("stretchNav");
};
cart.onclick = function () { //toggle cart 
  document.querySelector(".cart").classList.toggle("openCart");
};

let emptyMsg = document.createElement("p"); // if there is no items show empty message 
if (arrOfItems.length === 0) {
  emptyMsg.textContent = "Your cart is empty";
  emptyMsg.setAttribute("class", "empty-msg");
  cartItems.append(emptyMsg);
}
let checkoutBtn = document.createElement("button"); //create checkout button 
checkoutBtn.textContent = "Checkout";
checkoutBtn.setAttribute("class", "checkout");

plus.onclick = function () {
  shoesCounter.value++;
};
minus.onclick = function () {
  if (shoesCounter.value <= 0) {
    shoesCounter.value = 0;
  } else {
    shoesCounter.value--;
  }
};
next.onclick = function () {
  counter++;
  if (counter > 3) {
    counter = 0;
  }
  document.getElementById("main-img").src = imgs[counter].src;
};
prev.onclick = function () {
  counter--;
  if (counter < 0) {
    counter = 3;
  }
  document.getElementById("main-img").src = imgs[counter].src;
};

btnAdd.onclick = function () { //add items into cart 
  if (shoesCounter.value === "0") {
    warning.classList.add("showWarningMsg");
  } else {
    warning.classList.remove("showWarningMsg");
    document
      .querySelector(".cart-counter span")
      .classList.add("showBasketCount");
    numsOfItems.innerHTML =
      Number(numsOfItems.innerHTML) + Number(shoesCounter.value);

    let cartItem = document.createElement("div");
    cartItem.setAttribute("class", "cart-item");

    let cartThumb = document.createElement("img");
    cartThumb.setAttribute("alt", "item thumbnail");
    let infoWraber = document.createElement("div");
    infoWraber.setAttribute("class", "info-wrapper");
    let productName = document.createElement("p"),
      productPrice = document.createElement("p");
    let delIcon = document.createElement("img");
    delIcon.setAttribute("alt", "remove");
    delIcon.setAttribute("class", "remove-item");

    arrOfItems.push({
      id: 0,
      el: cartItem,
      title: document.querySelector(".product-name").innerText,
      thumb: document.getElementById("main-img").src,
      price: 125.0,
      productCount: shoesCounter.value,
      productDel: "images/icon-delete.svg",
    });

    arrOfItems.forEach((item, index) => {
      item.id += index;
      cartItems.append(item.el);

      cartThumb.src = item.thumb;
      item.el.append(cartThumb);

      item.el.append(infoWraber);
      infoWraber.append(productName);
      infoWraber.append(productPrice);
      productName.append(item.title);
      productName.innerHTML = productName.innerHTML.slice(0, 20) + " ...";
      productPrice.innerHTML = `$${item.price.toFixed(2)} x ${
        item.productCount
      } <strong class="total">$<span>${
        item.price * item.productCount
      }</span>.00</strong>`;

      item.el.append(delIcon);
      delIcon.src = item.productDel;

      let removeItems = document.querySelectorAll(".remove-item");
      removeItems.forEach((removeItem) => {
        removeItem.onclick = () => {
          arrOfItems.pop();
          let itemPrice =
            removeItem.previousSibling.lastChild.lastChild.childNodes[1]
              .innerHTML;
          numsOfItems.innerHTML -= Number(itemPrice) / 125;
          removeItem.parentNode.remove();
          let itemsCount = document.querySelector(".cart-counter span");
          if (itemsCount.innerHTML === "0") {
            itemsCount.classList.remove("showBasketCount");
          }
          if (arrOfItems.length === 0) {
            document.querySelector(".checkout").remove();
            emptyMsg.textContent = "Your cart is empty";
            emptyMsg.setAttribute("class", "empty-msg");
            cartItems.append(emptyMsg);
          }
        };
      });
    });
  }
  if (arrOfItems.length > 0) {
    document.querySelector(".empty-msg")?.remove();
  }
  if (arrOfItems.length > 0) {
    cartItems.lastChild.after(checkoutBtn);
  }
};
thumbs.forEach((thumb, index) => { //selected main image, add active class on selected tnumbnail  
  thumb.onclick = () => {
    document.getElementById("main-img").src = `images/image-product-${index+1}.jpg`;
    thumbs.forEach((thumb) => {
    thumb.classList.remove("active");
    })
    thumb.classList.add("active");
  }
})
