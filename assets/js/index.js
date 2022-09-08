const resultsContainer = document.getElementById('results');

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
      resultsContainer.innerHTML = '';
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
  let structureContent = document.createElement('p');
  structureContent.innerHTML = structure.fields.name;
  resultsContainer.appendChild(structureContent);
}