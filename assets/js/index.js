const resultsContainer = document.getElementById('results');
const resultsList = document.getElementById('resultsList');

getDepartments();

function getDepartments() {
  fetch('/assets/js/departments.json')
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      addDepartmentsToSelector(value);
      
    })
    .catch(function(err) {
    });
}

function addDepartmentsToSelector(value) {
  console.log(value.departments[0].num)
  //let selectorDepartment = document.getElementById('department');
  /*departments.forEach((department) => {
    console.log(department);
    //let opt = document.createElement('option');
    //opt.value = 
  })*/
}



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
  let card = document.createElement('div');
  card.className = "card border border-1 border-secondary text-bg-dark mt-4"

  let cardBody = document.createElement('div');
  cardBody.className = "card-body";
  card.appendChild(cardBody);

  let row1 = document.createElement('div')
  row1.className = "row align-items-end mt-2";
  cardBody.appendChild(row1);

  let row1col1 = document.createElement('div');
  row1col1.className = "col-md-6 col-sm-12";
  let row1col2 = document.createElement('div');
  row1col2.className = "col-md-4 col-sm-12";
  let row1col3 = document.createElement('div');
  row1col3.className = "col-md-2 col-sm-12 text-md-end text-sm-start";
  row1.appendChild(row1col1);
  row1.appendChild(row1col2);
  row1.appendChild(row1col3);

  let structureName = document.createElement('h3');
  structureName.innerHTML = `<b>${structure.fields.name}</b>`;
  row1col1.appendChild(structureName);

  structure.fields.structure_class.forEach((structure_class) => {
    let structureClass = document.createElement('h2');
    structureClass.className = "badge text-bg-light me-2";
    structureClass.innerHTML = structure_class;
    row1col2.appendChild(structureClass);
  })
  
  let postCodeAndCity = document.createElement('h5');
  postCodeAndCity.innerHTML = `${structure.fields.postcode}, ${structure.fields.city}`;
  row1col3.appendChild(postCodeAndCity);

  let description = document.createElement('p');
  description.className = "text-bg-dark mt-2";
  description.innerHTML = structure.fields.description;
  cardBody.appendChild(description);

  let row2 = document.createElement('div');
  row2.className = "row";
  cardBody.appendChild(row2);

  let row2col1 = document.createElement('div');
  row2col1.className = "col-md-6 col-sm-12 mt-2";
  let row2col2 = document.createElement('div');
  row2col2.className = "col-md-4 col-sm-6 mt-2";
  let row2col3 = document.createElement('div');
  row2col3.className = "col-md-2 col-sm-6 mt-2 text-md-end text-sm-start";
  row2.appendChild(row2col1);
  row2.appendChild(row2col2);
  row2.appendChild(row2col3);

  if (structure.fields.website) {
    let websiteButton = document.createElement('a');
    websiteButton.className = "btn btn-sm btn-outline-light";
    websiteButton.setAttribute("target", "_blank");
    websiteButton.href = structure.fields.website;
    websiteButton.innerHTML = `<i class="fa-solid fa-globe"></i> ${structure.fields.website}`;
    row2col1.appendChild(websiteButton);
  }

  if (structure.fields.email) {
    let emailButton = document.createElement('a');
    emailButton.className = "btn btn-sm btn-outline-light";
    emailButton.href = "mailto:" + structure.fields.email;
    emailButton.innerHTML = `<i class="fa-solid fa-envelope"></i> ${structure.fields.email}`;
    row2col2.appendChild(emailButton);
  }

  if (structure.fields.facebook_url) {
    let facebookButton = document.createElement('a');
    facebookButton.className = "btn btn-sm btn-outline-light me-2";
    facebookButton.setAttribute("target", "_blank");
    facebookButton.href = structure.fields.facebook_url;
    facebookButton.innerHTML = `<i class="fa-brands fa-facebook"></i>`;
    row2col3.appendChild(facebookButton);
  }
  
  if (structure.fields.instagram_url) {
    let instagramButton = document.createElement('a');
    instagramButton.className = "btn btn-sm btn-outline-light me-2";
    instagramButton.setAttribute("target", "_blank");
    instagramButton.href = structure.fields.instagram_url;
    instagramButton.innerHTML = `<i class="fa-brands fa-instagram"></i>`;
    row2col3.appendChild(instagramButton);
  }

  if (structure.fields.twitter_url) {
    let twitterButton = document.createElement('a');
    twitterButton.className = "btn btn-sm btn-outline-light";
    twitterButton.setAttribute("target", "_blank");
    twitterButton.href = structure.fields.twitter_url;
    twitterButton.innerHTML = `<i class="fa-brands fa-twitter"></i>`;
    row2col3.appendChild(twitterButton);
  }

  let row3 = document.createElement('div');
  row3.className = "row";
  cardBody.appendChild(row3);

  let row3col1 = document.createElement('div');
  row3col1.className = "col-md-6 col-sm-12 mt-3";
  let row3col2 = document.createElement('div');
  row3col2.className = "col-md-6 col-sm-12 mt-3";
  row3.appendChild(row3col1);
  row3.appendChild(row3col2);
  
  if (structure.fields.address) {
    let address = document.createElement('span');
    address.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${structure.fields.address}, ${structure.fields.postcode}, ${structure.fields.city}`;
    row3col1.appendChild(address);
  }

  if (structure.fields.telephone) {
    let telephone = document.createElement('span');
    telephone.innerHTML = `<i class="fa-solid fa-phone"></i> ${structure.fields.telephone}`;
    row3col2.appendChild(telephone);
  }

  resultsList.appendChild(card);
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