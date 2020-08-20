// get id when webpage loads
const id = window.location.href.split('=')[1];

// create stock obj to store color,size mapped stock value
const stockObj = {};

// initialize color, size, stock, data
let colorInd = 1;
let sizeInd = 1;
let stocks = [];
let data = {};

/**
 * Function to render product details data
 */
function getDetails() {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      const mainImage = document.getElementById('product-main-image');
      const productID = document.getElementById('product-id');
      const colors = document.getElementById('product-color');
      const name = document.getElementById('product-name');
      const price = document.getElementById('product-price');
      const sizes = document.getElementById('product-sizes');
      const qty = document.getElementById('product-qty');
      const summary = document.getElementById('product-summary');
      const story = document.getElementById('product-story');
      const images = document.getElementById('product-images');

      data = JSON.parse(request.response).data;
      // console.log(data);

      // create stock obj mapping
      let stockInd = 0;
      for (let i = 1; i < data.colors.length+1; i++) {
        for (let j = 1; j < data.sizes.length+1; j++) {
          stockObj[i.toString()+j.toString()] = stockInd;
          stockInd = stockInd + 1;
        }
      }

      stocks = data.variants.map((arr, ind) => {
        return arr.stock;
      });

      // main-image
      mainImage.children[0].src = data.main_image;

      // productID
      productID.textContent = data.id;

      // productColor
      // color init
      for (let j = 0; j < data.colors.length; j++) {
        const colorOption = document.createElement('div');
        if (j === 0) {
          colorOption.setAttribute('class', 'color current');
        } else {
          colorOption.setAttribute('class', 'color');
        }
        colorOption.setAttribute('style', `
        background-color: #${data.colors[j].code}`);
        colors.appendChild(colorOption);
      }

      // color onclick
      for (let i = 1; i < colors.children.length; i++) {
        colors.children[i].addEventListener('click', () => {
          // remove past color 'current' attribute
          colors.children[colorInd].setAttribute('class', 'color');

          // add attribute 'current' to new element
          colors.children[i].setAttribute('class', 'color current');

          // update colorIndex
          colorInd = i;

          // reset stock to 1
          qty.children[1].textContent = 1;

          checkStock(colorInd, sizes);
        });
      }

      // productName
      name.textContent = data.title;

      // productPrice
      price.textContent = `TWD.${data.price}`;

      // productSizes
      // size init
      for (let j = 0; j < data.sizes.length; j++) {
        const sizeOption = document.createElement('div');
        if (j === 0) {
          sizeOption.setAttribute('class', 'size current');
        } else {
          sizeOption.setAttribute('class', 'size');
        }
        sizeOption.textContent = data.sizes[j];
        sizes.appendChild(sizeOption);
      }

      checkStock(colorInd, sizes);

      // size onclick
      for (let i = 1; i < sizes.children.length; i++) {
        sizes.children[i].addEventListener('click', () => {
          // remove past size 'current' attribute
          // if past size has 'disabled' attribute, remain disabled
          if (sizes.children[sizeInd].classList[1] === 'disabled') {
            sizes.children[sizeInd].setAttribute('class', 'size disabled');
          } else {
            sizes.children[sizeInd].setAttribute('class', 'size');
          }

          // add attribute 'current' to new element
          sizes.children[i].setAttribute('class', 'size current');

          // update sizeIndex
          sizeInd = i;

          // reset stock to 1
          qty.children[1].textContent = 1;
        });
      }

      // productQty
      // minus button
      qty.children[0].addEventListener('click', () => {
        if (parseInt(qty.children[1].textContent)>1) {
          qty.children[1].textContent =
          parseInt(qty.children[1].textContent) - 1;
        }
      });

      // add button
      qty.children[2].addEventListener('click', () => {
        if (parseInt(qty.children[1].textContent) <=
        stocks[stockObj[colorInd.toString()+sizeInd.toString()]]-1) {
          qty.children[1].textContent =
          parseInt(qty.children[1].textContent) + 1;
        }
      });

      // productSummary
      summary.innerHTML = data.note + '<br><br>' + data.texture +
      ' 100%<br>厚薄：薄<br>彈性：無<br><br>清洗：' + data.wash + '<br>產地：' + data.place;

      // productStory
      story.textContent = data.story;

      // productImages
      images.children[0].src = data.images[0];
      images.children[1].src = data.images[1];
    }
  };
  request.open('GET', `/api/1.0/products/details?id=${id}`);
  request.send();
};

/**
 * Function to disable selection if stock is 0
 * @param {*} colorInd input current color index
 * @param {*} sizes input sizes array
 */
function checkStock(colorInd, sizes) {
  for (let i = 1; i < sizes.children.length; i++) {
    if (stocks[stockObj[colorInd.toString()+i.toString()]] === 0) {
      sizes.children[i].setAttribute('class', 'size disabled');
      // special cases when sizeInd chosen === case stock 0
      if (i === sizeInd && i === 1) {
        sizes.children[i+1].setAttribute('class', 'size current');
        sizeInd = i+1;
      } else if (i === sizeInd) {
        sizes.children[i-1].setAttribute('class', 'size current');
        sizeInd = i-1;
      }
    } else if (i === sizeInd) {
      sizes.children[i].setAttribute('class', 'size current');
    } else {
      sizes.children[i].setAttribute('class', 'size');
    }
  }
};
