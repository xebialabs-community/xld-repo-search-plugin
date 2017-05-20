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
  $.ajax({
    datatype: "json",
    url: "/api/extension/search/searchForType?p1=" + p1 + "&p2=" + p2 + "&p3=" + p3,
    crossDomain: true,
    beforeSend: function(xhr) {
      var base64 = parent.getAuthToken();
      xhr.setRequestHeader("Authorization", base64);
    },
    success: function(data) {
      $("#searchResults").children("thead").empty();
      $("#searchResults").children("tbody").empty();
      $("#searchResults").children("thead").append(
        '<tr><th><div class="xldsrch-wide-column">Configuration Item Id</div></th>' + 
            '<th><div class="xldsrch-wide-column">Initial Heap Size</div></th>' + 
            '<th><div class="xldsrch-wide-column">Maximum Heap Size</div></th></tr>');
      $.each(data.entity, function(idx, val) {
        $("#searchResults").append('<tr><td>' + val['c1'] + '</td><td>' + val['c2']+ '</td><td>' + val['c3']  + '</td></tr>');
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
    $("#searchResults").children("thead").empty();
    $("#searchResults").children("tbody").empty();
}
