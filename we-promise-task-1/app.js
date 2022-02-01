// Url
const url = "https://animechan.vercel.app/api/quotes";
// Get the dom element
const container = document.getElementById("root");

// Here using the fetch function
fetch(url)
  .then((res) => {
    // Return the data
    return res.json();
  })
  .then((data) => {
    // Function call
    createTable(data, container);
  })
  .catch((error) => {
    console.log(error);
  });

//  Displaying the table
function createTable(payload, wrapper) {
  // Create the h2 tag
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "fw-normal text-info");
  h2.innerText = url.split("/").pop();
  // Create the div element
  const div = document.createElement("div");
  div.setAttribute("class", " mt-3 py-3");
  // Creating the table
  let createTable = document.createElement("table");
  createTable.setAttribute("class", "table  table-hover mt-2 mb-5 table-sm");
  /* Here we are creating the table head and table body */
  let tHead = createTable.createTHead();
  let tBody = createTable.createTBody();
  let hRow = document.createElement("tr");
  let th = document.createElement("th");
  // Append the row in table head
  th.setAttribute("scope", "col");
  th.innerHTML = "S.no";
  hRow.appendChild(th);
  th = document.createElement("th");
  th.setAttribute("scope", "col");
  th.innerHTML = "Anime";
  hRow.appendChild(th);
  th = document.createElement("th");
  th.setAttribute("scope", "col");
  th.innerHTML = "Character";
  hRow.appendChild(th);
  th = document.createElement("th");
  th.setAttribute("scope", "col");
  th.innerHTML = "Quote";
  hRow.appendChild(th);
  tHead.append(hRow);

  // Here looping the payload
  payload.forEach((element, index) => {
    let row = document.createElement("tr");

    let td = document.createElement("td");
    td.innerHTML = index + 1;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = element.anime;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = element.character;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = element.quote;
    row.appendChild(td);
    tBody.append(row);
  });

  createTable.append(tHead, tBody);
  div.append(h2, createTable);

  // Appending the div element to the main element
  wrapper.append(div);
}
