let maxYear = new Date().getFullYear() + 1;
let minYear = new Date().getFullYear();

$(document).ready(function() {
  $(".modal").modal();
  $(".sidenav").sidenav();
  $("select").formSelect();
  $(".datepicker").datepicker({
    yearRange: [minYear, maxYear]
  });
  $(".timepicker").timepicker();
  $(".collapsible").collapsible();
});
