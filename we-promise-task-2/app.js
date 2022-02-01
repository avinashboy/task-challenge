// Url
const url = "https://picsum.photos/v2/list?page=2&limit=9";
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
    creatingCard(data, root);
  })
  .catch((error) => {
    console.log(error);
  });

// Creating card
function creatingCard(payload, wrapper) {
  // Looping the data array
  payload.forEach((Element) => {
    console.log("Element.url:", Element.url);
    // Creating the div element
    let card = document.createElement("div");
    card.setAttribute("class", "col-sm mt-2 mb-2");
    card.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${Element.download_url}" class="card-img-top" width="200px" height="250px" alt="${Element.id}">
    <div class="card-body">
      <h5 class="card-title">${Element.author}</h5>
      <a href="${Element.download_url}" class="btn btn-primary" download >Download Image</a>
    </div>
  </div> 
    `;
    // Appending the div element to the main element
    wrapper.append(card);
  });
}
