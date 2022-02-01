// Url
const url = "https://freegeoip.app/json/";
// Get the dom element
const root = document.getElementById("root");

// Here using the fetch function
fetch(url)
  .then((res) => {
    // Return the data
    return res.json();
  })
  .then((data) => {
    // function call
    DisplayInfo(data, root);
  })
  .catch((error) => {
    console.log(error);
  });

// Display the data
function DisplayInfo(payload, wrapper) {
  // Object destructuring
  const { city, ip, region_name, latitude, longitude, country_name } = payload;
  //   Creating a div element
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="p-5 mb-4 bg-light rounded-3">
  <div class="container-fluid py-5">
    <h1 class="display-5 fw-bold">Your ip-address</h1>
    <p class="col-md-12 fs-4 text-capitalize">ip: ${ip}</p>
    <p class="col-md-12 fs-4 text-capitalize"> city: ${city}</p>
    <p class="col-md-12 fs-4 text-capitalize"> longitude: ${longitude} & latitude: ${latitude}</p>
    <p class="col-md-12 fs-4 text-capitalize"> State: ${region_name}</p>
    <p class="col-md-12 fs-4 text-capitalize"> country: ${country_name}</p>
  </div>
</div>
  `;
  // Appending the div element to the main element
  wrapper.append(div);
}
