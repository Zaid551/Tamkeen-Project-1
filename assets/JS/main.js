function toggleAuth() {
    const signin = document.getElementById('signin-section');
    const signup = document.getElementById('signup-section');
    
    if (signin.style.display === 'none') {
        signin.style.display = 'block';
        signup.style.display = 'none';
    } else {
        signin.style.display = 'none';
        signup.style.display = 'block';
    }
}

//Dark Mode
let darkModeBtn = document.getElementById("darkMode");
let icon = darkModeBtn.querySelector("i");
function updateIcon() {
  if (document.documentElement.classList.contains("dark")) {
    icon.classList.replace("uil-moon", "uil-sun");
  } else {
    icon.classList.replace("uil-sun", "uil-moon");
  }
}
if (localStorage.getItem("mode-color") === "dark") {
  document.documentElement.classList.add("dark");
  updateIcon();
}
darkModeBtn.addEventListener("click", function() {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("mode-color", "dark");
  } else {
    localStorage.setItem("mode-color", "light");
  }
  
  updateIcon();
});
/****Search Bar in Header ****/
let deleteNotification = document.getElementById("deleteNotification");
let notification = document.getElementById("notification");

if (deleteNotification && notification) {
  deleteNotification.addEventListener("click", () => {
    notification.classList.toggle("delete");
  });
}
let showSearchBar = document.getElementById("showSearchBar");
let searchBar = document.querySelector(".search-bar")
showSearchBar.addEventListener("click", (e)=>{
  e.preventDefault();
  searchBar.classList.toggle("active");
});
/**********Swiper Hero Section**********/
  const swiper1 = new Swiper('.mySwiper', {
  loop: true,
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 20,
  navigation:{
    prevEl: ".uil-arrow-left",
    nextEl: ".uil-arrow-right",
  },
  pagination:{
    el: ".swiper-pagination",
  }
});
/************Swiper Arrival Section********* */
  const swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    breakpoints:{
      400:{
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1000:{
      slidesPerView: 4,
        spaceBetween: 10,
      }
    }
  });
/************ Unified View Menu (Shop & Blog) ***************/
function changeView(viewClass) {
    const containers = document.querySelectorAll('.shopMenu, .blogMenu');
    const menuLists = document.querySelectorAll('.menu .menu-list');
    containers.forEach(container => {
      container.classList.remove('view-1', 'view-3');
      container.classList.add(viewClass);
    });
    menuLists.forEach(m => {
      m.classList.remove("active");
      if (m.id === viewClass) m.classList.add("active");
    });
    localStorage.setItem('pageView', viewClass);
}

window.addEventListener('DOMContentLoaded', () => {
    const savedView = localStorage.getItem('pageView') || 'view-3'; 
    changeView(savedView);
});
/////////////////
const addDataToShop = (products) => {
    let shopContainer = document.querySelector(".shopMenu"); 
    if(!shopContainer) return;
    shopContainer.innerHTML = '';
    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add("item"); 
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `
          <div class="card w-100">
            <div class="card-head d-flex flex-column align-items-center">
              <div class="arrival_images d-flex flex-column align-items-center">
                <img src="${product.img}" alt="${product.title}">
                <button class="btn add-to-cart-btn btn-dark w-75 m-3">Add to cart</button>
              </div>
              <i class="uil uil-heart fs-4 heart"></i>
              <div class="d-flex flex-column gap-2 tips">
                <span class="badge badge-light">New</span>
                <span class="badge badge-success">-50%</span>   
              </div>
            </div>
            <div class="card-body">
              <ul class="d-flex">
                ${'<li><i class="uis uis-star"></i></li>'.repeat(5)}
              </ul>
              <h6 class="fw-semibold">${product.title}</h6>
              <p class="fw-semibold black">${product.price} <span class="text-decoration-line-through gray">${product.oldPrice}</span></p>
            </div>
          </div>
        `;
        shopContainer.appendChild(newProduct);
    });
}
/*******Show Product And Add Product to Cart(Bag) ********** */
let listProducts = document.querySelector(".listProduct");
let cartList = document.querySelector(".cart-list");
let iconCart = document.querySelector(".cart-btn");
let iconBagSpans = document.querySelectorAll(".cart-badge");
let listProductsLoop = [];
let carts = [];
let subtotalElement = document.querySelector(".subtotal-price");
let totalAllElement = document.querySelector(".total-all-price");

