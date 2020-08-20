/* -----Element selection and definition------- */

// form related and buttons
const checkoutForm = document.querySelector('.checkoutForm');
const loginForm = document.querySelector('.loginForm');

const formCloseBtn = document.querySelector('.formCloseBtn');
const loginCloseBtn = document.querySelector('.loginCloseBtn');
const profileCloseBtn = document.querySelector('.profileCloseBtn');

// form checkout price
const confirmTotal = document.getElementById('confirmTotal');
const confirmFinal = document.getElementById('confirmFinal');

// form show buttons
const cartBtn = document.querySelector('.cartBtn');
const memberBtn = document.querySelector('.memberBtn');

// product adding in checkout form and cartQty related
const productAdd = document.getElementById('product-add-cart-btn');
const cartNum = document.getElementById('cart-qty');
const productCart = document.querySelector('.productList');

// sign in, sign up tabs and forms
const signinTab = document.getElementById('signIn');
const signupTab = document.getElementById('signUp');
const signinForm = document.getElementById('signinForm');
const signupForm =document.getElementById('signupForm');

// recipient details //
const recipientName = document.getElementById('recipientName');
const recipientEmail = document.getElementById('recipientEmail');
const recipientHp = document.getElementById('recipientHp');
const recipientAddress = document.getElementById('recipientAddress');
const recipientTime = document.querySelectorAll('.radioBtn');
let time = '';

for (let i = 0; i < recipientTime.length; i++) {
  recipientTime[i].addEventListener('change', () => {
    if (recipientTime[i].checked) {
      time = recipientTime[i].value;
    }
  });
}

// initialize cart text
productCart.innerHTML = `<h3>No product in your cart yet!</h3>`;

// form related events
formCloseBtn.addEventListener('click', () => {
  checkoutForm.style.display = 'none';
});

loginCloseBtn.addEventListener('click', () => {
  loginForm.style.display = 'none';
});

profileCloseBtn.addEventListener('click', () => {
  loginForm.style.display = 'none';
});

memberBtn.addEventListener('click', () => {
  loginForm.style.display = 'block';
});

cartBtn.addEventListener('click', () => {
  checkoutForm.style.display = 'block';
  if (productList.length > 0) {
    productCart.children[0].style.display = 'none';
  }
});

// initiate global product list
// add item to if exist product in localStorage
let productList = [];
if (window.localStorage.length !== 0) {
  productList = JSON.parse(window.localStorage.getItem('product'));
  initiateCart();
}

// index page doesnt have addToCart Button
if (productAdd) {
  productAdd.addEventListener('click', addToCart);
}

// switch sign in sign up tabs event listeners
signinTab.addEventListener('click', () => {
  active(signinTab, signupTab, signinForm, signupForm);
});

signupTab.addEventListener('click', () => {
  active(signupTab, signinTab, signupForm, signinForm);
});

/* -----Elements function logic------- */

/**
 * Function to swap signin and signup tab class
 * @param {*} tab1
 * @param {*} tab2
 * @param {*} form1
 * @param {*} form2
 */
function active(tab1, tab2, form1, form2) {
  if (tab1.classList[0] !== 'active') {
    tab1.setAttribute('class', 'active');
    tab2.setAttribute('class', 'inactive underlineHover');
    form1.setAttribute('class', '');
    form2.setAttribute('class', 'hide');
  }
}

/**
 * Function to create element
 * @param {*} element Element that wishes to create
 * @return {*} return the created element
 */
function createElement(element) {
  return document.createElement(element);
};

/**
 * Function to initialize cart products if there are datas in localStorage
 */
function initiateCart() {
  cartNum.textContent = productList.length;
  for (let i = 0; i < productList.length; i++) {
    const dummyProduct = createProduct(productList[i]);
    productCart.appendChild(dummyProduct);
  }
  updateTotal();
};

/**
 * Function to add product to cart
 */
function addToCart() {
  const qty = parseInt(document.querySelector('.value').textContent);
  productList.push({
    'id': data.id,
    'name': data.title,
    'price': data.price,
    'color': data.colors[colorInd-1],
    'size': data.sizes[sizeInd-1],
    'qty': qty,
    'img': data.main_image,
    'max-qty': stocks[stockObj[colorInd.toString()+sizeInd.toString()]],
    'subtotal': parseInt(data.price*qty),
  });
  cartNum.textContent = (parseInt(cartNum.textContent)+1).toString();
  const rowProduct = createProduct(productList[productList.length-1]);
  productCart.appendChild(rowProduct);

  updateTotal();

  window.localStorage.setItem('product', JSON.stringify(productList));

  alert('Product added to cart!');
};

/**
 * Function to remove product from cart
 * @param {*} childNum the childIndex to be removed from cart
 */
