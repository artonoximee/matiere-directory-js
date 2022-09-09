const resultsContainer = document.getElementById('results');
const resultsList = document.getElementById('resultsList');


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
      resultsList.innerHTML = '';
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
  let structureContent = document.createElement('div');
  structureContent.className = "card border border-1 border-secondary text-bg-dark mt-4"
  structureContent.innerHTML = 
    `<div class="card-body">
      <div class="row align-items-end mt-2">
        <div class="col-md-6 col-sm-12">
          <h3>${structure.fields.name}</h5>
        </div>
        <div class="col-md-4 col-sm-12">
          <h2 class="badge text-bg-light">${structure.fields.structure_class}</h2>
        </div>
        <div class="col-md-2 col-sm-12 text-md-end text-sm-start">
          <h5>${structure.fields.postcode}, ${structure.fields.city}</h5>
        </div>
      </div>
      <p class="text-bg-dark mt-2">${structure.fields.description}</p>
      <div class="row">
        <div class="col-md-6 col-sm-12 mt-2">
          <a href="${structure.fields.website}" target="_blank" class="btn btn-sm btn-outline-light">
          <i class="fa-solid fa-globe"></i> ${structure.fields.website}
          </a>
        </div>
        <div class="col-md-4 col-sm-6 mt-2">
          <a href="mailto:${structure.fields.email}" target="_blank" class="btn btn-sm btn-outline-light">
            <i class="fa-solid fa-envelope"></i> ${structure.fields.email}
          </a>
        </div>
        <div class="col-md-2 col-sm-6 mt-2 text-md-end text-sm-start">
          <a href="${structure.fields.facebook_url}" target="_blank" class="btn btn-sm btn-outline-light"><i class="fa-brands fa-facebook"></i></a>
          <a href="${structure.fields.instagram_url}" target="_blank" class="btn btn-sm btn-outline-light"><i class="fa-brands fa-instagram"></i></a>
          <a href="${structure.fields.twitter_url}" target="_blank" class="btn btn-sm btn-outline-light"><i class="fa-brands fa-twitter"></i></a>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 mt-3">
          <i class="fa-solid fa-location-dot"></i> ${structure.fields.address}, ${structure.fields.postcode}, ${structure.fields.city}
        </div>
        <div class="col-md-6 col-sm-12 mt-3">
          <i class="fa-solid fa-phone"></i> ${structure.fields.telephone}
        </div>
      </div>
    </div>`;
  resultsList.appendChild(structureContent);
}

function appendNoResult() {
  let noResultContent = document.createElement('span');
  noResultContent.className = 'text-center text-light'
  noResultContent.innerHTML = `<h1><i class="fa-solid fa-face-meh-blank text-secondary"></i></h1> <h3>Uh oh, il semblerait qu'aucun résultat ne corresponde à votre recherche</h3>`;
  resultsList.appendChild(noResultContent);
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