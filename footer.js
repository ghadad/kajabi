$(document).ready(function () {

  var locationParams  = new URLSearchParams(location.search);

  var  affref = locationParams.get("ref");
  if(affref) {
      $.cookie("affref", affref, { expires : 20 });
  }
  affref = $.cookie("affref");
  
    if(affref) {
        $( "a[href*='/app.icount.co.il/'" ).on("click", function (e) {
              var url = new URL($(this).attr("href"));
              var params = new URLSearchParams(url.search);
              params.set("ipn_url",'https://kajabi.vercel.app/api/ipn?affref=' +affref);
              $(this).attr("href", url.pathname + '?' + params.toString()); // change link href
              $(this).trigger("click"); 
              return false;
        });
  }

  var lists = $("footer .link-list");
  if (lists.length > 1) {
    $("footer").show();
    return;
  }
  $("footer .link-list").hide();

  var newLists = [];
  for (var e of $footerLinks) {
    newLists.push(e.html)
  }

  $("footer").show();

  $("footer .container.footer__container").append(newLists.join(''))

  $('.blog-listing__more').html('המשיכו לקרוא ...');

});

