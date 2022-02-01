const url =
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";

let current_page = 1,
  previous_page = 0,
  next_page = 1,
  max_page = 0,
  rows = 10,
  data;

const root = document.getElementById("root");
const pageNumber = document.getElementById("pageNumber");
const selectRow = document.getElementById("selectRow");

axios.get(url).then((res) => {
  data = res.data;
  displayTable(res.data, root, rows, current_page);
  setUpPagination(res.data, rows, pageNumber);
});

function setUpPagination(data, rows_per_page, wrapper) {
  wrapper.innerHTML = "";
  let pageCount = Math.ceil(data.length / rows_per_page);
  max_page = pageCount;
  let ul = document.createElement("ul");
  ul.setAttribute("class", "pagination");
  let previous_li = document.createElement("li");
  previous_li.setAttribute("class", "page-item disabled checkMe");
  previous_li.setAttribute("onclick", "previous_fun()");
  let previous_span = btnPagination("Previous");
  previous_li.append(previous_span);
  ul.append(previous_li);
  for (let index = 1; index <= pageCount; index++) {
    let li = document.createElement("li");
    li.setAttribute("class", "page-item");
    if (current_page === index) li.classList.add("active");
    li.addEventListener("click", () => {
      previous_page = +index - 1;
      current_page = index;
      next_page = +index + 1;
      change_btn();
      displayTable(data, root, rows, current_page);
      let current_span = document.querySelector(
        "#pageNumber > ul > li.page-item.active"
      );
      console.log("current_span:", current_span);
      if (current_span.classList.contains("active"))
        current_span.classList.remove("active");

      li.classList.add("active");
    });
    let span = btnPagination(index);
    li.append(span);
    ul.append(li);
  }
  let next_li = document.createElement("li");
  next_li.setAttribute("class", "page-item next_page");
  next_li.setAttribute("onclick", "next_fun()");
  let next_span = btnPagination("Next");
  next_li.append(next_span);
  ul.append(next_li);
  wrapper.append(ul);
}

function change_btn() {
  if (previous_page > 0) {
    let previous_span = document.querySelector(
      "#pageNumber > ul > li.page-item.checkMe"
    );
    if (previous_span.classList.contains("disabled"))
      previous_span.classList.remove("disabled");
  }

  let next_span = document.querySelector(
    "#pageNumber > ul > li.page-item.next_page"
  );
  console.log('next_page:', next_page)
  if (next_page > max_page) {
    
    next_span.classList.add("disabled");
  } else if (next_span.classList.contains("disabled")) {
    next_span.classList.remove("disabled");
  }

  if (previous_page === 0) {
    let previous_span = document.querySelector(
      "#pageNumber > ul > li.page-item.checkMe"
    );
    previous_span.classList.add("disabled");
  }
}

function next_fun() {
  change_btn();
  console.log("next_page:", next_page);
  if (next_page <= max_page) {
    let temp = next_page + 1;
    displayTable(data, root, rows, next_page);
    next_page++;
    let current_span = document.querySelector(
      "#pageNumber > ul > li.page-item.active"
    );
    if (current_span.classList.contains("active"))
      current_span.classList.remove("active");
    let previous_active = document.querySelector(
      `#pageNumber > ul > li:nth-child(${temp})`
    );
    previous_active.classList.add("active");
  }

  if (next_page > max_page) {
    let next_span = document.querySelector(
      "#pageNumber > ul > li.page-item.next_page"
    );
    next_span.classList.add("disabled");
  }
  previous_page = next_page - 1;
}

function previous_fun() {
  change_btn();
  if (previous_page > 0) {
    let temp = previous_page + 1;
    next_page = previous_page + 1
    displayTable(data, root, rows, previous_page);
    previous_page--;
    let current_span = document.querySelector(
      "#pageNumber > ul > li.page-item.active"
    );
    if (current_span.classList.contains("active"))
      current_span.classList.remove("active");

    let previous_active = document.querySelector(
      `#pageNumber > ul > li:nth-child(${temp})`
    );
    previous_active.classList.add("active");
  }

  if (previous_page === 0) {
    console.log("previous_page:", previous_page);
    let disabled_btn = document.querySelector(
      `#pageNumber > ul > li:first-child`
    );
    disabled_btn.classList.add("disabled");
  }
}

selectFunction();

function selectFunction() {
  let select = `<select
  class="form-select form-select-sm mb-5"
  onchange="select_value(this)"
  >
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  <option value="25">25</option>
  <option value="50">50</option>
  <option value="100">100</option>
  </select>`;

  let div = document.createElement("div");
  div.innerHTML = select;
  selectRow.append(div);
}

function select_value(element) {
  rows = parseInt(element.value);
  let change = document.querySelector(
    '#selectRow > div > select [value="' + rows + '"]'
  );
  change.selected = true;

  setUpPagination(data, rows, pageNumber);
  displayTable(data, root, rows, current_page);
}

function btnPagination(page) {
  let span = document.createElement("span");
  span.setAttribute("class", "page-link");
  span.setAttribute("value", page);

  span.innerText = page !== "Previous" ? page : "Previous";
  return span;
}

function displayTable(data, wrapper, rows_per_page, page) {
  console.log("page:", page);
  console.log("rows_per_page:", rows_per_page);
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  console.log("start:", start);
  let end = start + +rows_per_page;
  console.log("end:", end);
  let paginatedItems = data.slice(start, end);
  console.log("paginatedItems:", paginatedItems);
  createTable(paginatedItems, wrapper);
}

function createTable(payload, wrapper) {
  const div = document.createElement("div");
  div.setAttribute("class", " mt-3 py-3");
  let createTable = document.createElement("table");
  createTable.setAttribute("class", "table  table-hover mt-2 mb-5 table-sm");
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
  th = document.createElement("th");
  th.setAttribute("scope", "col");
  th.innerHTML = "mail";
  hRow.appendChild(th);
  tHead.append(hRow);

  payload.forEach((element) => {
    let row = document.createElement("tr");

    td = document.createElement("td");
    td.innerHTML = element.id;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = element.name;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = element.email;
    row.appendChild(td);
    tBody.append(row);
  });

  createTable.append(tHead, tBody);
  div.append(createTable);

  wrapper.append(div);
}
