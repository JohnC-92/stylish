TPDirect.setupSDK(12348, `app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF`, 'sandbox');
TPDirect.card.setup({
  fields: {
    number: {
      element: '.form-control.card-number',
      placeholder: '**** **** **** ****',
    },
    expirationDate: {
      element: document.getElementById('tappay-expiration-date'),
      placeholder: 'MM / YY',
    },
    ccv: {
      element: $('.form-control.cvc')[0],
      placeholder: '後三碼',
    },
  },
  styles: {
    'input': {
      'color': 'gray',
    },
    'input.ccv': {
      // 'font-size': '16px'
    },
    ':focus': {
      'color': 'black',
    },
    '.valid': {
      'color': 'green',
    },
    '.invalid': {
      'color': 'red',
    },
    '@media screen and (max-width: 400px)': {
      'input': {
        'color': 'orange',
      },
    },
  },
});

// listen for TapPay Field
TPDirect.card.onUpdate(function(update) {
  /* Disable / enable submit button depend on update.canGetPrime  */
  /* ============================================================ */

  // update.canGetPrime === true
  //     --> you can call TPDirect.card.getPrime()
  // const submitButton = document.querySelector('button[type='submit']')
  if (update.canGetPrime) {
    // submitButton.removeAttribute('disabled')
    $('button[type="submit"]').removeAttr('disabled');
  } else {
    // submitButton.setAttribute('disabled', true)
    $('button[type="submit"]').attr('disabled', true);
  }


  /* Change card type display when card type change */
  /* ============================================== */

  // cardTypes = ['visa', 'mastercard', ...]
  const newType = update.cardType === 'unknown' ? '' : update.cardType;
  $('#cardtype').text(newType);

  /* Change form-group style when tappay field status change */
  /* ======================================================= */

  // number 欄位是錯誤的
  if (update.status.number === 2) {
    setNumberFormGroupToError('.card-number-group');
  } else if (update.status.number === 0) {
    setNumberFormGroupToSuccess('.card-number-group');
  } else {
    setNumberFormGroupToNormal('.card-number-group');
  }

  if (update.status.expiry === 2) {
    setNumberFormGroupToError('.expiration-date-group');
  } else if (update.status.expiry === 0) {
    setNumberFormGroupToSuccess('.expiration-date-group');
  } else {
    setNumberFormGroupToNormal('.expiration-date-group');
  }

  if (update.status.cvc === 2) {
    setNumberFormGroupToError('.cvc-group');
  } else if (update.status.cvc === 0) {
    setNumberFormGroupToSuccess('.cvc-group');
  } else {
    setNumberFormGroupToNormal('.cvc-group');
  }
});

/**
 * checkout credit card to TapPay backend
 * @return {*} return alert no product in cart if no product
 */
function checkout() {
  if (productList.length === 0) {
    return alert('No product in cart!');
  }

  if (!validation) {
    return;
  }

  validation = false;

  // fix keyboard issue in iOS device
  forceBlurIos();

  const tappayStatus = TPDirect.card.getTappayFieldsStatus();
  console.log(tappayStatus);

  // Check TPDirect.card.getTappayFieldsStatus().canGetPrime
  // before TPDirect.card.getPrime
  if (tappayStatus.canGetPrime === false) {
    alert('can not get prime');
    return;
  }

  // Get prime
  TPDirect.card.getPrime(function(result) {
    if (result.status !== 0) {
      alert('get prime error ' + result.msg);
      return;
    }
    alert('get prime 成功，prime: ' + result.card.prime);

    const price = productList.map((product) => product.price).reduce((a, b) => a + b, 0);

    const data = {
      'shipping': 'delivery',
      'payment': 'credit_card',
      'subtotal': price,
      'freight': 60,
      'total': price + 60,
      'recipient': {
        'name': recipientName.value,
        'phone': recipientHp.value,
        'email': recipientEmail.value,
        'address': recipientAddress.value,
        'time': time,
      },
      'list': productList,
    };

    let header = {};
    // if user is logged in and has token
    if (token !== '') {
      header = {
        'Content-Type': 'application/json',
        'authorization': token,
      };
    } else {
      header = {
        'Content-Type': 'application/json',
      };
    }

    fetch('/order/checkout', {
      method: 'POST',
      body: JSON.stringify({
        'prime': result.card.prime,
        'order': data,
      }),
      headers: header,
    }).then((res) => {
      window.localStorage.clear();
      window.location.replace('/thankyou.html');
    }).catch((err) => {
      console.log('Error:', err);
    });
  });
}

/**
 *
 * @param {*} selector
 */
function setNumberFormGroupToError(selector) {
  $(selector).addClass('has-error');
  $(selector).removeClass('has-success');
}

/**
 *
 * @param {*} selector
 */
function setNumberFormGroupToSuccess(selector) {
  $(selector).removeClass('has-error');
  $(selector).addClass('has-success');
}

/**
 *
 * @param {*} selector
 */
function setNumberFormGroupToNormal(selector) {
  $(selector).removeClass('has-error');
  $(selector).removeClass('has-success');
}

/**
 *
 * @param {*} selector
 */
function forceBlurIos() {
  if (!isIos()) {
    return;
  }
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  // Insert to active element to ensure scroll lands somewhere relevant
  document.activeElement.prepend(input);
  input.focus();
  input.parentNode.removeChild(input);
}

/**
 *
 * @return {*}
 */
function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};
