//header blogs vlogs
$.getJSON('https://www.mindler.com/blog/wp-json/wp/v2/posts?_embed&per_page=2', function(data) {

    $(".products-details #header-blog").empty();

    $.each(data, function(index, element) {
        var url = element._embedded['wp:featuredmedia'][0].source_url;
        var pathArray = url.split('/');
        console.log(pathArray);
        var path = 'https://mindlerblog.imgix.net/' + pathArray[6] + '/' + pathArray[7] + '/' + pathArray[8] + '/' + pathArray[9] + '?w=337&h=168&auto=compress';
        $(".products-details #header-blog").append('<div class="blog-box"><img src="' + path + '" loading="lazy" /><p><a target="_blank" href="' + element.link + '">' + element.title.rendered + '</a></p></div>');
    });
    $(".products-details #header-blog").append('<div class="blog-box-view"><a target="_blank" href="https://www.mindler.com/blog" >View All Blogs<i class="fa fa-angle-right" style="margin-left:3px"></i></a></div>');
});

$.getJSON('https://www.mindler.com/blog/wp-json/wp/v2/posts?_embed&per_page=3', function(data) {

    $("#posts").empty();

    $.each(data, function(index, element) {


        var authorId = element.author;
        var content = element.excerpt.rendered;
        if (authorId) {
            var url = element._embedded['wp:featuredmedia'][0].source_url;

            var pathArray = url.split('/');

            var path = 'https://mindlerblog.imgix.net/' + pathArray[6] + '/' + pathArray[7] + '/' + pathArray[8] + '/' + pathArray[9] + '?w=337&h=168&auto=compress,format';



            //var url = element.thumbnail_images['goodlife-widget-photo'].url;
            //var splt = url.split('uploads');
            $("#posts").append('<div class="col-lg-4 col-md-4 col-sm-4 mb-sm-30" ><div class="blog-post"><div class="post-media"><a onclick="googleEvent("Homepage", "Blog", "Blog Feed: Image: "' + element.title.rendered + '"","");" target="_blank" href="' + element.link + '"><img src="' + path + '" class="img-responsive" loading="lazy"></a></div><div class="post-header"><h5 style="margin-bottom: 0;"><a target="_blank" href="' + element.link + '">' + element.title.rendered + '</a></h5></div><div class="post-meta" style="margin-bottom:15px"><span>by <a target="_blank" href="' + element._embedded.author[0].link + '" onclick="googleEvent("Homepage", "Blog", "Blog Feed: "' + element._embedded.author[0].name + '"","");">' + element._embedded.author[0].name + '</a></span></div><div class="post-header"><p>' + ($(content).text().substring(0, 120) + '...') + '</p><p><a  onclick="googleEvent("Homepage", "Blog", "Blog Feed: Read More: "' + element.title.rendered + '"","");" target="_blank" href="' + element.link + '" style="color:#00ccff;">Read More</a></p></div></div></div>');
        }


    });
});


$.getJSON('https://www.mindler.com/vlog/wp-json/wp/v2/youtub?per_page=3', function(data) {

    $("#vlog_posts").empty();


    $.each(data, function(index, element) {
        let title = element.title.rendered;
        $.getJSON(element._links['wp:attachment'][0].href, function(thumbnail) {
            let img = thumbnail[0].guid.rendered;
            img = img.replace("https://www.mindler.com/vlog", "https://vlogcdn.mindler.com")
            let content = `<div class="col-lg-4 col-md-4 col-sm-4 mb-sm-30">
                     <div class="blog-post">
                        <div class="post-media">
                           <a><img src="${img}" class="img-responsive" loading="lazy"></a>
                        </div>
                        <div class="web-info">
                           <div class="post-header">
                              <h5>
                                 <a target="_blank" href="https://www.mindler.com/vlog/">${title}</a>
                              </h5>
                           </div>
                           <!--<div class="post-meta" style="margin-bottom:15px">
                              <span class="time">7:00 PM (IST) • Jun 01, 2021</span>
                              <h6><a href="#">UPCOMING</a></h6>
                           </div>
                           <div class="post-header">
                              <p><a target="_blank" style="color:#00ccff;">Register for Free</a></p>
                           </div>-->
                        </div>
                     </div>
                  </div>`;

            console.log(content);
            $("#vlog_posts").append(content);
        })

    })

});


