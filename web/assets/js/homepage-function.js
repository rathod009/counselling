var base_url = window.location.origin + '/';

$(document).ready(function() {
    setTimeout(function() {
        $("#preloader").fadeOut(), $(".preloader_img").delay(100).fadeOut("slow")
    }, 2e3);
    var e = $(window).height();

    function i(e) {
        return $("" + e).next(".validation").remove(), $("" + e).closest("div.content").find("input[type='email']").next(".validation-mobile").remove(), $("" + e).closest("div.preview").find("input[type='email']").next(".validation").remove(), $("" + e).closest("div").find("input[type='email']").next(".validation").remove(), $("" + e).next(".validation-mobile").remove(), !0
    }

    function t(e, i, t, a, s, n) {
        return $("div.overlay-box").css("display", "block"), $.ajax({
            type: "POST",
            url: base_url + "login/emailSignupLeadsquare",
            data: {
                name: "email",
                email: e,
                ProspectStage: i,
                source: t,
                SourceMedium: a,
                SourceContent: s,
                SourceDescription: n
            },
            success: function(e) {
                $("div.overlay-box").css("display", "none")
            }
        }), !0
    }
    $(window).width() > 768 && $(".homepage-new .homepage-display"), $(window).width() <= 768 && $(".homepage-new .homepage-display"), $(window).scroll(function() {
        $(window).scrollTop() >= 30 ? ($(".new-top-header ").addClass("up"), $(".new-top-header .new-header-1").hide()) : ($(".new-top-header .new-header-1").show(), $(".new-top-header ").removeClass("up"))
    }), $(".new-top-header .new-header-2 .fa.fa-bars").on("click", function(e) {
        $(".mobile-fixed-header-menu").addClass("push-left"), $("body").addClass("push-left"), $(".new-overlay").show()
    }), $(".mobile-fixed-header-menu .fa.fa-close").on("click", function(e) {
        $(".mobile-fixed-header-menu .menu-sign-up a").next(".validation-mobile").remove(), $(".mobile-fixed-header-menu .menu-sign-up #h2-email").next(".validation").remove(), $("#h2-email").val(" "), $(".mobile-fixed-header-menu").removeClass("push-left"), $("body").removeClass("push-left"), $(".new-overlay").hide(), $(".mobile-fixed-header-menu .mobile-product ul").hide(), $(".mobile-fixed-header-menu .mobile-product").removeClass("active")
    }), $(".new-overlay").on("click", function(e) {
        $(".mobile-fixed-header-menu").removeClass("push-left"), $("body").removeClass("push-left"), $(".new-overlay").hide(), $(".mobile-fixed-header-menu .mobile-product ul").hide(), $(".mobile-fixed-header-menu .mobile-product").removeClass("active")
    }), $(".mobile-fixed-header-menu .mobile-product").on("click", function(e) {
        e.preventDefault(), $(this).find("ul").slideToggle(), $(this).toggleClass("active")
    }), $(".new-top-header .start-free a").click(function() {
        var e = $("#h-email").val(),
            a = $("#h-email").attr("data-source"),
            s = $("#h-email").attr("data-source-medium"),
            n = $("#h-email").attr("data-source-content"),
            o = $("#h-email").attr("data-source-description");
        i(".programs-page .sub-menu a"), i(".new-top-header .start-free a"), i(".mobile-signup-section button"), i(".desktop-signup-section button"), i(".mobile-fixed-header-menu .menu-sign-up a"), i("#startNow"), i("#signUpByEmail"), $(".programs-page #scroll-programs .programs-cards .email-signup a").closest("div.email-signup").find("input[type='email']").val(" "), $(".programs-page #scroll-programs .programs-cards .email-signup a").closest("div.email-signup").find("input[type='email']").next(".validation").remove(), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $(".mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), i(".subscription-box #newsletter-button"), $(".subscription-box .newsletter-value").val(" "), i(".programs-page .sub-menu span.prg-start-free a"), 0 == e.length ? (i(".new-top-header .start-free a"), $(this).after('<div class="validation">Please enter email address</div>'), $(".programs-page .sub-menu span.prg-start-free a").after('<div class="validation">Please enter email address</div>'), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#h-email").focus(), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#desktop-signup-sec button").closest("div.content").find("input[type='email']").val(" "), $("#h2-email").val(" "), $("#signUpByEmail").val(" ")) : /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test(e) ? ($(this).next(".validation").remove(), $("div.overlay-box").css("display", "block"), $.ajax({
            type: "POST",
            url: base_url + "login/validateEmail",
            data: {
                email: e
            },
            success: function(l) {
                $("div.overlay-box").css("display", "none");
                var d = $.parseJSON(l);
                "404" == d.status ? ($(this).next(".validation").remove(), window.location.href = base_url + "login?email=" + e) : "invalid" == d.result || "unknown" == d.result || "catch_all" == d.result ? (i(".new-top-header .start-free a"), $(".new-top-header .start-free a").after('<div class="validation ">The email address you entered is not correct. Please try again.</div>'), $(".programs-page .sub-menu span.prg-start-free a").after('<div class="validation">The email address you entered is not correct. Please try again.</div>'), $("#h-email").focus(), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#desktop-signup-sec button").closest("div.content").find("input[type='email']").val(" "), $("#h2-email").val(" "), $("#signUpByEmail").val(" ")) : $.ajax({
                    type: "POST",
                    url: base_url + "login/emailSignup",
                    data: {
                        name: "email",
                        email: e,
                        SourceMedium: s
                    },
                    success: function(i) {
                        200 == $.parseJSON(i).status ? (t(e, "EmailOnly", a, s, n, o), window.location.href = ($.parseJSON(i).url) ? $.parseJSON(i).url : (base_url + "assess/dashboard")) : ($(".new-top-header .start-free a").next(".validation").remove(), $(".new-top-header .start-free a").after('<div class="validation" style="position: absolute;font-size: 11px;bottom:0px;color: red;font-family: calibri;">Aah! something went wrong</div>'), $("#h-email").focus())
                    }
                })
            }
        })) : (i(".new-top-header .start-free a"), $(this).after('<div class="validation">Please enter valid email address</div>'), $(".programs-page .sub-menu span.prg-start-free a").after('<div class="validation">Please enter valid email address</div>'), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#desktop-signup-sec button").closest("div.content").find("input[type='email']").val(" "), $("#h2-email").val(" "), $("#h-email").focus(), $("#signUpByEmail").val(" "))
    }), $("#startNow").click(function() {
        var e = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/,
            a = $("#signUpByEmail").val(),
            s = $("#signUpByEmail").attr("data-source"),
            n = $("#signUpByEmail").attr("data-source-medium"),
            o = $("#signUpByEmail").attr("data-source-content"),
            l = $("#signUpByEmail").attr("data-source-description");
        i(".new-top-header .start-free a"), i(".mobile-signup-section button"), i(".desktop-signup-section button"), i("#mobile-signup-section button"), i(".mobile-fixed-header-menu .menu-sign-up a"), i("#startNow"), i("#signUpByEmail"), i(".subscription-box #newsletter-button"), i(".programs-page .sub-menu a"), i(".new-top-header .start-free a"), $(".programs-page #scroll-programs .programs-cards .email-signup a").closest("div.email-signup").find("input[type='email']").val(" "), $(".programs-page #scroll-programs .programs-cards .email-signup a").closest("div.email-signup").find("input[type='email']").next(".validation").remove(), $(".programs-page .sub-menu span.prg-start-free").find("input[type='email']").val(" "), $("#h-email").val(" "), $(".subscription-box .newsletter-value").val(" "), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $(".mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#h2-email").val(" "), 0 == a.length ? (i("#startNow"), i("#signUpByEmail"), $(this).after('<div class="validation">Please enter email address</div>'), $("#signUpByEmail").after('<div class="validation-mobile">Please enter email address</div>'), $("#signUpByEmail").focus()) : e.test(a) ? e.test(a) && ($("div.overlay-box").css("display", "block"), $.ajax({
            type: "POST",
            url: base_url + "login/validateEmail",
            data: {
                email: a
            },
            success: function(e) {
                $("div.overlay-box").css("display", "none");
                var d = $.parseJSON(e);
                if ("404" == d.status) $(".new-signup-box").next(".validation").remove(), window.location.href = base_url + "login?email=" + a;
                else {
                    if ("invalid" == d.result || "unknown" == d.result || "catch_all" == d.result) return i("#startNow"), i("#signUpByEmail"), $("#startNow").after('<div class="validation">The email address you entered is not correct. Please try again.</div>'), $("#signUpByEmail").after('<div class="validation-mobile">The email address you entered is not correct. Please try again.</div>'), $("#signUpByEmail").focus(), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#h-email").val(" "), $("#h2-email").val(" "), !1;
                    $("#startNow").next(".validation").remove(), $("#signUpByEmail").next(".validation-mobile").remove(), $("div.overlay-box").css("display", "block"), $.ajax({
                        type: "POST",
                        url: base_url + "login/emailSignup",
                        data: {
                            name: "email",
                            email: a,
                            SourceMedium: n
                        },
                        success: function(e) {
                            var d = $.parseJSON(e);
                            404 == d.status ? ($(".new-signup-box").next(".validation").remove(), window.location.href = base_url + "login?email=" + a) : 200 == d.status ? (t(a, "EmailOnly", s, n, o, l), window.location.href = (d.url) ? d.url : (base_url + "assess/dashboard")) : (i("#startNow"), i("#signUpByEmail"), $("#startNow").after('<div class="validation" style="margin-top: -23px;font-size: 12px;margin-right: 153px;">Aah! something went wrong</div>'), $("#signUpByEmail").focus())
                        }
                    })
                }
            }
        })) : (i("#startNow"), i("#signUpByEmail"), $(this).after('<div class="validation">Please enter valid email address</div>'), $("#signUpByEmail").after('<div class="validation-mobile">Please enter valid email address</div>'), $("#signUpByEmail").focus())
    }), $(".desktop-signup-section button").click(function() {
        var e = $(this).closest("div.content").find("input[type='email']").val(),
            a = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/,
            s = $(this).closest("div.content").find("input[type='email']").attr("data-source"),
            n = $(this).closest("div.content").find("input[type='email']").attr("data-source-medium"),
            o = $(this).closest("div.content").find("input[type='email']").attr("data-source-content"),
            l = $(this).closest("div.content").find("input[type='email']").attr("data-source-description");
        i(".new-top-header .start-free a"), i(".mobile-signup-section button"), i(".desktop-signup-section button"), i(".mobile-fixed-header-menu .menu-sign-up a"), i("#startNow"), i("#signUpByEmail"), i(".subscription-box #newsletter-button"), $(".subscription-box .newsletter-value").val(" "), $("#h-email").val(" "), $(".mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#h2-email").val(" "), $("#signUpByEmail").val(" "), 0 == e.length ? (i(".desktop-signup-section button"), $(this).after('<div class="validation">Please enter email address</div>'), $(this).closest("div.content").find("input[type='email']").after('<div class="validation-mobile">Please enter email address</div>'), $(this).closest("div.content").find("input[type='email']").focus()) : a.test(e) ? a.test(e) && ($("div.overlay-box").css("display", "block"), $.ajax({
            type: "POST",
            url: base_url + "login/validateEmail",
            data: {
                email: e
            },
            success: function(a) {
                $("div.overlay-box").css("display", "none");
                var d = $.parseJSON(a);
                if ("404" == d.status) $(".desktop-signup-section button").next(".validation").remove(), window.location.href = base_url + "login?email=" + e;
                else {
                    if ("invalid" == d.result || "unknown" == d.result || "catch_all" == d.result) return i(".desktop-signup-section button"), $(".desktop-signup-section button").after('<div class="validation">The email address you entered is not correct. Please try again.</div>'), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").after('<div class="validation-mobile">The email address you entered is not correct. Please try again.</div>'), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").focus(), !1;
                    $(".desktop-signup-section button").next(".validation").remove(), $("div.overlay-box").css("display", "block"), $.ajax({
                        type: "POST",
                        url: base_url + "login/emailSignup",
                        data: {
                            name: "email",
                            email: e,
                            SourceMedium: s
                        },
                        success: function(a) {
                            var d = $.parseJSON(a);
                            404 == d.status ? ($(".desktop-signup-section button").next(".validation").remove(), window.location.href = base_url + "login?email=" + e) : 200 == d.status ? (t(e, "EmailOnly", s, n, o, l), window.location.href = (d.url) ? d.url : (base_url + "assess/dashboard")) : (i(".mobile-signup-section button"), i(".desktop-signup-section button"), i(".mobile-fixed-header-menu .menu-sign-up a"), i("#startNow"), i("#signUpByEmail"), $(".desktop-signup-section button").after('<div class="validation" style="margin-top: -23px;font-size: 12px;margin-right: 153px;">Aah! something went wrong</div>'), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").focus())
                        }
                    })
                }
            }
        })) : (i(".desktop-signup-section button"), $(this).after('<div class="validation">Please enter valid email address</div>'), $(this).closest("div.content").find("input[type='email']").after('<div class="validation-mobile">Please enter valid email address</div>'), $(this).closest("div.content").find("input[type='email']").focus())
    }), $(".subscription-box #newsletter-button").click(function() {
        i(".new-top-header .start-free a"), i(".mobile-signup-section button"), i(".desktop-signup-section button"), i(".mobile-fixed-header-menu .menu-sign-up a"), i("#startNow"), i("#signUpByEmail"), $("#h-email").val(" "), $(".mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#h2-email").val(" "), $("#signUpByEmail").val(" ");
        var e = $(".subscription-box .newsletter-value").val();
        0 == e.length ? ($(this).next(".validation").remove(), $(this).after('<div class="validation" style="color:red;text-align: left;font-size: 12px;">Please enter email address</div>'), $(".subscription-box .newsletter-value").focus()) : /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test(e) ? ($(this).next(".validation").remove(), $("div.overlay-box").css("display", "block"), $.ajax({
            url: base_url + "login/newsletter",
            type: "post",
            data: {
                email: e
            },
            success: function(e) {
                $("div.overlay-box").css("display", "none"), 1 == e && ($(this).next(".validation").remove(), $(".subscription-box .newsletter-value").val(" "), $(".subscription-box #newsletter-button").after('<div class="validation" style="color:green;text-align: left;font-size: 12px;">Thanks for subscribing!</div>'))
            }
        })) : ($(this).next(".validation").remove(), $(this).after('<div class="validation" style="color:red;text-align: left;font-size: 12px;">Please enter valid email address</div>'), $(".subscription-box .newsletter-value").focus())
    }), $(".mobile-fixed-header-menu .menu-sign-up a").click(function() {
        var e = $("#h2-email").val(),
            a = $("#h2-email").attr("data-source"),
            s = $("#h2-email").attr("data-source-medium"),
            n = $("#h2-email").attr("data-source-content"),
            o = $("#h2-email").attr("data-source-description");
        i(".programs-page .sub-menu a"), $("#startNow").next(".validation").remove(), $(".programs-page #scroll-programs .programs-cards .email-signup a").closest("div.email-signup").find("input[type='email']").val(" "), $(".programs-page #scroll-programs .programs-cards .email-signup a").closest("div.email-signup").find("input[type='email']").next(".validation").remove(), 0 == e.length ? (i(".new-top-header .start-free a"), i(".mobile-signup-section button"), i(".desktop-signup-section button"), i(".mobile-fixed-header-menu .menu-sign-up a"), i("#startNow"), i("#signUpByEmail"), $("#h2-email").after('<div class="validation">Please enter email address</div>'), $("#h2-email").focus(), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#desktop-signup-sec button").closest("div.content").find("input[type='email']").val(" "), $(".mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#h-email").val(" "), $("#signUpByEmail").val(" "), i(".subscription-box #newsletter-button"), $(".subscription-box .newsletter-value").val(" ")) : /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test(e) ? ($(this).next(".validation").remove(), $("div.overlay-box").css("display", "block"), $.ajax({
            type: "POST",
            url: base_url + "login/validateEmail",
            data: {
                email: e
            },
            success: function(l) {
                $("div.overlay-box").css("display", "none");
                var d = $.parseJSON(l);
                "404" == d.status ? ($(this).next(".validation").remove(), window.location.href = base_url + "login?email=" + e) : "invalid" == d.result || "unknown" == d.result || "catch_all" == d.result ? (i(".new-top-header .start-free a"), i(".mobile-signup-section button"), i(".desktop-signup-section button"), i(".mobile-fixed-header-menu .menu-sign-up a"), i("#startNow"), i("#signUpByEmail"), $(".mobile-fixed-header-menu .menu-sign-up a").next(".validation").remove(), $(".mobile-fixed-header-menu .menu-sign-up #h2-email").after('<div class="validation ">The email address you entered is not correct. Please try again.</div>'), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#desktop-signup-sec button").closest("div.content").find("input[type='email']").val(" "), $("#h-email").val(" "), $("#h2-email").focus(), $("#signUpByEmail").val(" ")) : $.ajax({
                    type: "POST",
                    url: base_url + "login/emailSignup",
                    data: {
                        name: "email",
                        email: e,
                        SourceMedium: s
                    },
                    success: function(i) {
                        200 == $.parseJSON(i).status ? (t(e, "EmailOnly", a, s, n, o), window.location.href = ($.parseJSON(i).url) ? $.parseJSON(i).url : (base_url + "assess/dashboard")) : ($("#h2-email").next(".validation").remove(), $("#h2-email").after('<div class="validation" style="position: absolute;font-size: 11px;bottom:0px;color: red;font-family: calibri;">Aah! something went wrong</div>'), $("#h2-email").focus())
                    }
                })
            }
        })) : (i(".new-top-header .start-free a"), i(".mobile-signup-section button"), i(".desktop-signup-section button"), i(".mobile-fixed-header-menu .menu-sign-up a"), i("#startNow"), i("#signUpByEmail"), $("#h2-email").after('<div class="validation">Please enter valid email address</div>'), $("#h2-email").focus(), $(".desktop-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#mobile-signup-section button").closest("div.content").find("input[type='email']").val(" "), $("#desktop-signup-sec button").closest("div.content").find("input[type='email']").val(" "), $("#h-email").val(" "), $("#signUpByEmail").val(" "))
    }), $("#section-slider-ul").lightSlider({
        loop: !0,
        keyPress: !0,
        item: 1,
        responsive: [{
            breakpoint: 480,
            settings: {
                item: 1,
                slideMove: 1
            }
        }]
    })
});



