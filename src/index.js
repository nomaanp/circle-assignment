import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
const data = require('../data.json');
let ageFilter = 'asc';
let genderFilter = 'asc';
let firstFilter = 'asc';
let lastFilter = 'asc';
let emailFilter = 'asc';
function component() {
  const element = document.createElement('div');

  const table = createTable();
  // Lodash, currently included via a script, is required for this line to work
  // element.innerHTML = _.join(['Hello', 'webpack2'], ' ');

  element.appendChild(searchBox());
  element.appendChild(table);
  buildTable(data, table);
  element.classList.add('container');
  element.classList.add('p-3');

  return element;
}

function searchBox() {
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('mb-2');

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'form-control');
  input.setAttribute('id', 'searchBox');
  input.setAttribute('placeholder', 'Please enter to search...');
  input.oninput = filterResults;

  inputContainer.appendChild(input);
  return inputContainer;
}

function filterData() {
  const searchText = document.getElementById('searchBox');
  let filteredData = data;
  if (searchText.value.length > 0) {
    const searchValue = searchText.value.toLowerCase();
    filteredData = data.filter(
      item =>
        item.name.first.toLowerCase().includes(searchValue) ||
        item.name.last.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue)
    );
  }
  return filteredData;
}

function sortAge() {
  const fData = filterData();
  fData.sort((a, b) =>
    ageFilter === 'asc' ? a.dob.age - b.dob.age : b.dob.age - a.dob.age
  );
  if (ageFilter === 'asc') {
    ageFilter = 'desc';
  } else {
    ageFilter = 'asc';
  }
  const table = document.getElementById('users-list');
  buildTable(fData, table);
}

function sortGender() {
  const fData = filterData();
  fData.sort((a, b) => {
    let comparison = 0;
    if (a.gender < b.gender) {
      comparison = 1;
    } else if (a.gender > b.gender) {
      comparison = -1;
    }

    if (genderFilter === 'asc') {
      genderFilter = 'desc';
      return comparison;
    } else {
      genderFilter = 'asc';
      return comparison * -1;
    }
  });

  const table = document.getElementById('users-list');
  buildTable(fData, table);
}

function sortFirstName() {
  const fData = filterData();
  fData.sort((a, b) => {
    /*if (firstFilter === 'asc') {
      firstFilter = 'desc';
      if (a.name.first > b.name.first) {
        return 1;
      } else if (a.name.first < b.name.first) {
        return -1;
      }
      return 0;
    } else {
      firstFilter = 'asc';
      if (a.name.first < b.name.first) {
        return 1;
      } else if (a.name.first > b.name.first) {
        return -1;
      }
      return 0;
    }*/
    if (a.name.first > b.name.first) {
      return 1;
    } else if (a.name.first < b.name.first) {
      return -1;
    }
    return 0;
  });
  const table = document.getElementById('users-list');
  buildTable(fData, table);
}

function sortLastName() {
  const fData = filterData();
  fData.sort((a, b) => {
    if (a.name.last > b.name.last) {
      return 1;
    } else if (a.name.last < b.name.last) {
      return -1;
    }
    return 0;
  });
  const table = document.getElementById('users-list');
  buildTable(fData, table);
}

function sortEmail() {
  const fData = filterData();
  fData.sort((a, b) => {
    if (a.email > b.email) {
      return 1;
    } else if (a.email < b.email) {
      return -1;
    }
    return 0;
  });
  const table = document.getElementById('users-list');
  buildTable(fData, table);
}

function filterResults() {
  const filteredData = filterData();
  const table = document.getElementById('users-list');
  buildTable(filteredData, table);
}

function createTable() {
  const table = document.createElement('table');
  table.setAttribute('id', 'users-list');
  table.setAttribute('class', 'table table-bordered table-striped');
  createTableHeader(table);
  return table;
}

function createTableHeader(table) {
  const header = table.createTHead();
  const tRow = header.insertRow(0);
  const firstNameCell = tRow.insertCell(0);
  const lastNameCell = tRow.insertCell(1);
  const emailCell = tRow.insertCell(2);
  const ageCell = tRow.insertCell(3);
  const genderCell = tRow.insertCell(4);

  let firstATag = createATag('First Name', 'javascript: void(0);');
  firstATag.onclick = sortFirstName;

  let lastATag = createATag('Last Name', 'javascript: void(0);');
  lastATag.onclick = sortLastName;

  let emailATag = createATag('Email', 'javascript: void(0);');
  emailATag.onclick = sortEmail;

  let ageATag = createATag('Age', 'javascript: void(0);');
  ageATag.onclick = sortAge;

  let genderATag = createATag('Gender', 'javascript: void(0);');
  genderATag.onclick = sortGender;

  firstNameCell.appendChild(firstATag);
  lastNameCell.appendChild(lastATag);
  emailCell.appendChild(emailATag);
  ageCell.appendChild(ageATag);
  genderCell.appendChild(genderATag);
}

function createATag(title, href) {
  let a = document.createElement('a');
  a.setAttribute('href', href);
  a.innerHTML = title;
  return a;
}

function buildTable(filteredData, table) {
  table.innerHTML = '';
  createTableHeader(table);

  const tBody = table.createTBody();

  filteredData.forEach(element => {
    const tBRow = tBody.insertRow();
    const tBCell0 = tBRow.insertCell(0);
    const tBText0 = document.createTextNode(element.name.first);
    tBCell0.appendChild(tBText0);

    const tBCell1 = tBRow.insertCell(1);
    const tBText1 = document.createTextNode(element.name.last);
    tBCell1.appendChild(tBText1);

    const tBCell2 = tBRow.insertCell(2);
    const tBText2 = document.createTextNode(element.email);
    tBCell2.appendChild(tBText2);

    const tBCell3 = tBRow.insertCell(3);
    const tBText3 = document.createTextNode(element.dob.age);
    tBCell3.appendChild(tBText3);

    const tBCell4 = tBRow.insertCell(4);
    const tBText4 = document.createTextNode(element.gender);
    tBCell4.appendChild(tBText4);
    // console.log(element);
  });
}

document.body.appendChild(component());
