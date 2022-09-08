const resultsContainer = document.getElementById('results');
const resultsTable = document.getElementById('resultsTable');

function getStructures() {
  var selectedDepartment = document.getElementById('department').value;
  // document.getElementById("test").innerHTML = selectedDepartment;
  fetchStructures(selectedDepartment);
}

function fetchStructures(selectedDepartment) {
  fetch("https://api.airtable.com/v0/app71fe0Ff06gsUXD/structures", {headers: { Authorization: 'Bearer keyEgsODRGeMoFEqh' }})
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      resultsTable.innerHTML = '';
      tableHeaders();
      lookUpDepartment(selectedDepartment, value.records);
      console.log(value);
    })
    .catch(function(err) {
    });
}

function lookUpDepartment(selectedDepartment, structures) {
  structures.forEach((structure) => {
    if (structure.fields.postcode.slice(0,2) == selectedDepartment) {
      appendResult(structure);
    }
  })
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