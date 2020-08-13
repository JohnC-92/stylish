const host = window.location.hostname;
const socket = io(`https://${host}`);

// const socket = io('http://localhost:3000');
// let i = 1000;

// listen from server
socket.on('dataUpdate', function(data) {
  console.log(data);
  // get data and render when database is renewed
  fetchData();
});

// function to get data from api
fetchData();

/**
 * Function to fetch data from server and render it on page
 */
function fetchData() {
  const protocol = window.location.protocol;
  const apiURL = `${protocol}//${host}/api/1.0/order/dashboard`;
  // const apiURL = `${protocol}//${host}:3000/api/1.0/order/dashboard`;
  fetch(apiURL)
      .then((res) => res.json())
      .then((myJson) => {
        dashboard(myJson);
      });
}

/**
 * Function to plot interactive dashboard
 * @param {*} data
 */
function dashboard(data) {
  // i += 2000;
  // Calculate Total
  const dom = document.getElementById('number');
  dom.innerHTML = 'Total Revenue: ' + data.total;
  // dom.innerHTML = 'Total Revenue: ' + data.total + ` ${i}`;

  // DrawProductsDivideByColor
  const colorData = [{
    values: data.colorData.map((x) => x.qty),
    labels: data.colorData.map((x) => x.color_name),
    marker: {
      colors: data.colorData.map((x) => x.color_code),
    },
    type: 'pie',
  }];
  const layoutColor = {
    title: {
      text: 'Product sold percentage in different colors',
    },
    height: 350,
  };
  Plotly.newPlot('pie', colorData, layoutColor);

  // DrawProductsInPriceRange
  arr = [];
  for (let i = 0; i < data.arr.length; i++) {
    arr = arr.concat(Array(data.arr[i].qty).fill(data.arr[i].price));
  }
  const trace = {
    // x: data.arr,
    x: arr,
    type: 'histogram',
  };
  const layoutHist = {
    title: {
      text: 'Product sold quantity in different price range',
    },
    xaxis: {
      title: {
        text: 'Price Range',
      },
    },
    yaxis: {
      title: {
        text: 'Quantity',
      },
    },
  };
  const dataHist = [trace];
  Plotly.newPlot('histogram', dataHist, layoutHist);

  // DrawTop5ProductsDividedBySize
  const ids = data.ids.map((id) => 'product ' + id);
  const sizeData = [
    {x: ids, y:[], name: 'L', type: 'bar'},
    {x: ids, y:[], name: 'M', type: 'bar'},
    {x: ids, y:[], name: 'S', type: 'bar'},
  ];

  data.ranked.map((d) => {
    sizeData[0].y.push(d.L);
    sizeData[1].y.push(d.M);
    sizeData[2].y.push(d.S);
  });

  const layout = {
    barmode: 'stack',
    title: {
      text: 'Quantity of top 5 sold products in different sizes',
    },
    yaxis: {
      title: {
        text: 'Quantity',
      },
    },
  };
  Plotly.newPlot('bar', sizeData, layout);
}
