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
      document.getElementById("test").innerHTML = value.records[0].fields.postcode;
      console.log(value);
    })
    .catch(function(err) {
    });
}