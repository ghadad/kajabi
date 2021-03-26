$( document ).ready(function() {

  var lists = $("footer .link-list");
  if(lists.length>1) {
    lists.show();
    return  ; 
  }
  
  lists.each(function() {
    //console.log($(this).remove());
   // $(this).html($footerLinks[0].html)
  });
console.log($footerLinks) ;
});