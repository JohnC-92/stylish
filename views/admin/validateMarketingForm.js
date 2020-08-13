/**
 * Function to validate product marketing form
 * @return {*} Return false if information not filled in
 */
function validateForm() {
  let errMsg = '';
  const id = document.getElementById('id');
  const story = document.getElementById('story');
  const photo = document.getElementById('photo');

  if (!id.value) {
    errMsg = 'Please input product id!';
    alert(errMsg);
    return false;
  }

  if (!photo.value) {
    errMsg = 'Please select a photo!';
    alert(errMsg);
    return false;
  }

  if (!story.value) {
    errMsg = 'Please input product story!';
    alert(errMsg);
    return false;
  }
};