const addDataToIndex = () => {
    listProducts.innerHTML = '';
    if (listProductsLoop.length > 0) {
        listProductsLoop.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add("swiper-slide", "item");
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
              <div class="card card-head d-flex flex-column align-items-center mb-2">
                <div class="arrival_images d-flex flex-column align-items-center">
                  <a href="${product.img}" data-fancybox="product-gallery" data-caption="${product.title}">
                    <img src="${product.img}" alt="${product.title}">
                  </a>
                  <button class="add-to-cart-btn btn btn-dark w-75 m-3">Add to cart</button>
                </div>
                <i class="uil uil-heart fs-4 heart"></i>
                <div class="d-flex flex-column gap-2 tips">
                  <span class="badge badge-light">New</span>
                  <span class="badge badge-success">-50%</span>   
                </div>
              </div>
              <div class="card-body">
                <ul class="d-flex">
                  ${'<li><i class="uis uis-star"></i></li>'.repeat(5)}
                </ul>
                <h6>${product.title}</h6>
                <p class="bold black">${product.price} <span class="text-decoration-line-through gray">${product.oldPrice}</span></p>
              </div>
            `;
            listProducts.appendChild(newProduct);
        });
    }
}
if(listProducts){
  listProducts.addEventListener("click", (e)=>{
  let positionClick = e.target;
  if(positionClick.classList.contains('add-to-cart-btn')){
    let productElement = positionClick.closest('.item'); 
    let product_id = productElement.dataset.id;
    positionClick.innerText = "Added!";
    setTimeout(() => {
        positionClick.innerText = "Add to cart";
    }, 1000);
    addToCart(product_id);
  }
})
}

let shopMenuContainer = document.querySelector(".shopMenu");

if(shopMenuContainer){
  shopMenuContainer.addEventListener("click", (e)=>{
    let positionClick = e.target;
    if(positionClick.classList.contains('add-to-cart-btn')){
      let productElement = positionClick.closest('.item'); 
      let product_id = productElement.dataset.id;
    
      positionClick.innerText = "Added!";
      setTimeout(() => {
          positionClick.innerText = "Add to cart";
      }, 1000);
      addToCart(product_id);
    }
  });
}
const addToCart = (product_id) => {
  let positionThisProductInBag = carts.findIndex((value)=> value.product_id == product_id)
  if(carts.length <= 0){
    carts = [{
      product_id: product_id,
      quantity : 1,
    }]
  }else if(positionThisProductInBag < 0){
    carts.push({
      product_id: product_id,
      quantity : 1,
    })
  }else{
    carts[positionThisProductInBag].quantity = carts[positionThisProductInBag].quantity + 1;
  }
  addCartToPage()
  addCartToMemory()
  // console.log(carts)
}
const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(carts));
}
const addCartToPage = () => {
  cartList.innerHTML = '';
  let totalQuantity = 0;
  let totalPriceCalculated = 0;
  if (carts.length > 0) {
    carts.forEach(cart => {
        totalQuantity = totalQuantity + cart.quantity;
        let positionProduct = listProductsLoop.findIndex((value) => value.id == cart.product_id);
        let info = listProductsLoop[positionProduct];
        if (info) {
          //clean Price from $ and make it a Number by parseFloat
          let priceNumber = parseFloat(info.price.replace('$', ''));
          // Count thr TotAl
          totalPriceCalculated += priceNumber * cart.quantity;
          let newCart = document.createElement('div');
          newCart.classList.add("cart-item", "is-border-down");
          newCart.dataset.id = cart.product_id;
          newCart.innerHTML = `
            <div class="cart-image">
              <img src="${info.img}" alt="${info.title}">
            </div>
            <div class="d-flex flex-column">
              <h6 class="name">${info.title}</h6>
              <span class="gray color small">Color: ${info.color || 'Default'}</span>
              <div class="quantity light-color rounded-2 d-flex align-items-center gap-2 mt-3">
                <button class="btn minus-btn"><i class="uil uil-minus"></i></button>
                <span class="number gray">${cart.quantity}</span>
                <button class="btn plus-btn"><i class="uil uil-plus"></i></button>
              </div>
            </div>
            <div class="d-flex flex-column align-items-start mb-5">
              <span class="total-price small black">${info.price}</span>
              <button class="btn btn-remove">
                <i class="uil uil-times fs-2 gray"></i>
              </button>
            </div>
          `;
          cartList.appendChild(newCart);
        }
    })
  }
  iconBagSpans.forEach(span => {
    span.innerHTML = totalQuantity;
  });
  if(subtotalElement) subtotalElement.innerHTML = `$${totalPriceCalculated.toFixed(2)}`;
  if(totalAllElement) totalAllElement.innerHTML = `$${totalPriceCalculated.toFixed(2)}`;
}
cartList.addEventListener("click", (e) => {
    let positionClick = e.target;
    //closest: i use it to bring the closest element that holds the required class
    let isPlus = positionClick.closest('.plus-btn');
    let isMinus = positionClick.closest('.minus-btn');
    let isRemove = positionClick.closest('.btn-remove');
    let productElement = positionClick.closest('.cart-item');
    
    if (!productElement) return;
    let product_id = productElement.dataset.id;
    
    if (isPlus) {
        changeQuantity(product_id, "plus");
    } else if (isMinus) {
        changeQuantity(product_id, "minus");
    } else if (isRemove) {
        removeFromCart(product_id);
    }
});
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    
    if (positionItemInCart >= 0) {
        if (type === "plus") {
          carts[positionItemInCart].quantity += 1;
        } else {
          let valueChange = carts[positionItemInCart].quantity - 1;
          if (valueChange > 0) {
            carts[positionItemInCart].quantity = valueChange;
          } else {
            carts.splice(positionItemInCart, 1);
          }
        }
    }
    addCartToMemory();
    addCartToPage();
}
const removeFromCart = (product_id) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        carts.splice(positionItemInCart, 1);
    }
    addCartToMemory();
    addCartToPage();
}
const initApp = () => {
  let jsonFile = document.querySelector('.shopMenu') ? 'assets/JSON/shop-product.json' : 'assets/JSON/product.json';
    fetch(jsonFile)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        listProductsLoop = data;
        
if(document.querySelector('.shopMenu')) {
            addDataToShop(data);
            const savedView = localStorage.getItem('shopView') || 'view-3';
            changeView(savedView);
        } else {
          addDataToIndex(); 
        }

      //get cart from memory
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToPage();
        }
    })
    .catch(err => console.error("Error loading JSON:", err))
    .finally(() =>{
      console.log("Call Json Ended")
    });
}

initApp();

/************Swiper Product Section********* */
  const swiper3 = new Swiper(".swiperProduct", {
    loop: false,
    grabCursor: true,
    slidesPerView: 1,
    navigation:{
      prevEl: ".uil-arrow-left",
      nextEl: ".uil-arrow-right",
    },
    breakpoints:{
      1000:{
      slidesPerView: 6,
      spaceBetween: 10,
      }
    },
  });
/**********Product Menu Button For Change Color Name Table*********** */
const buttonsList = document.querySelectorAll(".button-menu button"),
      allTexts = document.querySelectorAll(".color-table .color-text");

const savedTarget = localStorage.getItem("selected-table-color");

if (savedTarget) {
  activateColor(savedTarget);
}

buttonsList.forEach((btn) => {
  btn.addEventListener("click", () => {
    const getColorTarget = btn.getAttribute("data-target");
    activateColor(getColorTarget);
    localStorage.setItem("selected-table-color", getColorTarget);
  });
});

function activateColor(targetId) {
  allTexts.forEach(t => t.style.display = "none");
  buttonsList.forEach(b => b.classList.remove("active"));

  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.style.display = "block";
    const activeBtn = document.querySelector(`[data-target="${targetId}"]`);
    if (activeBtn){
      activeBtn.classList.add("active");
    }
  }
}
//WishList 
const wishBtn = document.getElementById('wishList-btn');
const heartIcon = document.getElementById('heartColor');
const wishlistBadge = document.getElementById('wishlist-count');

function updateUI() {
    let savedCount = parseInt(localStorage.getItem('wishlistTotal')) || 0;
    let isAdded = localStorage.getItem('isFavorite') === 'true';

    if (wishlistBadge) {
        wishlistBadge.innerText = savedCount;
    }

    if (heartIcon) {
        if (isAdded) {
            heartIcon.classList.add("active");
        } else {
            heartIcon.classList.remove("active");
        }
    }
}

updateUI();

if (wishBtn) {
    wishBtn.addEventListener('click', function() {
      let isAdded = localStorage.getItem('isFavorite') === 'true';
      let currentCount = parseInt(localStorage.getItem('wishlistTotal')) || 0;

      if (!isAdded) {
          currentCount++;
          localStorage.setItem('isFavorite', 'true');
      } else {
          if (currentCount > 0) currentCount--;
          localStorage.setItem('isFavorite', 'false');
      }
      
      localStorage.setItem('wishlistTotal', currentCount);
      updateUI(); 
    });
}
//Time in Product Page
const countdownDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000);

const x = setInterval(function() {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (document.getElementById("days")) {
      document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
      document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
      document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
      document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
  }
  if (distance < 0) {
    clearInterval(x);
    document.querySelector(".countdown-container").innerHTML = "<h4 class='text-danger'>Offer Expired!</h4>";
  }
}, 1000);

// Cart Page
document.addEventListener('DOMContentLoaded', function () {
    const cartTab = document.querySelector('#cartTab');
    const mainTitle = document.querySelector('.hero h1');
    if(cartTab){
        cartTab.addEventListener('show.bs.tab', function (event) {
        const targetId = event.target.getAttribute('data-bs-target');
        if (targetId === '#step1') mainTitle.innerText = 'Cart';
        if (targetId === '#step2') mainTitle.innerText = 'Check Out';
        if (targetId === '#step3') mainTitle.innerText = 'Complete!';
        const allTabs = document.querySelectorAll('.nav-link');
        let currentPassed = true;
        allTabs.forEach(tab => {
            const icon = tab.querySelector('.step-icon');
            const stepNumber = tab.id.replace('step', '').replace('-tab', '');

            if (!icon) return; 
            if (tab === event.target) {
              currentPassed = false;
              tab.classList.remove('completed');
              icon.innerText = stepNumber; 
            }
            if (currentPassed) {
              tab.classList.add('completed');
              icon.innerHTML = '✓'; 
            } else if (tab !== event.target) {
              tab.classList.remove('completed');
              icon.innerText = stepNumber; 
            }
        });
    });
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    if(checkoutBtn){
        checkoutBtn.addEventListener('click', function() {
        const nextStep = new bootstrap.Tab(document.querySelector('#step2-tab'));
        nextStep.show();
      });
    }

});
/*********** */
document.addEventListener('DOMContentLoaded', function() {
    let dynamicOffset = window.innerWidth < 768 ? 50 : 120;

    if (window.innerWidth < 768) {
        const sideElements = document.querySelectorAll('[data-aos="fade-left"], [data-aos="fade-right"], [data-aos="fade-down-left"]');
        sideElements.forEach(function(el) {
            el.setAttribute('data-aos', 'fade-up');
        });
    }

    AOS.init({
        duration: 1000,
        once: true,
        offset: dynamicOffset,
        delay: 100,
        easing: 'ease-in-out' 
    });
});