//offer popup
$(".offer-popup.mode-compress .fa").click(function() {
    localStorage.clear();
    $(".offer-popup.mode-compress").hide();
    $(".offer-popup.mode-expand").show();
    localStorage.setItem("p1", "plus");
});

$(".offer-popup.mode-expand .fa").click(function() {
    localStorage.clear();
    $(".offer-popup.mode-compress").show();
    $(".offer-popup.mode-expand").hide();
    localStorage.setItem("p1", "minus");

});



if (localStorage.getItem('p1') == 'plus') {
    $(".offer-popup.mode-compress").hide();
    $(".offer-popup.mode-expand").show();
} else if (localStorage.getItem('p1') == 'minus') {
    $(".offer-popup.mode-compress").show();
    $(".offer-popup.mode-expand").hide();
}


//new purchase banner
$(".new-purchase-banner.expand-mode .fa-minus-circle ").click(function() {
    $(".new-purchase-banner.expand-mode").hide();
    $(".new-purchase-banner.collapse-mode").show();
    localStorage.setItem("p", "minus");

});
$(".new-purchase-banner.collapse-mode .fa-plus-circle ").click(function() {
    $(".new-purchase-banner.expand-mode").show();
    $(".new-purchase-banner.collapse-mode").hide();
    localStorage.setItem("p", "plus");

});

if (localStorage.getItem('p') == 'plus') {
    $(".new-purchase-banner.expand-mode").show();
    $(".new-purchase-banner.collapse-mode").hide();
} else if (localStorage.getItem('p') == 'minus') {
    $(".new-purchase-banner.expand-mode").hide();
    $(".new-purchase-banner.collapse-mode").show();
}


if (localStorage.getItem('p') == 'plus') {
    $(".offer-popup.expand-mode").show();
    $(".offer-popup .mode-compress").hide();
} else if (localStorage.getItem('p') == 'minus') {
    $(".offer-popup .expand-mode").hide();
    $(".offer-popup .mode-compress").show();
}


//youtube  iframes
function init() {
    var vidDefer = document.getElementsByTagName('iframe');
    for (var i = 0; i < vidDefer.length; i++) {
        if (vidDefer[i].getAttribute('data-src')) {
            vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
        }
    }
}
window.onload = init;


//partner monthly subs
$(".partner-page .pricing-desktop-box #Choose-payment-Plan li a").click(function() {
    var id = $(this).attr('id');
    $(this).parents('.partner-page').find('.Choose-payment-Plan-desktop-annual').hide();
    $(this).parents('.partner-page').find('.Choose-payment-Plan-desktop-monthly').hide();
    $('.' + id).show();
});

$(".partner-page  #Choose-mobile-payment-Plan li a").click(function() {
    var id = $(this).attr('id');
    $(this).parents('.partner-page').find('.Choose-payment-Plan-mobile-annual').hide();
    $(this).parents('.partner-page').find('.Choose-payment-Plan-mobile-monthly').hide();
    $('.' + id).show();
});


/*Toggle button text*/
$(".Choose-payment-Plan-mobile-monthly .show-details-all button").click(function() {
    $(this).text(function(i, text) {
        return text === "Hide Features" ? "Show Features" : "Hide Features";
    })
});


$(".Choose-payment-Plan-mobile-annual .show-details-all button").click(function() {
    $(this).text(function(i, text) {
        return text === "Hide Features" ? "Show Features" : "Hide Features";
    })
});