function removeFromCart(childNum) {
  productCart.removeChild(productCart.childNodes[childNum]);
  // need to -1 because productList starts at 0
  // while productCart starts at 1 cause of h3 title
  productList.splice(childNum-1, 1);
  if (productList.length === 0) {
    productCart.children[0].style.display = 'inline-block';
  }
  cartNum.textContent = parseInt(cartNum.textContent)-1;

  updateTotal();

  window.localStorage.setItem('product', JSON.stringify(productList));

  alert('Product removed from cart!');
};

/**
 * Function to create product list in cart
 * @param {*} product Contains product details
 * @return {*} Return created product div
 */
function createProduct(product) {
  // product element
  const div = createElement('div');
  div.classList.add('row');

  // contains product image and details
  const variant = createElement('div');
  variant.classList.add('variant');

  const picture = createElement('div');
  picture.classList.add('picture');

  let img = createElement('img');
  img.src = product.img;

  picture.appendChild(img);

  const details = createElement('div');
  details.classList.add('details');
  details.innerHTML = `${product.name}<br>${product.id}
  <br><br>顏色：${product.color.name}<br>尺寸：${product.size}`;

  variant.appendChild(picture);
  variant.appendChild(details);

  // contains product quantity
  const qty = createElement('div');
  qty.classList.add('qty');

  const selectList = createElement('select');
  for (let i = 1; i <= product['max-qty']; i++) {
    const option = createElement('option');
    option.value = i;
    option.text = i;
    if (product.qty === i) {
      option.selected = true;
    }
    selectList.appendChild(option);
  }
  selectList.addEventListener('change', ()=> {
    let selectParent = selectList.parentNode.parentNode;
    let i = 0;
    while ((selectParent = selectParent.previousSibling) != null) {
      i = i + 1;
    }
    const subtotal = (parseInt(selectList.value)*
    parseInt(productCart.children[i].children[2].textContent.split('.')[1])).toString();

    productCart.children[i].children[3].textContent = `NT.${subtotal}`;
    productList[i-1].subtotal = parseInt(subtotal);

    updateTotal();

    window.localStorage.setItem('product', JSON.stringify(productList));
  });

  qty.appendChild(selectList);

  // contains product price and subtotal
  const price = createElement('div');
  price.classList.add('price');
  price.textContent = `NT.${product.price}`;

  const subtotal = createElement('div');
  subtotal.classList.add('subtotal');
  subtotal.textContent = `NT.${product.subtotal}`;

  // remove element
  const remove = createElement('div');
  remove.classList.add('remove');
  img = createElement('img');
  img.src = './cart-remove.png';
  remove.appendChild(img);
  remove.addEventListener('click', () => {
    let removeParent = remove.parentNode;
    let i = 0;
    while ((removeParent = removeParent.previousSibling) != null) {
      i = i + 1;
    }
    removeFromCart(i);
  });

  div.appendChild(variant);
  div.appendChild(qty);
  div.appendChild(price);
  div.appendChild(subtotal);
  div.appendChild(remove);

  return div;
};

/**
 * Function to update product total and final price
 */
function updateTotal() {
  const total = parseInt(productList.map((product) => product.subtotal).reduce((a, b) => a + b, 0));
  confirmTotal.textContent = `NT. ${total}`;
  confirmFinal.textContent = 'NT. ' + (total + 60).toString();
}

let validation = false;
/**
 * Function to make sure information is written in form
 * @return {*} Return false is info not filled in
 */
function validateForm() {
  let errMsg = '';

  if (!recipientName.value) {
    errMsg = '請輸入收件人姓名';
    alert(errMsg);
    return false;
  }

  if (!recipientEmail.value) {
    errMsg = '請輸入Email';
    alert(errMsg);
    return false;
  }

  if (!recipientHp.value) {
    errMsg = '請輸入手機號碼';
    alert(errMsg);
    return false;
  }

  if (!recipientAddress.value) {
    errMsg = '請輸入收件地址';
    alert(errMsg);
    return false;
  }

  let timeCheck = false;
  for (let i = 0; i < recipientTime.length; i++) {
    if (recipientTime[i].checked) {
      timeCheck = true;
    }
  }
  if (!timeCheck) {
    errMsg = '請輸入配送時間';
    alert(errMsg);
    return false;
  }
  validation = true;
};

/**
 * Function to get token from cookie
* @param {*} cookie pass in document.cookie
* @return {*} token is returned if exist
 */
function getToken(cookie) {
  const c = cookie.split('access_token=');
  let token;
  for (let i = 0; i < c.length; i++) {
    if (c[i].substr(0, 6) === 'Bearer') {
      token = c[i].split(';')[0];
      return token;
    }
  }
  return '';
};
