$( document ).ready(function() {
  $("footer .link-list").each(function() {
    //console.log($(this).remove());
    $(this).html($footerLinks[0].html)
  });
console.log($footerLinks) ;
});