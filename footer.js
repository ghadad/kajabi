$( document ).ready(function() {
  $("footer .link-list").each(function() {
    console.log($(this).remove());
  });
console.log($footerLinks) ;
});