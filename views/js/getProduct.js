// add onScroll listener to window
let locked = false;
window.onscroll = function() {
  // totalPageHeight
  const totalPageHeight = document.body.scrollHeight;

  // scrollPoint
  const scrollPoint = window.scrollY + window.innerHeight;
  // check if we hit the bottom of the page
  if (scrollPoint >= totalPageHeight) {
    if (locked) return;
    showElementScroll();
  }
};

// get category from url
let category = '';
// if tags, check tags = tag (men|women|accessories) || tags = keyword (search)
// else return product all
let tags = '';
if (window.location.href.split('?')[1]) {
  tags = window.location.href.split('?')[1].split('=');
  if (tags[0] === 'tag') {
    category = window.location.href.split('=')[1];
    getProduct();
  } else if (tags[0] === 'keyword') {
    searchProduct(tags[1]);
  }
} else {
  category = 'all';
  getProduct();
}

// define product data, product paging, product campaign
// product view element, input searchbox
let data = {};
let paging = 0;
let campaignArr = {};
const view = document.querySelector('.view');

/**
 * Function to update banner campaign
 */
function getCampaign() {
  const banner = document.querySelector('.banner');
  const request = new XMLHttpRequest();
  request.responseType = 'json';
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      campaignArr = request.response.data;

      // 3 is the number of campaigns in carousel
      for (let i = 0; i < 3; i++) {
        banner.children[i].style['background-image'] = `
        url(${campaignArr[i].picture})`;

        banner.children[i].href = `/product.html?id=${campaignArr[i].product_id}`;

        banner.children[i].children[0].innerHTML =
        campaignArr[i].story.replace(/\n/g, '<br />');
      }
    }
  };

  request.open('GET', '/api/1.0/marketing/campaigns');
  request.send();
};

/**
 * Function to render product data
 */
function getProduct() {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      data = JSON.parse(request.response).data;
      paging = JSON.parse(request.response).next_paging || -9999;
      for (let i = 0; i < data.length; i++) {
        view.appendChild(createProductDiv(data[i]));
      }
    }
  };
  request.open('GET', `/api/1.0/products/${category}`);
  request.send();
};

/**
 * Function to search/filter product by product name
 * @param {*} keyword Search keyword to search/filter product
 */
function searchProduct(keyword) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      data = JSON.parse(request.response).data;
      paging = JSON.parse(request.response).next_paging || -9999;
      for (let i = 0; i < data.length; i++) {
        view.appendChild(createProductDiv(data[i]));
      }
    }
  };
  request.open('GET', `/api/1.0/products/search?keyword=${keyword}`);
  request.send();
}

/**
 * Show more products when page scrolls down to height Y
 * Lock function when product already shown
 */
function showElementScroll() {
  // if category case use category url
  // if search case use search case url
  let url = `/api/1.0/products/${category}?paging=${paging}`;
  if (tags[0]) {
    if (tags[0] === 'keyword') {
      url = `/api/1.0/products/search?keyword=${tags[1]}&paging=${paging}`;
    }
  }

  // make request only when there is next page
  if (paging > 0) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        data = JSON.parse(request.response).data;
        paging = JSON.parse(request.response).next_paging || -9999;

        for (let i = 0; i < data.length; i++) {
          view.appendChild(createProductDiv(data[i]));
        }
      }
    };
    request.open('GET', url);
    request.send();
  }
  // let locked variable true and make no request when no paging
  if (paging === -9999) {
    locked = true;
  }
};

/**
 * Function to create new product div if there is next paging data
 * @param {*} product Input product details to create new div element
 * @return {*} Return new div element with product details
 */
function createProductDiv(product) {
  const newDiv = document.createElement('a');
  newDiv.setAttribute('class', 'product');
  newDiv.href = `/product.html?id=${product.id}`;

  const newImg = document.createElement('img');
  newImg.setAttribute('class', 'img');
  newImg.src = product.main_image;

  const newColor = document.createElement('div');
  newColor.setAttribute('class', 'colors');

  const newName = document.createElement('div');
  newName.setAttribute('class', 'name');
  newName.textContent = product.title;

  const newPrice = document.createElement('div');
  newPrice.setAttribute('class', 'price');
  newPrice.textContent = `TWD.${product.price}`;

  for (let j = 0; j < product.colors.length; j++) {
    const newColorOption = document.createElement('div');
    newColorOption.setAttribute('class', 'color');
    newColorOption.setAttribute('style', `
    background-color: #${product.colors[j].code}`);
    newColor.appendChild(newColorOption);
  }

  newDiv.appendChild(newImg);
  newDiv.appendChild(newColor);
  newDiv.appendChild(newName);
  newDiv.appendChild(newPrice);

  return newDiv;
};