$(document).ready(function() {
    $(window).scroll(function() {

        $('.validation').hide();

    });

    $(".sub-products.with-tabs").mouseenter(function() {
        $(this).addClass("menushow");
    });


    $(".sub-products.with-tabs ul.menu-dropdown-tabs li").mouseenter(function() {
        $(".sub-products.with-tabs").addClass("menushow");
        $(this).parents("ul.menu-dropdown-tabs").find("li").removeClass("active");
        $(this).addClass("active");
        var menutabIndex = $(this).index();
        $(this).parents(".sub-products.with-tabs").find(".col-right .menu-tabdetails").hide();
        $(this).parents(".sub-products.with-tabs").find(".col-right .menu-tabdetails").eq(menutabIndex).show();
    });


    $(".sub-products.with-tabs").mouseleave(function() {
        $(".sub-products.with-tabs ul.menu-dropdown-tabs li:first-child").mouseenter();
        $(this).removeClass("menushow");
    });
    $(".home-pagetab ul li span.name").on('click', function(e) {
        e.preventDefault();
        var homeIndex = $(this).parents("li").index();
        console.log(homeIndex);
        $(this).parents("ul").find("li span.name").removeClass("active");
        $(this).addClass("active");

        $(this).parents("#student-program").find(".details-box .home-pagetab-details").hide();
        $(this).parents("#student-program").find(".details-box .home-pagetab-details").eq(homeIndex).show();
    });

});

