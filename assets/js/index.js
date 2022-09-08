fetch("https://api.airtable.com/v0/app71fe0Ff06gsUXD/structures", {headers: { Authorization: 'Bearer keyEgsODRGeMoFEqh' }})
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    document.getElementById("test").innerHTML = value;
    console.log(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });