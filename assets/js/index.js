const resultsContainer = document.getElementById('results');
const resultsTable = document.getElementById('resultsTable');


function getStructures() {
  var selectedDepartment = document.getElementById('department').value;
  var selectedType = document.getElementById('type').value;
  fetchStructures(selectedDepartment, selectedType);
}

function fetchStructures(selectedDepartment, selectedType) {
  loadingPlaceholder(true);
  fetch("https://api.airtable.com/v0/app71fe0Ff06gsUXD/tblTGnxVLmNNpxRIH?sort%5B0%5D%5Bfield%5D=postcode&sort%5B0%5D%5Bdirection%5D=asc&sort%5B1%5D%5Bfield%5D=name&sort%5B1%5D%5Bdirection%5D=asc", {headers: { Authorization: 'Bearer keyEgsODRGeMoFEqh' }})
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      resultsTable.innerHTML = '';
      lookUpDatabase(selectedDepartment, selectedType, value.records);
      loadingPlaceholder(false);
      collapse();
    })
    .catch(function(err) {
    });
}

function lookUpDatabase(selectedDepartment, selectedType, structures) {
  let filteredStructures = []
  if (selectedDepartment != "ALL" && selectedType != "ALL") {
    structures.forEach((structure) => {
      if (structure.fields.postcode.slice(0,2) == selectedDepartment) {
        if (structure.fields.structure_class.includes(selectedType)) {
          filteredStructures.push(structure);
        }
      }
    })
  } else if (selectedDepartment == "ALL" && selectedType != "ALL") {
    structures.forEach((structure) => {
      if (structure.fields.structure_class.includes(selectedType)) {
        filteredStructures.push(structure);
      }
    })
  } else if (selectedDepartment != "ALL" && selectedType == "ALL") {
    structures.forEach((structure) => {
      if (structure.fields.postcode.slice(0,2) == selectedDepartment) {
        filteredStructures.push(structure);
      }
    })
  } else {
    structures.forEach((structure) => {
      filteredStructures.push(structure);
    })
  }
  if (filteredStructures.length > 0) {
    filteredStructures.forEach((filteredStructure) => { appendResult(filteredStructure); })
  } else {
    appendNoResult();
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

function appendNoResult() {
  let noResultContent = document.createElement('span');
  noResultContent.className = 'text-center'
  noResultContent.innerHTML = `<h1><i class="fa-solid fa-face-meh-blank text-primary"></i></h1> <h3>Uh oh, il semblerait qu'aucun résultat ne corresponde à votre recherche</h3>`;
  resultsTable.appendChild(noResultContent);
}

function loadingPlaceholder(status) {
  if (status) {
    let loadingPlaceholder = `<div class="loader"></div>`
    document.getElementById('loading').innerHTML = loadingPlaceholder;
  } else {
    document.getElementById('loading').innerHTML = '';
  }
}

function collapse() {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}