$(document).on('change', '#mindlerNavigateNotify input[name="designation"]', function(event) {
    $(this).parents('.modal-body').find('.student-class-section').css('display', 'none');
    let value = $(this).val();
    if (value == 'Student') {
        $(this).parents('.modal-body').find('.student-class-section').css('display', 'block');
    } else {
        $("#mindlerNavigateNotify select[name='class'] option:selected").prop("selected", false)
    }
})

$(document).on('click', '#mindlerNavigateNotify .modal-footer button', function(event) {
    event.preventDefault();

    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    var name = $(this).parents('.modal-content').find('input[name="name"]').val();
    var email = $(this).parents('.modal-content').find('input[name="email"]').val();
    var phone = $(this).parents('.modal-content').find('input[name="mobile"]').val();
    var designation = $(this).parents('.modal-content').find('input[name="designation"]:checked').val();
    var _class = $(this).parents('.modal-content').find('select[name="class"]').val();
    let isVisible = $('.student-class-section').is(":visible");



    $(this).parents('.modal-content').find('.modal-error').remove();

    if (!name) {
        $(this).parents('.modal-content').find('input[name="name"]').after('<div class="modal-error" style="text-align: left;margin-top: -17px;font-size: 12px;color: red;">Name field can not be blank.</div>');
        $(this).parents('.modal-content').find('input[name="name"]').focus();
    } else if (!phone.length) {
        $(this).parents('.modal-content').find('input[name="mobile"]').after('<div class="modal-error" style="text-align: left;margin-top: -17px;font-size: 12px;color: red;">Mobile field can not be blank.</div>');
        $(this).parents('.modal-content').find('input[name="mobile"]').focus();
    } else if ($.isNumeric(phone) == false || phone.length < 10) {
        $(this).parents('.modal-content').find('input[name="mobile"]').after('<div class="modal-error" style="text-align: left;margin-top: -17px;font-size: 12px;color: red;">Please enter valid mobile number.</div>');
        $(this).parents('.modal-content').find('input[name="mobile"]').focus();
    } else if (!email) {

        $(this).parents('.modal-content').find('input[name="email"]').after('<div class="modal-error" style="text-align: left;margin-top: 0px;font-size: 12px;color: red;">Email field can not be blank.</div>');
        $(this).parents('.modal-content').find('input[name="email"]').focus();
        return false;

    } else if (!filter.test(email)) {

        $(this).parents('.modal-content').find('input[name="email"]').after('<div class="modal-error" style="text-align: left;margin-top: 0px;font-size: 12px;color: red;">Please enter valid mobile number.</div>');
        $(this).parents('.modal-content').find('input[name="email"]').focus();
        return false;

    } else if (!designation) {

        $("#mindlerNavigateNotify .modal-content .radio-btn-opt").after('<div class="modal-error" style="text-align: left;margin-top: 0px;font-size: 12px;color: red;">This field can not be blank.</div>');
        // $(this).parents('.modal-content').find('input[name="email"]').focus();
        return false;

    } else if (!_class && isVisible) {

        $("#mindlerNavigateNotify .modal-content select[name='class']").after('<div class="modal-error" style="text-align: left;margin-top: 0px;font-size: 12px;color: red;">This field can not be blank.</div>');
        // $(this).parents('.modal-content').find('input[name="email"]').focus();
        return false;

    } else {
        var fromData = $('#mindlerNavigateNotify .navigateUserForm').serialize();
        $("div.overlay-box").css("display", "block");
        $.ajax({
            url: base_url + 'prelogin/mindlerNavigateLead',
            type: "post",
            data: {
                'data': fromData
            },
            success: function(response) {
                $("div.overlay-box").css("display", "none");
                var json = $.parseJSON(response);
                $("#mindlerNavigateNotify").modal('hide');
                $('#mindlerNavigateNotify .navigateUserForm')[0].reset();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
});