const resultsContainer = document.getElementById('results');
const resultsTable = document.getElementById('resultsTable');


function getStructures() {
  var selectedDepartment = document.getElementById('department').value;
  var selectedType = document.getElementById('type').value;
  fetchStructures(selectedDepartment, selectedType);
}

function fetchStructures(selectedDepartment, selectedType) {
  loadingPlaceholder(true);
  fetch("https://api.airtable.com/v0/app71fe0Ff06gsUXD/structures", {headers: { Authorization: 'Bearer keyEgsODRGeMoFEqh' }})
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      resultsTable.innerHTML = '';
      tableHeaders();
      lookUpDatabase(selectedDepartment, selectedType, value.records);
      loadingPlaceholder(false);
      // console.log(value);
    })
    .catch(function(err) {
    });
}

function lookUpDatabase(selectedDepartment, selectedType, structures) {
  if (selectedDepartment != "ALL" && selectedType != "ALL") {
    structures.forEach((structure) => {
      if (structure.fields.postcode.slice(0,2) == selectedDepartment) {
        if (structure.fields.structure_class.includes(selectedType)) {
          appendResult(structure);
        }
      }
    })
  } else if (selectedDepartment == "ALL" && selectedType != "ALL") {
    structures.forEach((structure) => {
      if (structure.fields.structure_class.includes(selectedType)) {
        appendResult(structure);
      }
    })
  } else if (selectedDepartment != "ALL" && selectedType == "ALL") {
    structures.forEach((structure) => {
      if (structure.fields.postcode.slice(0,2) == selectedDepartment) {
        appendResult(structure);
      }
    })
  } else {
    structures.forEach((structure) => {
      appendResult(structure);
    })
  }
}

function appendResult(structure) {
  let structureContent = document.createElement('tbody');
  structureContent.innerHTML = 
    `<th scope="row" class="w-25">${structure.fields.name}</th>
    <td class="w-25">${structure.fields.structure_class.join(' ')}</td>
    <td class="w-25">${structure.fields.postcode}</td>
    <td class="w-25">${structure.fields.city}</td>`;
  resultsTable.appendChild(structureContent);
}

function tableHeaders(){
  const tableHeaders = 
    `<tr>
      <th scope="col">Nom</th>
      <th scope="col">Type de structure</th>
      <th scope="col">Code postal</th>
      <th scope="col">Ville</th>
    </tr>`;
  const tableHeadersContent = document.createElement('thead');
  tableHeadersContent.innerHTML = tableHeaders;
  resultsTable.appendChild(tableHeadersContent);
}

function loadingPlaceholder(status) {
  if (status) {
    let loadingPlaceholder = `<div class="loader"></div>`
    document.getElementById('loading').innerHTML = loadingPlaceholder;
  } else {
    document.getElementById('loading').innerHTML = '';
  }
}