/*
 * Copyright 2025 XEBIALABS
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
    if (m == "{{") { return "{"; }
    if (m == "}}") { return "}"; }
    return args[n];
  });
};

function authorize(xhr) {
    if (parent && parent.getAuthToken) {
        var base64 = parent.getAuthToken();
        xhr.setRequestHeader("Authorization", base64);
    }
}

function searchForType() {
  p1 = $('#searchType').val();
  p2 = $('#searchParent').val();
  p3 = $('#searchAncestor').val();
  p4 = $("#searchForProperties").val();
  $.ajax({
    beforeSend: authorize,
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
