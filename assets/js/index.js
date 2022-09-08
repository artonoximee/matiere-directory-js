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
      lookUpDepartment(selectedDepartment, value.records);
      console.log(value);
    })
    .catch(function(err) {
    });
}

function lookUpDepartment(selectedDepartment, structures) {
  structures.forEach((structure) => {
    if (structure.fields.postcode == selectedDepartment) {
      document.getElementById("test").innerHTML = structure.fields.name;
    }
  })
}