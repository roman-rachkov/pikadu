let add = (a,b) => a+b
console.log(add(3,2));

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.datepicker');
//     var instances = M.Datepicker.init(elems);
// });

jQuery(document).ready(function($){
    $('.datepicker').datepicker();
});