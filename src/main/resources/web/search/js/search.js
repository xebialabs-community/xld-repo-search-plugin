/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
    if (m == "{{") { return "{"; }
    if (m == "}}") { return "}"; }
    return args[n];
  });
};

function searchForType() {
  p1 = $('#searchType').val();
  p2 = $('#searchParent').val();
  p3 = $('#searchAncestor').val();
  p4 = $("#searchForProperties").val();
  $.ajax({
    beforeSend: function(xhr) {
      var base64 = parent.getAuthToken();
      xhr.setRequestHeader("Authorization", base64);
    },
    crossDomain: true,
    data: '{"searchForProperties":' + '"{0}"'.format(p4) +'}',
    dataType: "json",
    headers: {"Content-Type": "application/json"},
    method: "POST",
    processData: false,
    url: "/api/extension/search/searchForType?p1=" + p1 + "&p2=" + p2 + "&p3=" + p3,
    success: function(data) {
      $("#searchResults").children("thead").empty();
      $("#searchResults").children("tbody").empty();
      $.each(data.entity, function(idx, val) {
        if (idx == 0) {
          headerRow = '<tr>';
          for (j = 0; j < val.length; j ++) {
            headerRow += '<th><div class="xldsrch-wide-column">{0}</div></th>'.format(val[j]);
          }
          headerRow += '</tr>'
          $("#searchResults").children("thead").append(headerRow);
        } else {
          dataRow = '<tr>'
          for (j = 0; j < val.length; j++) {
            dataRow += '<td>{0}</td>'.format(val[j]);
          }
          dataRow += '</tr>'
          $("#searchResults").children("tbody").append(dataRow);
        }
      })
    },
    error: function(xhr, status, error) {
      alert(xhr.responseText);
    }
  });
}

function refresh() {
    $("#searchType").val("");
    $("#searchParent").val("");
    $("#searchAncestor").val("");
    $("#searchForProperties").val("");
    $("#searchResults").children("thead").empty();
    $("#searchResults").children("tbody").empty();
}
