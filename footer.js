$(document).ready(function () {

  var locationParams  = new URLSearchParams(location.search);

  var  affref = locationParams.get("ref");
  if(affref) {
      $.cookie("affref", affref, { expires : 20 });
  }
  affref = $.cookie("affref");
  
    if(affref) {
        $( "a[href*='/app.icount.co.il/'" ).on("click", function (e) {
              e.preventDefault();
              var url = new URL($(this).attr("href"));
              var params = new URLSearchParams(url.search);
          //    var params = new URLSearchParams();
              //params.set("ipn_url",'https://kajabi.vercel.app/api/ipn?affref=' +affref);
              params.set("utm_nooverride",1);
              for(var key of params.keys()) {
                if(key.match(/utm/)) {
                  params.delete(key);
                }
              }
              
              //$(this).attr("href", url.origin + url.pathname + '?' + params.toString()); // change link href
              //console.log("url",url.origin + url.pathname +'?' + params.toString())

          //    $(this).trigger("click"); 
              var newUrl =  url.origin + url.pathname + '?' + params.toString();
              window.location.href = newUrl;
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

