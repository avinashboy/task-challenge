const btn = document.getElementById("btn");
const root = document.getElementById("root");

btn.addEventListener("click", val);

function val() {
  let arrFood = [];
  let errorCount = 0;
  let fname = document.contactForm.fname.value;
  let lname = document.contactForm.lname.value;
  let address = document.contactForm.address.value;
  let gender = document.contactForm.gender.value;
  let food = document.querySelectorAll(".checkCheckbox");
  let state = document.contactForm.state.value;
  let country = document.contactForm.country.value;
  let pincode = document.contactForm.pincode.value;

  // fname
  if (fname == "") {
    errorCount += 1;
    printError("fname", "Please enter your name");
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(fname) === false) {
      printError("fname", "Please enter name only");
      errorCount += 1;
    }
  }

  // lname
  if (lname == "") {
    printError("lname", "Please enter your name");
    errorCount += 1;
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(lname) === false) {
      errorCount += 1;
      printError("lname", "Please enter name only");
    }
  }

  // choose
  if (gender === "Select") {
    errorCount += 1;
    printError("gender", "Please choose the gender");
  }

  // choose2
  food.forEach((el) => {
    if (el.checked) {
      arrFood.push(el.value);
    }
  });

  if (!arrFood.length === 2 || arrFood.length < 2) {
    errorCount +=1
    printError("food", "Please Select two food");
  }

  // address
  if (address == "") {
    errorCount += 1;
    printError("address", "Please enter the address");
  }

  // state
  if (state == "") {
    errorCount += 1;
    printError("state", "Please choose the state");
  }

  // country
  if (country == "") {
    errorCount += 1;
    printError("country", "Please choose the country");
  }

  // pincode
  if (pincode == "") {
    errorCount += 1;
    printError("pincode", "Please choose the pincode");
  } else {
    var regex = /^[0-9]{1,6}\d+$/;
    if (regex.test(pincode) === false) {
      errorCount += 1;
      printError("pincode", "Please enter number only");
    }
  }

  let payload = {
    firstName: fname,
    lastName: lname,
    address,
    gender,
    food: arrFood.join(","),
    state,
    country,
    pincode,
  };

  if (errorCount === 0) {
    root.innerHTML = " ";
    createTable(payload);
  }
}

function createTable(payload) {
  const div = document.createElement("div");
  div.setAttribute("class", " mt-3 py-3");
  let createTable = document.createElement("table");
  createTable.setAttribute(
    "class",
    "table table-striped table-hover mt-2 mb-5 table-sm"
  );
  let tHead = createTable.createTHead();
  let tBody = createTable.createTBody();
  let hRow = document.createElement("tr");
  let th = document.createElement("th");
  th.setAttribute("scope", "col");
  th.innerHTML = "S.no";
  hRow.appendChild(th);
  th = document.createElement("th");
  th.setAttribute("scope", "col");
  th.innerHTML = "Name";
  hRow.appendChild(th);
  tHead.append(hRow);

  for (const property in payload) {
    // console.log(`${property}: ${payload[property]}`);
    let row = document.createElement("tr");

    td = document.createElement("td");
    td.innerHTML = property;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = payload[property];
    row.appendChild(td);
    tBody.append(row);
  }
  createTable.append(tHead, tBody);
  div.append(createTable);

  root.append(div);
}

function printError(elemId, hintMsg) {
  console.log("hintMsg:", hintMsg);
  console.log("elemId:", elemId);
  document.getElementById(`${elemId}_error`).innerHTML = hintMsg;
  $(`#${elemId}`).addClass("is-invalid");
  setTimeout(() => {
    document.getElementById(`${elemId}_error`).innerHTML = "";
    $(`#${elemId}`).removeClass("is-invalid");
  }, 3000);
}
