function IndexController() {
  this.populateTable();
}

IndexController.prototype.populateTable = function() {
  var data = [];
  var body = this.buildTableBody(data);
  document.querySelectorAll('#location-list tbody')[0].outerHTML = body;
};

IndexController.prototype.buildTableBody = function(data) {
  var body = '<tbody class="govuk-table__body">';
  for(var i = 0; i < data.length; i++)
  {
    body += '<tr class="govuk-table__row">';
      /* CREATED TIMESTAMP */
      body += '<td class="govuk-table__cell">';
        body += data[i]['Timestamp'];
      body += '</td>';

      /* ORGANISATION NAME */
      body += '<td class="govuk-table__cell">';
        body += data[i]['Organisation name(s)'];
      body += '</td>';

      /* ADDRESS LINE 1 */
      body += '<td class="govuk-table__cell">';
        body += data[i]['Address line 1'];
      body += '</td>';

      /* ADDRESS LINE 2 */
      body += '<td class="govuk-table__cell">';
        body += data[i]['Address line 2'];
      body += '</td>';

      /* TOWN / CITY */
      body += '<td class="govuk-table__cell">';
        body += data[i]['Town / City'];
      body += '</td>';

      /* County */
      body += '<td class="govuk-table__cell">';
        body += data[i]['County'];
      body += '</td>';

      /* Postcode */
      body += '<td class="govuk-table__cell">';
        body += data[i]['Postcode'];
      body += '</td>';

      /* Where is the multi faith room located in the building? (For example 6th floor, opposite meeting room 612) */
      body += '<td class="govuk-table__cell">';
        body += data[i]['Where is the multi faith room located in the building? (For example 6th floor, opposite meeting room 612)'];
      body += '</td>';

      /* Any notes or things to be aware of? */
      body += '<td class="govuk-table__cell">';
        body += data[i]['Any notes or things to be aware of?'];
      body += '</td>';
    body += '</tr>'
  }
  if (!data.length){
    body += '<tr class="govuk-table__row">';
      body += '<td class="govuk-table__cell" colspan="9">No data found</td>';
    body += '</tr>'
  }
  body += '</tbody>';
  return body;
};

(function(){
  new IndexController();
})();
