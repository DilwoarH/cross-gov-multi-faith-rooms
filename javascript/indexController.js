function IndexController() {
  this.locationAPI = "https://script.google.com/macros/s/AKfycbwoTjr_2JbkGxX2_k7YsVsLsHf7w4KqvDWFYDlpALSHqNbnFYsy/exec";
  this.populateTable();
  this.initTableSearch();
  nunjucks.configure('views', { autoescape: true });
}

/************************
 *    POPULATE LIST
 ************************/
IndexController.prototype.populateTable = function() {
  var _this = this;

  axios.get(this.locationAPI)
  .then(function (results) {
    console.log(results);
    _this.buildTableBody(
      document.querySelectorAll('#location-list tbody')[0],
      results.data
    );
    _this.initLinkTracking();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
};

/*
 * @todo: Use a templating engine rather than JS
 */
IndexController.prototype.buildTableBody = function(tableBody, rooms) {
  rooms = rooms.map(function(room){
    // transformData
    return {
      createdAt:          room["created_at"],
      organisationName:   room['organisation_name'],
      addressLine1:       room['address_line_1'],
      addressLine2:       room['address_line_2'],
      city:               room['town_city'],
      county:             room['county'],
      postcode:           room['postcode'],
      location:           room['room_location'],
      notes:              room['notes'],
      googleMapsURL:      'http://maps.google.com/?q='+ [
                            room['address_line_1'],
                            room['address_line_2'],
                            room['town_city'],
                            room['county'],
                            room['postcode']
                          ].join('+')
    };
  })
  .filter( Boolean )
  .sort(function(a, b) { return (a.organisationName.toLowerCase() > b.organisationName.toLowerCase()) ? 1 : -1 });

  tableBody.innerHTML = nunjucks.render('table-rows.html', { rooms: rooms });
};

IndexController.prototype.initLinkTracking = function() {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener(
      'click',
      function(event){
        if (window._analytics) {
          window._analytics.trackEvent("linkClicked", event.target.innerText, event.target.href);
        }
      },
      false
    );
  }
};

/************************
 *      SEARCH
 ************************/
IndexController.prototype.initTableSearch = function(){
  document
    .getElementById("table-search")
    .addEventListener(
      'keyup',
      this.tableSearch,
      false
    );
};

IndexController.prototype.tableSearch = function(){
  var input = document.getElementById("table-search");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("location-list");
  var tr = table.getElementsByTagName("tr");
  for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

/************************
 *      INIT
 ************************/
(function(){
  new IndexController();
})();
