/**
 * Function to validate product form
 * @return {*} Return false if information filled in
 */
function validateForm() {

  let errMsg = '';
  const id = document.getElementById('id');
  const title = document.getElementById('title');
  const desc = document.getElementById('description');
  const price = document.getElementById('price');
  const category = document.querySelectorAll('.category');
  const texture = document.querySelectorAll('.texture');
  const wash = document.querySelectorAll('.wash');
  const place = document.querySelectorAll('.place');
  const note = document.getElementById('note');
  const story = document.getElementById('story');
  const color = document.querySelectorAll('.color');
  const size = document.querySelectorAll('.size');
  const variant = document.querySelectorAll('.stock');
  const photo = document.getElementById('photo');
  const images = document.getElementById('images');

  if (!id.value) {
    errMsg = 'Please input product id!';
    alert(errMsg);
    return false;
  }

  if (!title.value) {
    errMsg = 'Please input product title!';
    alert(errMsg);
    return false;
  }

  if (!desc.value) {
    errMsg = 'Please input product description!';
    alert(errMsg);
    return false;
  }

  if (!price.value) {
    errMsg = 'Please input product price!';
    alert(errMsg);
    return false;
  }

  let categoryCheck = false;
  for (let i = 0; i < category.length; i++) {
    if (category[i].checked) {
      categoryCheck = true;
      break;
    }
  }
  if (!categoryCheck) {
    errMsg = 'Please choose product category!';
    alert(errMsg);
    return false;
  }

  let textureCheck = false;
  for (let i = 0; i < texture.length; i++) {
    if (texture[i].checked) {
      textureCheck = true;
      break;
    }
  }
  if (!textureCheck) {
    errMsg = 'Please choose product texture!';
    alert(errMsg);
    return false;
  }

  let washCheck = false;
  for (let i = 0; i < wash.length; i++) {
    if (wash[i].checked) {
      washCheck = true;
      break;
    }
  }
  if (!washCheck) {
    errMsg = 'Please choose product ways of wash!';
    alert(errMsg);
    return false;
  }

  let placeCheck = false;
  for (let i = 0; i < place.length; i++) {
    if (place[i].checked) {
      placeCheck = true;
      break;
    }
  }
  if (!placeCheck) {
    errMsg = 'Please choose product place!';
    alert(errMsg);
    return false;
  }

  if (!note.value) {
    errMsg = 'Please input product note!';
    alert(errMsg);
    return false;
  }

  if (!story.value) {
    errMsg = 'Please input product story!';
    alert(errMsg);
    return false;
  }

  let colorCheck = false;
  for (let i = 0; i < color.length; i++) {
    if (color[i].checked) {
      colorCheck = true;
      break;
    }
  }
  if (!colorCheck) {
    errMsg = 'Please choose product color!';
    alert(errMsg);
    return false;
  }

  let sizeCheck = false;
  for (let i = 0; i < size.length; i++) {
    if (size[i].checked) {
      sizeCheck = true;
      break;
    }
  }
  if (!sizeCheck) {
    errMsg = 'Please choose product size!';
    alert(errMsg);
    return false;
  }

  let variantCheck = true;
  for (let i = 0; i < variant.length; i++) {
    if (!variant[i].value) {
      variantCheck = false;
      break;
    }
  }
  if (!variantCheck) {
    errMsg = 'Please input product stock number!';
    alert(errMsg);
    return false;
  }

  if (!photo.value) {
    errMsg = 'Please select a main photo!';
    alert(errMsg);
    return false;
  }

  if (!images.value) {
    errMsg = 'Please select other images!';
    alert(errMsg);
    return false;
  }
};

