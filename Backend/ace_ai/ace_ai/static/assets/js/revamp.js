$(document).ready(function() {
    var base_url = window.location.origin + "/";

    $(".comp-faq .comp-faq-items h5").click(function(event) {
        event.preventDefault();

        $(this).parents(".comp-faq-items").find("p").slideToggle();
        $(this).parents(".comp-faq-items").toggleClass("active");
        $(this).parents(".comp-faq-items").siblings().find("p").slideUp();
        $(this).parents(".comp-faq-items").siblings().removeClass("active");
    });

    $(".iccc-signup-block .iccc-signup-box .close-click").click(function() {
        $(this).parents(".iccc-signup-block").find("input").val("");
        $(".validation").remove();
    });

    $(".landing-tabs .component-tab-section .tab-clicks li.links").click(
        function(event) {
            event.preventDefault();
            $(this).parents(".tab-clicks").find("li.links").removeClass("active");
            $(this).addClass("active");

            $(this)
                .parents(".landing-tabs")
                .find(".tab-details-sec .tab-details")
                .hide();

            if ($(this).hasClass("first")) {
                $(this)
                    .parents(".landing-tabs")
                    .find(".tab-details-sec .tab-details.first")
                    .show();
            }

            if ($(this).hasClass("second")) {
                $(this)
                    .parents(".landing-tabs")
                    .find(".tab-details-sec .tab-details.second")
                    .show();
            }

            if ($(this).hasClass("third")) {
                $(this)
                    .parents(".landing-tabs")
                    .find(".tab-details-sec .tab-details.third")
                    .show();
            }

            $(this)
                .parents(".landing-tabs")
                .find(".tab-details .left-tab li:first-child")
                .click();
        }
    );

    $(".landing-tabs .tab-details .left-tab li").click(function(event) {
        event.preventDefault();
        console.log("here");
        var leftIndex = $(this).index();

        $(this).parents(".left-tab").find("li").removeClass("active");
        $(this).addClass("active");

        $(this)
            .parents(".tab-details")
            .find(".left-tab-box .left-tab-details")
            .hide();
        $(this)
            .parents(".tab-details")
            .find(".left-tab-box .left-tab-details")
            .eq(leftIndex)
            .show();
    });

    $(document).on("click", "#stop-iccc-video", function(e) {
        $("iframe").attr("src", $("iframe").attr("src"));
    });

    $("#iccc-intro-carousel").carousel({
        interval: 2000,
    });

    $(".iccc-apply").click(function(event) {
        event.preventDefault();
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var email = $(this).parent().find("input[type=email]").val();

        $(".iccc-validation").remove();

        if (email.length == 0) {
            $(this)
                .parent()
                .after(
                    '<div class="iccc-validation" style="display: block;">Please enter email address</div>'
                );
        } else if (!filter.test(email)) {
            $(this)
                .parent()
                .after(
                    '<div class="iccc-validation" style="display: block;">Please enter valid email address</div>'
                );
        } else if (filter.test(email)) {
            $("div.overlay-box").css("display", "block");

            //Outbrain Pixel
            obApi('track', 'ICCC Registration');

            $.ajax({
                type: "POST",
                url: base_url + "prelogin/icccPreSignedup",
                data: {
                    email: email
                },
                context: this,
                success: function(responses) {
                    response = $.parseJSON(responses);
                    $("div.overlay-box").css("display", "none");

                    if (response.status == 200 && response.email) {
                        $(".iccc-signup-block")
                            .find("input[type='email']")
                            .val(response.email);

                        $(".iccc-signup-block").fadeIn();

                        $("body").addClass("body-block");

                    } else {
                        $(this)
                            .parent()
                            .after(
                                '<div class="iccc-validation" style="display: block;">This email is already exist.</div>'
                            );
                    }
                },
            });
        }
    });

    $(".iccc-signup-box span.close-click").click(function(event) {
        event.preventDefault();

        $(".iccc-signup-block").fadeOut();

        $("body").removeClass("body-block");
    });

    $(".upcoming-cohort").lightSlider({
        item: 3,
        slideMove: 3,
        slideMargin: 30,
        responsive: [{
            breakpoint: 480,
            settings: {
                item: 1,
                slideMove: 1,
            },
        }, ],
    });

    $(".slider-custom .pics-slider").lightSlider({
        item: 3,
        slideMove: 3,
        slideMargin: 30,
        responsive: [{
            breakpoint: 480,
            settings: {
                item: 1,
                slideMove: 1,
            },
        }, ],
    });
    $(".slider-custom .video-slider").lightSlider({
        item: 3,
        slideMove: 3,
        slideMargin: 30,
        responsive: [{
            breakpoint: 480,
            settings: {
                item: 1,
                slideMove: 1,
            },
        }, ],
    });

    $(".slider-custom .slider-nav.prev").click(function(event) {
        event.preventDefault();
        $(this).parents(".slider-custom").find(".lSAction .lSPrev").click();
    });
    $(".slider-custom .slider-nav.next").click(function(event) {
        event.preventDefault();
        $(this).parents(".slider-custom").find(".lSAction .lSNext").click();
    });

    /*iccc youtube videos*/
    $(document).on("click", ".video-btn-1", function(e) {
        $("#myModal .modal-content .modal-body").empty();
        $("#myModal .modal-content .modal-header").empty();
        $("#myModal .modal-content .modal-header").append(
            '<button type="button" class="close" data-dismiss="modal" id="stop-iccc-video">&times;</button>'
        );

        $("#myModal .modal-content .modal-header").append(
            "<h3> ICCC in Dubai : A Glimpse </h3>"
        );

        $("#myModal .modal-content .modal-body").append(
            '<iframe  class="ifram-video-1"  id="iccc-previous-cohort" src="https://www.youtube.com/embed/x2WnQuHprbU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        );
    });

    $(document).on("click", ".for-video", function(e) {
        $("#myModal .modal-content .modal-body").empty();
        $("#myModal .modal-content .modal-header").empty();
        $("#myModal .modal-content .modal-header").append(
            '<button type="button" class="close" data-dismiss="modal" id="stop-iccc-video">&times;</button>'
        );

        if ($(this).hasClass("y-video-1")) {
            $("#myModal .modal-content .modal-body").append(
                '<iframe class="ifram-video-1" src="https://www.youtube.com/embed/04EgKcT_Ff8?rel=0" frameborder="0"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'
            );
        } else if ($(this).hasClass("y-video-2")) {
            $("#myModal .modal-content .modal-body").append(
                '<iframe class="ifram-video-1" src="https://www.youtube.com/embed/VCSyc6fA2Rw?rel=0" frameborder="0"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'
            );
        } else if ($(this).hasClass("y-video-3")) {
            $("#myModal .modal-content .modal-body").append(
                '<iframe class="ifram-video-1" src="https://www.youtube.com/embed/aFoYUqE1RSQ?rel=0" frameborder="0"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'
            );
        } else if ($(this).hasClass("y-video-4")) {
            $("#myModal .modal-content .modal-body").append(
                '<iframe class="ifram-video-1" src="https://www.youtube.com/embed/5umPOMsBSgs?rel=0" frameborder="0"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'
            );
        } else if ($(this).hasClass("y-video-5")) {
            $("#myModal .modal-content .modal-body").append(
                '<iframe class="ifram-video-1" src="https://www.youtube.com/embed/ffRAGIu7cdI?rel=0" frameborder="0"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'
            );
        } else if ($(this).hasClass("y-video-6")) {
            $("#myModal .modal-content .modal-body").append(
                '<iframe class="ifram-video-1" src="https://www.youtube.com/embed/oE6l9HicqQE?rel=0" frameborder="0"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'
            );
        } else if ($(this).hasClass("y-video-7")) {
            $("#myModal .modal-content .modal-body").append(
                '<iframe class="ifram-video-1" src="https://www.youtube.com/embed/XLu1nXvXIE4?rel=0" frameborder="0"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'
            );
        }
        $("#myModal").modal("show");
    });

    /*end*/

    /*iccc*/
    $("#program-form-section #iccc-getintouch-form .btn-orange").click(
        function() {
            var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
            var email = $(this).closest("form").find("input[type='email']").val();
            var name = $(this).closest("form").find("input[name='name']").val();
            var contact = $(this).closest("form").find("input[name='contact']").val();
            var comment = $("textarea[name=comment]").val();
            var clength = comment.replace(/\s/g, "");
            $(this).closest("form").find(".validation").remove(); // remove it
            if (name.length == 0) {
                $(this)
                    .closest("form")
                    .find("input[name='name']")
                    .next(".validation")
                    .remove(); // remove it
                $(this)
                    .closest("form")
                    .find("input[name='name']")
                    .after('<div class="validation">Please enter your name</div>');
                $(this).closest("form").find("input[name='name']").focus();
                return false;
            } else if (email.length == 0) {
                $(this)
                    .closest("form")
                    .find("input[type='email']")
                    .next(".validation")
                    .remove(); // remove it
                $(this)
                    .closest("form")
                    .find("input[type='email']")
                    .after('<div class="validation">Please enter email address</div>');
                $(this).closest("form").find("input[type='email']").focus();
                return false;
            } else if (!filter.test(email)) {
                $(this)
                    .closest("form")
                    .find("input[type='email']")
                    .next(".validation")
                    .remove(); // remove it
                $(this)
                    .closest("form")
                    .find("input[type='email']")
                    .after(
                        '<div class="validation">Please enter valid email address</div>'
                    );
                $(this).closest("form").find("input[type='email']").focus();
                return false;
            } else if (contact.length == 0) {
                $(this)
                    .closest("form")
                    .find("input[name='contact']")
                    .next(".validation")
                    .remove(); // remove it
                $(this)
                    .closest("form")
                    .find("input[name='contact']")
                    .after(
                        '<div class="validation">Please enter your contact number</div>'
                    );
                $(this).closest("form").find("input[name='contact']").focus();
                return false;
            } else if ($.isNumeric(contact) == false || contact.length < 10) {
                $(this)
                    .closest("form")
                    .find("input[name='contact']")
                    .next(".validation")
                    .remove(); // remove it
                $(this)
                    .closest("form")
                    .find("input[name='contact']")
                    .after(
                        '<div class="validation">Please enter valid contact number.</div>'
                    );
                $(this).closest("form").find("input[name='contact']").focus();
                return false;
            } else if (comment.length == 0) {
                $("#nature-query").next(".validation").remove(); // remove it
                $(this)
                    .closest("form")
                    .find("textarea[name='comment']")
                    .next(".validation")
                    .remove(); // remove it
                $(this)
                    .closest("form")
                    .find("textarea[name='comment']")
                    .after('<div class="validation">Please enter your comment</div>');
                $(this).closest("form").find("textarea[name='comment']").focus();
                return false;
            } else {
                /*else if (clength.length <20) {
        $("#nature-query").next(".validation").remove(); // remove it
        $(this).closest("form").find("textarea[name='comment']").next(".validation").remove(); // remove it
        $(this).closest("form").find("textarea[name='comment']").after('<div class="validation">Enter a minimum of 20 characters</div>');
        $(this).closest("form").find("textarea[name='comment']").focus();
        return false;
   }*/
                $("div.overlay-box").css("display", "block");
                var data = $("#iccc-getintouch-form").serialize();
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: base_url + "prelogin/icccGetInTouch",
                    data: {
                        data: data
                    },
                    success: function(responses) {
                        $("div.overlay-box").css("display", "none");
                        //var response = $.parseJSON(responses);
                        $("#program-form-section").hide();
                        $("#program-message-section").show();
                    },
                });
            }
        }
    );

    /*iccc signup form*/
    $(
        ".iccc-signup-block .iccc-signup-box #iccc-signup-form .code-list-click"
    ).on("click", function(e) {
        e.stopPropagation();
        $(this).find(".fa").toggleClass("fa-angle-down");
        $(this).parents("#iccc-signup-form").find("ul.code-list").toggle();
    });

    $(document).click(function() {
        $("ul.code-list").hide();
    });

    $(".iccc-signup-block .iccc-signup-box #iccc-signup-form ul.code-list li").on(
        "click",
        function(e) {
            e.preventDefault();
            var condeText = $(this).find(".code").text();
            $(this).parents("#iccc-signup-form").find("ul.code-list").hide();
            $(this)
                .parents("#iccc-signup-form")
                .find(".code-list-click span")
                .text(condeText);
            $(this)
                .parents("#iccc-signup-form")
                .find(".code-list-click .fa")
                .removeClass("fa-angle-down")
                .addClass("fa-angle-up");
        }
    );

    $(
        ".iccc-signup-block .iccc-signup-box #iccc-signup-form .btnew-orange"
    ).click(function() {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var email = $(this).closest("form").find("input[type='email']").val();
        var name = $(this).closest("form").find("input[name='name']").val();
        var mobile = $(this).closest("form").find("input[name='mobile']").val();
        var password = $(this).closest("form").find("input[name='password']").val();
        var codeText = $(this)
            .parents("#iccc-signup-form")
            .find(".code-list-click span")
            .text();

        $(this).closest("form").find(".validation").remove(); // remove it
        if (name.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='name']")
                .next(".validation")
                .remove(); // remove it
            $(this)
                .closest("form")
                .find("input[name='name']")
                .after('<div class="validation">Please enter your name</div>');
            $(this).closest("form").find("input[name='name']").focus();
            return false;
        } else if (email.length == 0) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .next(".validation")
                .remove(); // remove it
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after('<div class="validation">Please enter email address</div>');
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!filter.test(email)) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .next(".validation")
                .remove(); // remove it
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div class="validation">Please enter valid email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if ($.isNumeric(mobile) == false || mobile.length < 4) {
            $(this)
                .closest("form")
                .find("input[name='mobile']")
                .next(".validation")
                .remove(); // remove it
            $(this)
                .closest("form")
                .find("input[name='mobile']")
                .after('<div class="validation">Please enter valid phone number</div>');
            $(this).closest("form").find("input[name='mobile']").focus();
            return false;
        } else if (password.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='password']")
                .next(".validation")
                .remove(); // remove it
            $(this)
                .closest("form")
                .find("input[name='password']")
                .after('<div class="validation">Please enter your password</div>');
            $(this).closest("form").find("input[name='password']").focus();
            return false;
        } else if (password.length < 6) {
            $(this)
                .closest("form")
                .find("input[name='password']")
                .next(".validation")
                .remove(); // remove it
            $(this)
                .closest("form")
                .find("input[name='password']")
                .after(
                    '<div class="validation">Your password length should be greater then 5 character.</div>'
                );
            $(this).closest("form").find("input[name='password']").focus();
            return false;
        } else {
            /*else if (clength.length <20) {
        $("#nature-query").next(".validation").remove(); // remove it
        $(this).closest("form").find("textarea[name='comment']").next(".validation").remove(); // remove it
        $(this).closest("form").find("textarea[name='comment']").after('<div class="validation">Enter a minimum of 20 characters</div>');
        $(this).closest("form").find("textarea[name='comment']").focus();
        return false;
   }*/
            $(".validation").remove();
            $("div.overlay-box").css("display", "block");
            var data =
                $(this).closest("form").serialize() + "&country_code=" + codeText;
            $.ajax({
                type: "POST",
                url: base_url + "prelogin/icccSignup",
                data: {
                    data: data
                },
                context: this,
                success: function(responses) {
                    var response = $.parseJSON(responses);
                    if (response.isExist == 1) {
                        $(this)
                            .closest("form")
                            .find("input[type='email']")
                            .next(".validation")
                            .remove(); // remove it
                        $(this)
                            .closest("form")
                            .find("input[type='email']")
                            .after(
                                '<div class="validation">Sorry! This email id already exist</div>'
                            );
                        $(this).closest("form").find("input[type='email']").focus();
                        return false;
                    } else if (response.status == 200) {
                        /* gtag('event', 'conversion', {
                          'send_to': 'AW-924053131/eKIGCIqh2oIBEIvdz7gD',
                          'event_callback': callback,
                          'name': name,
                          'email': email,
                          'phone': mobile
                        });*/

                        _linkedin_partner_id = "714651";
                        window._linkedin_data_partner_ids =
                            window._linkedin_data_partner_ids || [];
                        window._linkedin_data_partner_ids.push(_linkedin_partner_id);

                        (function() {
                            var s = document.getElementsByTagName("script")[0];
                            var b = document.createElement("script");
                            b.type = "text/javascript";
                            b.async = true;
                            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                            s.parentNode.insertBefore(b, s);
                        })();

                        !(function(f, b, e, v, n, t, s) {
                            if (f.fbq) return;
                            n = f.fbq = function() {
                                n.callMethod ?
                                    n.callMethod.apply(n, arguments) :
                                    n.queue.push(arguments);
                            };
                            if (!f._fbq) f._fbq = n;
                            n.push = n;
                            n.loaded = !0;
                            n.version = "2.0";
                            n.queue = [];
                            t = b.createElement(e);
                            t.async = !0;
                            t.src = v;
                            s = b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t, s);
                        })(
                            window,
                            document,
                            "script",
                            "https://connect.facebook.net/en_US/fbevents.js"
                        );
                        fbq("init", "263133604031761");
                        fbq("track", "Lead", {
                            name: name,
                            email: email,
                        });
                        gtag_report_conversion(
                            base_url + "iccc-foundation",
                            name,
                            email,
                            mobile
                        );

                        //window.location.href = base_url + 'iccc-foundation';
                    }
                },
            });
        }
    });

    function gtag_report_conversion(url, name, email, mobile) {
        var callback = function() {
            if (typeof url != "undefined") {
                //window.location = url;
                window.setTimeout(function() {
                    $("div.overlay-box").css("display", "none");
                    window.location = url;
                    console.log("fired");
                }, 1000);
            }
        };
        gtag("event", "conversion", {
            send_to: "AW-924053131/eKIGCIqh2oIBEIvdz7gD",
            name: name,
            email: email,
            phone: mobile,
            event_callback: callback,
        });
        return false;
    }

    $(
        "header.new-header .container .flex-box.nav-header .top-menu-block"
    ).mouseleave(function(event) {
        $(this).hide();
        $(this).parents("li").find("span.click").removeClass("active");
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-form")
            .hide();
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-details")
            .show();

        var blockHeight = $(this).parents("li").find(".top-menu-block").height();
        $(this)
            .parents("li")
            .find(".top-menu-block .for-contact")
            .css("min-height", blockHeight);
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 60) {
            $("header.new-header").addClass("with-shadow");
        } else {
            $("header.new-header").removeClass("with-shadow");
        }
    });

    $("header.new-header .container .flex-box .for-start .btn-action.get-started").click(function(event) {

        event.preventDefault();

        $(".user-block-main").find(".user-block .set-item").hide();
        $(".user-block-main").find(".user-block .set-item.display").show();
        $(".user-block-main").addClass("in-center ");
        $(
            "header.new-header .container .flex-box.nav-header ul.top-nav li .top-menu-block"
        ).hide();
        $(
            "header.new-header .container .flex-box.nav-header ul.top-nav li span.click"
        ).removeClass("active");
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-form")
            .hide();
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-details")
            .show();
    });

    $(".user-block-main .user-close").click(function(event) {
        event.preventDefault();

        $(".user-block-main").removeClass("in-center");
    });

    $(".user-block #step-email-signup").click(function(event) {
        event.preventDefault();

        $(this).parents(".set-item").hide();
        $("#step-email-signup-section").show();
    });

    $(".user-block #school-step-one").click(function(event) {
        event.preventDefault();

        $(this).parents(".set-item").hide();
        $("#school-step-two").show();
    });

    $(".user-block #institution-step-one").click(function(event) {
        event.preventDefault();

        $(this).parents(".set-item").hide();
        $("#institution-step-two").show();
    });

    $(".user-block #step-form-stu").click(function(event) {
        event.preventDefault();

        $(this).parents(".set-item").hide();
        $("#step-form-section-student").show();
    });

    $(".user-block #step-form-cdp").click(function(event) {
        event.preventDefault();

        $(this).parents(".set-item").hide();
        $("#step-form-section-cdp").show();
    });

    $(".user-block #step-form-cap").click(function(event) {
        event.preventDefault();

        $(this).parents(".set-item").hide();
        $("#step-form-section-cap").show();
    });

    $(".user-block #step-form-pro").click(function(event) {
        event.preventDefault();

        $(this).parents(".set-item").hide();
        $("#step-form-section-professional").show();
    });

    $(".user-block #professional-step-one").click(function(event) {
        event.preventDefault();

        $(this).parents(".set-item").hide();
        $("#professional-step-two").show();
    });

    $(".user-block #step-iccc").click(function(event) {
        event.preventDefault();

        $(this).parents(".set-item").hide();
        $("#step-iccc-section").show();
    });

    // back

    $(".set-item a.back.to-main").click(function(event) {
        event.preventDefault();
        $(".validation").remove();
        $(this).parents(".set-item").hide();
        $(".set-item.display").show();
    });

    $(".set-item a.back.to-school-main").click(function(event) {
        event.preventDefault();
        $(".validation").remove();
        $(this).parents(".set-item").hide();
        $(".set-item.school-selection").show();
    });

    $(".set-item a.back.to-institution-main").click(function(event) {
        event.preventDefault();
        $(".validation").remove();
        $(this).parents(".set-item").hide();
        $(".set-item.institution-selection").show();
    });

    $(".set-item a.back.to-professional-main").click(function(event) {
        event.preventDefault();
        $(".validation").remove();
        $(this).parents(".set-item").hide();
        $(".set-item.professional-selection").show();
    });
    // back
    if (window.matchMedia("(max-width: 767px)").matches) {
        $(
            "header.new-header .container .flex-box.nav-header ul.top-nav li span.click "
        ).click(function(event) {
            event.preventDefault();

            $(this).parents("li").find(".top-menu-block").toggle();
            $(this).toggleClass("active");
            $(this).parents("li").siblings().find(".top-menu-block").hide();
            $(this).parents("li").siblings().find("span.click").removeClass("active");
            $("header.new-header .container .flex-box.nav-header .for-contact")
                .find(".contact-form")
                .hide();
            $("header.new-header .container .flex-box.nav-header .for-contact")
                .find(".contact-details")
                .show();

            var blockHeight = $(this).parents("li").find(".top-menu-block").height();
            $(this)
                .parents("li")
                .find(".top-menu-block .for-contact")
                .css("min-height", blockHeight);
        });
    } else {
        $(
            "header.new-header .container .flex-box.nav-header ul.top-nav li span.click "
        ).mouseover(function(event) {
            //$("header.new-header .container .flex-box.nav-header .top-menu-block").hide();
            //$(this).parent().find('.top-menu-block').show();

            $(this).parents("li").find(".top-menu-block").toggle();
            $(this).toggleClass("active");

            $(this).parents("li").siblings().find(".top-menu-block").hide();
            $(this).parents("li").siblings().find("span.click").removeClass("active");

            $("header.new-header .container .flex-box.nav-header .for-contact")
                .find(".contact-form")
                .hide();
            $("header.new-header .container .flex-box.nav-header .for-contact")
                .find(".contact-details")
                .show();

            var blockHeight = $(this).parents("li").find(".top-menu-block").height();
            $(this)
                .parents("li")
                .find(".top-menu-block .for-contact")
                .css("min-height", blockHeight);
        });
    }

    $(
        "  header.new-header .container .flex-box.nav-header .for-menu .header-close "
    ).click(function(event) {
        event.preventDefault();
        $(this).toggleClass("active");
        $("header.new-header .container .flex-box .for-start").toggleClass(
            "in-center"
        );
        $(
            "header.new-header .container .flex-box.nav-header ul.top-nav li span.click "
        ).removeClass("active");
        $(
            "header.new-header .container .flex-box.nav-header ul.top-nav li .top-menu-block"
        ).hide();
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-form")
            .hide();
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-details")
            .show();
    });

    $(
        "header.new-header .container .flex-box.nav-header ul.top-nav li .top-menu-block .top-menu-close"
    ).click(function(event) {
        event.preventDefault();

        $(this).parents(".top-menu-block").hide();
        $(
            "header.new-header .container .flex-box.nav-header ul.top-nav li span.click"
        ).removeClass("active");
    });

    $(
        "header.new-header .container .flex-box.nav-header .for-contact .send-message"
    ).click(function(event) {
        event.preventDefault();
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-form")
            .slideDown();
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-details")
            .slideUp();
    });

    $(
        "header.new-header .container .flex-box.nav-header .for-contact .contact-form .btn-default"
    ).click(function(event) {
        event.preventDefault();
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-form")
            .slideUp();
        $("header.new-header .container .flex-box.nav-header .for-contact")
            .find(".contact-details")
            .slideDown();
    });

    $(
        "header.new-header .container .flex-box.nav-header .for-contact .contact-form .btn-secondry"
    ).click(function(event) {
        event.preventDefault();

        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var email = $(this).closest("form").find("input[type='email']").val();
        var name = $(this).closest("form").find("input[name='name']").val();
        var contact = $(this).closest("form").find("input[name='contact']").val();
        var comment = $(this)
            .closest("form")
            .find("textarea[name='comment']")
            .val();
        var clength = comment.replace(/\s/g, "");
        $(this).closest("form").find(".validation").remove(); // remove it
        if (name.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='name']")
                .after(
                    '<div style="margin-top: -7px!important;" class="validation">Please enter your name</div>'
                );
            $(this).closest("form").find("input[name='name']").focus();
            return false;
        } else if (email.length == 0) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -7px!important;" class="validation">Please enter email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!filter.test(email)) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -7px!important;" class="validation">Please enter valid email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (contact.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='contact']")
                .after(
                    '<div style="margin-top: -7px!important;" class="validation">Please enter your contact number</div>'
                );
            $(this).closest("form").find("input[name='contact']").focus();
            return false;
        } else if ($.isNumeric(contact) == false || contact.length < 10) {
            $(this)
                .closest("form")
                .find("input[name='contact']")
                .after(
                    '<div style="margin-top: -7px!important;" class="validation">Please enter valid contact number</div>'
                );
            $(this).closest("form").find("input[name='contact']").focus();
            return false;
        } else if (comment.length == 0) {
            $(this)
                .closest("form")
                .find("textarea[name='comment']")
                .after(
                    '<div style="margin-top: -7px!important;" class="validation">Please enter your message</div>'
                );
            $(this).closest("form").find("textarea[name='comment']").focus();
            return false;
        } else {
            $("div.overlay-box").css("display", "block");
            var data = $("#send-a-message").serialize();
            $.ajax({
                type: "POST",
                url: base_url + "prelogin/pricingHelpForm",
                data: {
                    data: data
                },
                context: this,
                success: function(responses) {
                    $("div.overlay-box").css("display", "none");
                    //var response = $.parseJSON(responses);
                    $(this).parents(".for-contact").find(".send-message").hide();
                    $(this).parents(".for-contact").find(".thankyou-display").show();

                    $("header.new-header .container .flex-box.nav-header .for-contact")
                        .find(".contact-form")
                        .slideUp();
                    $("header.new-header .container .flex-box.nav-header .for-contact")
                        .find(".contact-details")
                        .slideDown();
                },
            });
        }
    });

    // iccc

    // Header
    $("#step-email-signup-section .form-display .btn-action").click(function() {
        var email = $(this)
            .closest("div.form-display")
            .find("input[type='email']")
            .val();
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var source = $(this)
            .closest("div.form-display")
            .find("input[type='email']")
            .attr("data-source");
        var SourceMedium = $(this)
            .closest("div.form-display")
            .find("input[type='email']")
            .attr("data-source-medium");
        var SourceContent = $(this)
            .closest("div.form-display")
            .find("input[type='email']")
            .attr("data-source-content");
        var SourceDescription = $(this)
            .closest("div.form-display")
            .find("input[type='email']")
            .attr("data-source-description");
        var ProspectStage = "EmailOnly";
        $(".validation").remove();

        if (email.length == 0) {
            $(this)
                .closest("div.form-display")
                .find("input[type='email']")
                .after(
                    '<div class="validation" style="margin-top: -10px!important;">Please enter email address</div>'
                );
            $(this).closest("div.form-display").find("input[type='email']").focus();
        } else if (!filter.test(email)) {
            $(this)
                .closest("div.form-display")
                .find("input[type='email']")
                .after(
                    '<div class="validation" style="margin-top: -10px!important;">Please enter valid email address</div>'
                );
            $(this).closest("div.form-display").find("input[type='email']").focus();
        } else if (filter.test(email)) {
            $("div.overlay-box").css("display", "block");
            $.ajax({
                type: "POST",
                url: base_url + "login/validateEmail",
                data: {
                    email: email
                },
                success: function(responses) {
                    $("div.overlay-box").css("display", "none");
                    var response = $.parseJSON(responses);
                    if (response.status == "404") {
                        window.location.href = base_url + "login?email=" + email;
                    } else {
                        $("div.overlay-box").css("display", "block");
                        $.ajax({
                            type: "POST",
                            url: base_url + "login/emailSignup",
                            data: {
                                name: "email",
                                email: email,
                                SourceMedium: SourceMedium
                            },
                            success: function(response) {
                                //$("div.overlay-box").css("display", "none");
                                var json = $.parseJSON(response);
                                if (json.status == 404) {
                                    window.location.href = base_url + "login?email=" + email;
                                } else if (json.status == 200) {
                                    emailSignupLeadsquare(
                                        email,
                                        ProspectStage,
                                        source,
                                        SourceMedium,
                                        SourceContent,
                                        SourceDescription
                                    );
                                    if (json.url) {
                                        window.location.href = json.url;
                                    } else {
                                        window.location.href = base_url + "assess/dashboard";
                                    }

                                }
                            },
                        });
                    }
                },
            });
        }
    });

    $("#step-form-section-student .form-display .btn-action ").click(function() {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var email = $(this).closest("form").find("input[type='email']").val();
        var name = $(this).closest("form").find("input[name='name']").val();
        var contact = $(this).closest("form").find("input[name='contact']").val();
        var comment = $(this)
            .closest("form")
            .find("textarea[name='comment']")
            .val();
        var helpFor = $(this).closest("form").find("select[name='helpFor']").val();
        var clength = comment.replace(/\s/g, "");
        $(this).closest("form").find(".validation").remove(); // remove it
        if (name.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='name']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your name</div>'
                );
            $(this).closest("form").find("input[name='name']").focus();
            return false;
        } else if (contact.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='contact']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your contact number</div>'
                );
            $(this).closest("form").find("input[name='contact']").focus();
            return false;
        } else if ($.isNumeric(contact) == false || contact.length < 10) {
            $(this)
                .closest("form")
                .find("input[name='contact']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid contact number</div>'
                );
            $(this).closest("form").find("input[name='contact']").focus();
            return false;
        } else if (email.length == 0) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!filter.test(email)) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!helpFor) {
            $(this)
                .closest("form")
                .find("select[name='helpFor']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please select your option</div>'
                );
            return false;
        } else if (comment.length == 0) {
            $(this)
                .closest("form")
                .find("textarea[name='comment']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your message</div>'
                );
            $(this).closest("form").find("textarea[name='comment']").focus();
            return false;
        } else {
            $("div.overlay-box").css("display", "block");
            var data = $("#liberal-art-help-form").serialize();
            $.ajax({
                type: "POST",
                url: base_url + "prelogin/collegeApplication",
                data: {
                    data: data
                },
                context: this,
                success: function(responses) {
                    $("div.overlay-box").css("display", "none");
                    //var response = $.parseJSON(responses);
                    $(this)
                        .parents("#step-form-section-student")
                        .find(".form-display")
                        .hide();
                    $(this)
                        .parents("#step-form-section-student")
                        .find(".thankyou-display")
                        .show();
                },
            });
        }
    });

    $("#step-form-section-cdp .form-display .btn-action ").click(function() {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var email = $(this).closest("form").find("input[type='email']").val();
        var school = $(this).closest("form").find("input[name='school']").val();
        var contact = $(this).closest("form").find("input[name='mobile']").val();
        var message = $(this)
            .closest("form")
            .find("textarea[name='message']")
            .val();
        // var clength = comment.replace(/\s/g, '');
        $(this).closest("form").find(".validation").remove(); // remove it
        if (!school) {
            $(this)
                .closest("form")
                .find("input[name='school']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your school name</div>'
                );
            $(this).closest("form").find("input[name='school']").focus();
            return false;
        } else if (email.length == 0) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!filter.test(email)) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (contact.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='mobile']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your contact number</div>'
                );
            $(this).closest("form").find("input[name='mobile']").focus();
            return false;
        } else if ($.isNumeric(contact) == false || contact.length < 10) {
            $(this)
                .closest("form")
                .find("input[name='mobile']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid contact number</div>'
                );
            $(this).closest("form").find("input[name='mobile']").focus();
            return false;
        } else if (message.length == 0) {
            $(this)
                .closest("form")
                .find("textarea[name='message']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your message</div>'
                );
            $(this).closest("form").find("textarea[name='message']").focus();
            return false;
        } else {
            /*
            else if (clength.length <20) {
                 $("#nature-query").next(".validation").remove(); // remove it
                 $(this).closest("form").find("textarea[name='message']").next(".validation").remove(); // remove it
                 $(this).closest("form").find("textarea[name='message']").after('<div class="validation">Enter a minimum of 20 characters</div>');
                 $(this).closest("form").find("textarea[name='message']").focus();
                 return false;
            }*/
            $("div.overlay-box").css("display", "block");
            var data = $("#career-developement-programs").serialize();
            $.ajax({
                type: "POST",
                url: base_url + "prelogin/schoolLanding",
                data: {
                    school: school,
                    email: email,
                    mobile: contact,
                    message: message,
                },
                context: this,
                success: function(responses) {
                    $("div.overlay-box").css("display", "none");
                    //var response = $.parseJSON(responses);
                    $(this)
                        .parents("#step-form-section-cdp")
                        .find(".form-display")
                        .hide();
                    $(this)
                        .parents("#step-form-section-cdp")
                        .find(".thankyou-display")
                        .show();
                },
            });
        }
    });

    /*New school landing page form*/
    $(".footer-school-form #program-form-section .programFormSubmit").click(function() {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var name = $(this).closest("form").find("input[name='name']").val();
        var no_of_students = $(this).closest("form").find("input[name='no_of_students']").val();
        var designation = $(this).closest("form").find("input[name='designation']").val();
        var email = $(this).closest("form").find("input[type='email']").val();
        var school = $(this).closest("form").find("input[name='school']").val();
        var contact = $(this).closest("form").find("input[name='mobile']").val();
        var message = $(this)
            .closest("form")
            .find("textarea[name='message']")
            .val();
        // var clength = comment.replace(/\s/g, '');
        $(this).closest("form").find(".validation").remove(); // remove it
        if (name.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='name']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter name</div>'
                );
            $(this).closest("form").find("input[name='name']").focus();
            return false;
        } else if (contact.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='mobile']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your contact number</div>'
                );
            $(this).closest("form").find("input[name='mobile']").focus();
            return false;

        } else if ($.isNumeric(contact) == false || contact.length < 10) {
            $(this)
                .closest("form")
                .find("input[name='mobile']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid contact number</div>'
                );
            $(this).closest("form").find("input[name='mobile']").focus();
            return false;

        } else if (email.length == 0) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!filter.test(email)) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!school) {
            $(this)
                .closest("form")
                .find("input[name='school']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your school name</div>'
                );
            $(this).closest("form").find("input[name='school']").focus();
            return false;
        } else if (no_of_students.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='no_of_students']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter no of students</div>'
                );
            $(this).closest("form").find("input[name='no_of_students']").focus();
            return false;
        } else if (designation.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='designation']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter designation</div>'
                );
            $(this).closest("form").find("input[name='designation']").focus();
            return false;
        } else if (message.length == 0) {
            $(this)
                .closest("form")
                .find("textarea[name='message']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your message</div>'
                );
            $(this).closest("form").find("textarea[name='message']").focus();
            return false;
        } else {
            /*
            else if (clength.length <20) {
                 $("#nature-query").next(".validation").remove(); // remove it
                 $(this).closest("form").find("textarea[name='message']").next(".validation").remove(); // remove it
                 $(this).closest("form").find("textarea[name='message']").after('<div class="validation">Enter a minimum of 20 characters</div>');
                 $(this).closest("form").find("textarea[name='message']").focus();
                 return false;
            }*/
            $("div.overlay-box").css("display", "block");
            var data = $("#career-developement-programs").serialize();
            $.ajax({
                type: "POST",
                url: base_url + "prelogin/schoolLanding",
                data: {
                    school: school,
                    designation: designation,
                    no_of_students: no_of_students,
                    name: name,
                    email: email,
                    mobile: contact,
                    message: message,
                },
                context: this,
                success: function(responses) {
                    $("div.overlay-box").css("display", "none");
                    //var response = $.parseJSON(responses);
                    $(".footer-school-form #program-form-section").hide();
                    $(".footer-school-form #program-message-section").show();
                },
            });
        }
    });

    $("#myEnquiryForm #program-form-section .programFormSubmit").click(function() {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var name = $(this).closest("form").find("input[name='name']").val();
        var no_of_students = $(this).closest("form").find("input[name='no_of_students']").val();
        var designation = $(this).closest("form").find("input[name='designation']").val();
        var email = $(this).closest("form").find("input[type='email']").val();
        var school = $(this).closest("form").find("input[name='school']").val();
        var contact = $(this).closest("form").find("input[name='mobile']").val();
        var message = $(this)
            .closest("form")
            .find("textarea[name='message']")
            .val();
        // var clength = comment.replace(/\s/g, '');
        $(this).closest("form").find(".validation").remove(); // remove it
        if (name.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='name']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter name</div>'
                );
            $(this).closest("form").find("input[name='name']").focus();
            return false;
        } else if (contact.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='mobile']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your contact number</div>'
                );
            $(this).closest("form").find("input[name='mobile']").focus();
            return false;

        } else if ($.isNumeric(contact) == false || contact.length < 10) {
            $(this)
                .closest("form")
                .find("input[name='mobile']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid contact number</div>'
                );
            $(this).closest("form").find("input[name='mobile']").focus();
            return false;

        } else if (email.length == 0) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!filter.test(email)) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!school) {
            $(this)
                .closest("form")
                .find("input[name='school']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your school name</div>'
                );
            $(this).closest("form").find("input[name='school']").focus();
            return false;
        } else if (no_of_students.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='no_of_students']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter no of students</div>'
                );
            $(this).closest("form").find("input[name='no_of_students']").focus();
            return false;
        } else if (designation.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='designation']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter designation</div>'
                );
            $(this).closest("form").find("input[name='designation']").focus();
            return false;
        } else if (message.length == 0) {
            $(this)
                .closest("form")
                .find("textarea[name='message']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your message</div>'
                );
            $(this).closest("form").find("textarea[name='message']").focus();
            return false;
        } else {
            /*
            else if (clength.length <20) {
                 $("#nature-query").next(".validation").remove(); // remove it
                 $(this).closest("form").find("textarea[name='message']").next(".validation").remove(); // remove it
                 $(this).closest("form").find("textarea[name='message']").after('<div class="validation">Enter a minimum of 20 characters</div>');
                 $(this).closest("form").find("textarea[name='message']").focus();
                 return false;
            }*/
            $("div.overlay-box").css("display", "block");
            var data = $("#career-developement-programs").serialize();
            $.ajax({
                type: "POST",
                url: base_url + "prelogin/schoolLanding",
                data: {
                    school: school,
                    designation: designation,
                    no_of_students: no_of_students,
                    name: name,
                    email: email,
                    mobile: contact,
                    message: message,
                },
                context: this,
                success: function(responses) {
                    $("div.overlay-box").css("display", "none");
                    //var response = $.parseJSON(responses);
                    $("#myEnquiryForm #program-form-section").hide();
                    $("#myEnquiryForm #program-message-section").show();
                },
            });
        }
    });

    /*end form */

    $("#step-form-section-cap .form-display .btn-action ").click(function() {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var email = $(this).closest("form").find("input[type='email']").val();
        var school = $(this).closest("form").find("input[name='school']").val();
        var contact = $(this).closest("form").find("input[name='contact']").val();
        var comment = $(this)
            .closest("form")
            .find("textarea[name='comment']")
            .val();
        var interest = $(this)
            .closest("form")
            .find("select[name='interest']")
            .val();
        var clength = comment.replace(/\s/g, "");
        $(this).closest("form").find(".validation").remove(); // remove it
        if (school.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='school']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your school name</div>'
                );
            $(this).closest("form").find("input[name='school']").focus();
            return false;
        } else if (contact.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='contact']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your contact number</div>'
                );
            $(this).closest("form").find("input[name='contact']").focus();
            return false;
        } else if ($.isNumeric(contact) == false || contact.length < 10) {
            $(this)
                .closest("form")
                .find("input[name='contact']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid contact number</div>'
                );
            $(this).closest("form").find("input[name='contact']").focus();
            return false;
        } else if (email.length == 0) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!filter.test(email)) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!interest) {
            $(this)
                .closest("form")
                .find("select[name='interest']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please select your interest</div>'
                );
            return false;
        } else if (comment.length == 0) {
            $(this)
                .closest("form")
                .find("textarea[name='comment']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your message</div>'
                );
            $(this).closest("form").find("textarea[name='comment']").focus();
            return false;
        } else {
            /*
            else if (clength.length <20) {
                 $("#nature-query").next(".validation").remove(); // remove it
                 $(this).closest("form").find("textarea[name='comment']").next(".validation").remove(); // remove it
                 $(this).closest("form").find("textarea[name='comment']").after('<div class="validation">Enter a minimum of 20 characters</div>');
                 $(this).closest("form").find("textarea[name='comment']").focus();
                 return false;
            }*/
            $("div.overlay-box").css("display", "block");
            var data = $("#career-advancement-programs").serialize();
            $.ajax({
                type: "POST",
                url: base_url + "prelogin/careerAdvancedPrograms",
                data: {
                    data: data
                },
                context: this,
                success: function(responses) {
                    $("div.overlay-box").css("display", "none");
                    //var response = $.parseJSON(responses);
                    $(this)
                        .parents("#step-form-section-cap")
                        .find(".form-display")
                        .hide();
                    $(this)
                        .parents("#step-form-section-cap")
                        .find(".thankyou-display")
                        .show();
                },
            });
        }
    });

    $("#step-iccc-section .form-display .btn-action ").click(function() {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var email = $(this).closest("form").find("input[type='email']").val();
        var name = $(this).closest("form").find("input[name='name']").val();
        var password = $(this).closest("form").find("input[name='password']").val();

        $(this).closest("form").find(".validation").remove(); // remove it
        if (name.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='name']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your name</div>'
                );
            $(this).closest("form").find("input[name='name']").focus();
            return false;
        } else if (email.length == 0) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (!filter.test(email)) {
            $(this)
                .closest("form")
                .find("input[type='email']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter valid email address</div>'
                );
            $(this).closest("form").find("input[type='email']").focus();
            return false;
        } else if (password.length == 0) {
            $(this)
                .closest("form")
                .find("input[name='password']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Please enter your password</div>'
                );
            $(this).closest("form").find("input[name='password']").focus();
            return false;
        } else if (password.length < 6) {
            $(this)
                .closest("form")
                .find("input[name='password']")
                .after(
                    '<div style="margin-top: -10px!important;" class="validation">Your password length should be greater then 5 character.</div>'
                );
            $(this).closest("form").find("input[name='password']").focus();
            return false;
        } else {
            $(".validation").remove();
            $("div.overlay-box").css("display", "block");
            var data = $(this).closest("form").serialize();
            $.ajax({
                type: "POST",
                url: base_url + "prelogin/icccSignup",
                data: {
                    data: data
                },
                context: this,
                success: function(responses) {
                    $("div.overlay-box").css("display", "none");
                    var response = $.parseJSON(responses);
                    if (response.isExist == 1) {
                        $(this)
                            .closest("form")
                            .find("input[type='email']")
                            .next(".validation")
                            .remove(); // remove it
                        $(this)
                            .closest("form")
                            .find("input[type='email']")
                            .after(
                                '<div style="margin-top: -10px!important;" class="validation">Sorry! This email id already exist</div>'
                            );
                        $(this).closest("form").find("input[type='email']").focus();
                        return false;
                    } else if (response.status == 200) {
                        window.location.href = base_url + "iccc-foundation";
                    }
                },
            });
        }
    });

    $("#step-form-section-professional .form-display .btn-action ").click(
        function() {
            var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
            var name = $(this).closest("form").find("input[name='name']").val();
            var email = $(this).closest("form").find("input[type='email']").val();
            var occupation = $(this)
                .closest("form")
                .find("input[name='occupation']")
                .val();
            var contact = $(this).closest("form").find("input[name='contact']").val();
            var comment = $(this)
                .closest("form")
                .find("textarea[name='comment']")
                .val();

            $(this).closest("form").find(".validation").remove(); // remove it
            if (name.length == 0) {
                $(this)
                    .closest("form")
                    .find("input[name='name']")
                    .after(
                        '<div style="margin-top: -10px!important;" class="validation">Please enter your name</div>'
                    );
                $(this).closest("form").find("input[name='name']").focus();
                return false;
            } else if (contact.length == 0) {
                $(this)
                    .closest("form")
                    .find("input[name='contact']")
                    .after(
                        '<div style="margin-top: -10px!important;" class="validation">Please enter your contact number</div>'
                    );
                $(this).closest("form").find("input[name='contact']").focus();
                return false;
            } else if ($.isNumeric(contact) == false || contact.length < 10) {
                $(this)
                    .closest("form")
                    .find("input[name='contact']")
                    .after(
                        '<div style="margin-top: -10px!important;" class="validation">Please enter valid contact number</div>'
                    );
                $(this).closest("form").find("input[name='contact']").focus();
                return false;
            } else if (email.length == 0) {
                $(this)
                    .closest("form")
                    .find("input[type='email']")
                    .after(
                        '<div style="margin-top: -10px!important;" class="validation">Please enter email address</div>'
                    );
                $(this).closest("form").find("input[type='email']").focus();
                return false;
            } else if (!filter.test(email)) {
                $(this)
                    .closest("form")
                    .find("input[type='email']")
                    .after(
                        '<div style="margin-top: -10px!important;" class="validation">Please enter valid email address</div>'
                    );
                $(this).closest("form").find("input[type='email']").focus();
                return false;
            } else if (!occupation) {
                $(this)
                    .closest("form")
                    .find("input[name='occupation']")
                    .after(
                        '<div style="margin-top: -10px!important;" class="validation">Please enter your occupation</div>'
                    );
                $(this).closest("form").find("input[type='occupation']").focus();
                return false;
            } else if (comment.length == 0) {
                $(this)
                    .closest("form")
                    .find("textarea[name='comment']")
                    .after(
                        '<div style="margin-top: -10px!important;" class="validation">Please enter your message</div>'
                    );
                $(this).closest("form").find("textarea[name='comment']").focus();
                return false;
            } else {
                /*
    else if (clength.length <20) {
         $("#nature-query").next(".validation").remove(); // remove it
         $(this).closest("form").find("textarea[name='comment']").next(".validation").remove(); // remove it
         $(this).closest("form").find("textarea[name='comment']").after('<div class="validation">Enter a minimum of 20 characters</div>');
         $(this).closest("form").find("textarea[name='comment']").focus();
         return false;
    }*/
                $("div.overlay-box").css("display", "block");
                var data = $("#partnering-with-mindler").serialize();
                $.ajax({
                    type: "POST",
                    url: base_url + "partner/contactUs",
                    data: {
                        data: data
                    },
                    context: this,
                    success: function(responses) {
                        $("div.overlay-box").css("display", "none");
                        //var response = $.parseJSON(responses);
                        $(this)
                            .parents("#step-form-section-professional")
                            .find(".form-display")
                            .hide();
                        $(this)
                            .parents("#step-form-section-professional")
                            .find(".thankyou-display")
                            .show();
                    },
                });
            }
        }
    );

    /*Email signup leadsquare*/
    function emailSignupLeadsquare(
        email,
        ProspectStage,
        source,
        SourceMedium,
        SourceContent,
        SourceDescription
    ) {
        $("div.overlay-box").css("display", "block");
        $.ajax({
            type: "POST",
            url: base_url + "login/emailSignupLeadsquare",
            data: {
                name: "email",
                email: email,
                ProspectStage: ProspectStage,
                source: source,
                SourceMedium: SourceMedium,
                SourceContent: SourceContent,
                SourceDescription: SourceDescription,
            },
            success: function(response) {
                $("div.overlay-box").css("display", "none");
            },
        });

        return true;
    }

    $("#student-program .section-box .tabs-click ul li").click(function(e) {
        e.preventDefault();
        var homeIndex = $(this).index();
        $(this).parents("ul").find("li").removeClass("active");
        $(this).addClass("active");
        $(this).parents("#student-program").find(".home-pagetab-details").hide();
        $(this)
            .parents("#student-program")
            .find(".home-pagetab-details")
            .eq(homeIndex)
            .show();
    });

    $("#student-program .home-pagetab-details .sub-section ul li").click(
        function(e) {
            e.preventDefault();
            var homeIndex = $(this).index();
            $(this).parents("ul").find("li").removeClass("active");
            $(this).addClass("active");
            $(this)
                .parents("#student-program .home-pagetab-details")
                .find(".row")
                .hide();
            $(this)
                .parents("#student-program .home-pagetab-details")
                .find(".row")
                .eq(homeIndex)
                .show();
        }
    );
});

$(".foundationpoup").click(function() {
    console.log($(this).text());
    var popup_id = $(this).attr("popup-id");

    $(
        ".landing-tabs .tab-details .left-tab li:nth-child(" + popup_id + ")"
    ).click();
    $("#myModalFoundation").show();
    $(".overlaybox1").show();
});

$(".advancedpoup").click(function() {
    var popup_id = $(this).attr("popup-id");

    $(
        ".landing-tabs .tab-details .left-tab li:nth-child(" + popup_id + ")"
    ).click();
    $("#myModalAdvanced").show();
    $(".overlaybox1").show();
});

$(".masterpoup").click(function() {
    var popup_id = $(this).attr("popup-id");
    $(
        ".landing-tabs .tab-details .left-tab li:nth-child(" + popup_id + ")"
    ).click();
    $("#myModalMaster").show();
    $(".overlaybox1").show();
});

$(".closepopup1").click(function() {
    $("#myModalMaster").hide();
    $("#myModalAdvanced").hide();
    $("#myModalFoundation").hide();
    $(".overlaybox1").hide();
});

function googleEvent(action, cateogry, label, value) {
    gtag("event", action, {
        event_category: cateogry,
        event_label: label,
        value: value,
    });

    return false;
}

// Badge And header changes
$(document).ready(function() {
    var value = $(this).find(".message-badge");
    if (value.length != 0) {
        $("header.new-header").css({
            top: $(".message-badge").height() + "px"
        });
    } else {
        $("header.new-header").css({
            top: "0px"
        });
    }
});


// $(document).ready(function() {
//     $(".add-green").click(function() {
//         $(".add-green").hide();
//         $(".remove-red").show();
//         $(".remove-red").css("display", "flex");
//         $(".graduate-service-list").css("border", "1px solid #8ACE49");
//     });

//     $(".remove-red").click(function() {
//         $(".remove-red").hide();
//         $(".add-green").show();
//         $(".graduate-service-list").css("border", "1px solid #E9E9E9");
//     });
// });
$(document).ready(function() {
    $('.home-pagetab ul li.student-red-bg.active').on('click', function() {
        $('#student-program').css('background', '#EA63700D');
    });
    $('.home-pagetab ul li.university-purple-bg').on('click', function() {
        $('#student-program').css('background', '#f9f6fc');
    });
    $('.home-pagetab ul li.professional-blue-bg').on('click', function() {
        $('#student-program').css('background', '#f5fbfc');
    });
});

$(".shoppingcart").click(function() {
    $('html, body').animate({
        scrollTop: eval($('#graduate-user-customplan' + $(this).attr('target')).offset().top - 70)
    }, 1000);
});

// Mindler School Career Guidance Ecosystem Section 
$(document).ready(function() {
    $(".steps-block-1 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 1) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }

        $(".steps-block-1 .steps-view-detail").hide();
        $(".steps-block-1 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-1 .steps-title h3").css("color", "#fff");
        $(".steps-block-1").css("background", "#8964BF");
        $("#steps-info.step-1").show(500);
        $("#steps-info.step-1").css("display", "inline-block");
    });
    $(".steps-block-1 .steps-hide-detail").click(function() {
        $(".steps-block-1 .steps-hide-detail").hide();
        $(".steps-block-1 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-1 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-1").css("background", "#fff");
        $("#steps-info.step-1").hide(500);
    });
    $(".steps-block-2 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 2) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-2 .steps-view-detail").hide();
        $(".steps-block-2 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-2 .steps-title h3").css("color", "#fff");
        $(".steps-block-2").css("background", "#8964BF");
        $("#steps-info.step-2").show(500);
        $("#steps-info.step-2").css("display", "inline-block");
    });
    $(".steps-block-2 .steps-hide-detail").click(function() {
        $(".steps-block-2 .steps-hide-detail").hide();
        $(".steps-block-2 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-2 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-2").css("background", "#fff");
        $("#steps-info.step-2").hide(500);
    });
    $(".steps-block-3 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 3) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-3 .steps-view-detail").hide();
        $(".steps-block-3 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-3 .steps-title h3").css("color", "#fff");
        $(".steps-block-3").css("background", "#8964BF");
        $("#steps-info.step-3").show(500);
        $("#steps-info.step-3").css("display", "inline-block");
    });
    $(".steps-block-3 .steps-hide-detail").click(function() {
        $(".steps-block-3 .steps-hide-detail").hide();
        $(".steps-block-3 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-3 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-3").css("background", "#fff");
        $("#steps-info.step-3").hide(500);
    });
    $(".steps-block-4 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 4) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-4 .steps-view-detail").hide();
        $(".steps-block-4 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-4 .steps-title h3").css("color", "#fff");
        $(".steps-block-4").css("background", "#8964BF");
        $("#steps-info.step-4").show(500);
        $("#steps-info.step-4").css("display", "inline-block");
    });
    $(".steps-block-4 .steps-hide-detail").click(function() {
        $(".steps-block-4 .steps-hide-detail").hide();
        $(".steps-block-4 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-4 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-4").css("background", "#fff");
        $("#steps-info.step-4").hide(500);
    });
    $(".steps-block-5 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 5) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-5 .steps-view-detail").hide();
        $(".steps-block-5 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-5 .steps-title h3").css("color", "#fff");
        $(".steps-block-5").css("background", "#8964BF");
        $("#steps-info.step-5").show(500);
        $("#steps-info.step-5").css("display", "inline-block");
    });
    $(".steps-block-5 .steps-hide-detail").click(function() {
        $(".steps-block-5 .steps-hide-detail").hide();
        $(".steps-block-5 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-5 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-5").css("background", "#fff");
        $("#steps-info.step-5").hide(500);
    });
    $(".steps-block-6 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 6) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-6 .steps-view-detail").hide();
        $(".steps-block-6 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-6 .steps-title h3").css("color", "#fff");
        $(".steps-block-6").css("background", "#8964BF");
        $("#steps-info.step-6").show(500);
        $("#steps-info.step-6").css("display", "inline-block");
    });
    $(".steps-block-6 .steps-hide-detail").click(function() {
        $(".steps-block-6 .steps-hide-detail").hide();
        $(".steps-block-6 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-6 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-6").css("background", "#fff");
        $("#steps-info.step-6").hide(500);
    });
    $(".steps-block-7 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 7) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-7 .steps-view-detail").hide();
        $(".steps-block-7 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-7 .steps-title h3").css("color", "#fff");
        $(".steps-block-7").css("background", "#8964BF");
        $("#steps-info.step-7").show(500);
        $("#steps-info.step-7").css("display", "inline-block");
    });
    $(".steps-block-7 .steps-hide-detail").click(function() {
        $(".steps-block-7 .steps-hide-detail").hide();
        $(".steps-block-7 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-7 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-7").css("background", "#fff");
        $("#steps-info.step-7").hide(500);
    });
    $(".steps-block-8 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 8) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-8 .steps-view-detail").hide();
        $(".steps-block-8 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-8 .steps-title h3").css("color", "#fff");
        $(".steps-block-8").css("background", "#8964BF");
        $("#steps-info.step-8").show(500);
        $("#steps-info.step-8").css("display", "inline-block");
    });
    $(".steps-block-8 .steps-hide-detail").click(function() {
        $(".steps-block-8 .steps-hide-detail").hide();
        $(".steps-block-8 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-8 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-8").css("background", "#fff");
        $("#steps-info.step-8").hide(500);
    });
    $(".steps-block-9 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 9) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-9 .steps-view-detail").hide();
        $(".steps-block-9 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-9 .steps-title h3").css("color", "#fff");
        $(".steps-block-9").css("background", "#8964BF");
        $("#steps-info.step-9").show(500);
        $("#steps-info.step-9").css("display", "inline-block");
    });
    $(".steps-block-9 .steps-hide-detail").click(function() {
        $(".steps-block-9 .steps-hide-detail").hide();
        $(".steps-block-9 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-9 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-9").css("background", "#fff");
        $("#steps-info.step-9").hide(500);
    });
    $(".steps-block-10 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 10) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-10 .steps-view-detail").hide();
        $(".steps-block-10 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-10 .steps-title h3").css("color", "#fff");
        $(".steps-block-10").css("background", "#8964BF");
        $("#steps-info.step-10").show(500);
        $("#steps-info.step-10").css("display", "inline-block");
    });
    $(".steps-block-10 .steps-hide-detail").click(function() {
        $(".steps-block-10 .steps-hide-detail").hide();
        $(".steps-block-10 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-10 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-10").css("background", "#fff");
        $("#steps-info.step-10").hide(500);
    });
    $(".steps-block-11 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 11) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-11 .steps-view-detail").hide();
        $(".steps-block-11 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-11 .steps-title h3").css("color", "#fff");
        $(".steps-block-11").css("background", "#8964BF");
        $("#steps-info.step-11").show(500);
        $("#steps-info.step-11").css("display", "inline-block");
    });
    $(".steps-block-11 .steps-hide-detail").click(function() {
        $(".steps-block-11 .steps-hide-detail").hide();
        $(".steps-block-11 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-11 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-11").css("background", "#fff");
        $("#steps-info.step-11").hide(500);
    });
    $(".steps-block-12 .steps-view-detail").click(function() {
        for (var i = 1; i <= 12; i++) {
            if (i != 12) {
                var stepBlockClassOne = '.steps-block-' + i + ' .steps-hide-detail';
                var stepBlockClassTwo = '.steps-block-' + i + ' .steps-view-detail';
                var stepBlockClassThree = '#career-guidance-steps .steps-block-' + i + ' .steps-title h3';
                var stepBlockClassFour = '.steps-block-' + i;
                var stepBlockClassFive = '#steps-info.step-' + i;
                $(stepBlockClassOne).hide();
                $(stepBlockClassTwo).show();
                $(stepBlockClassThree).css("color", "#8964BF");
                $(stepBlockClassFour).css("background", "#fff");
                $(stepBlockClassFive).hide();
            }
        }
        $(".steps-block-12 .steps-view-detail").hide();
        $(".steps-block-12 .steps-hide-detail").show();
        $("#career-guidance-steps .steps-block-12 .steps-title h3").css("color", "#fff");
        $(".steps-block-12").css("background", "#8964BF");
        $("#steps-info.step-12").show(500);
        $("#steps-info.step-12").css("display", "inline-block");
    });
    $(".steps-block-12 .steps-hide-detail").click(function() {
        $(".steps-block-12 .steps-hide-detail").hide();
        $(".steps-block-12 .steps-view-detail").show();
        $("#career-guidance-steps .steps-block-12 .steps-title h3").css("color", "#8964BF");
        $(".steps-block-12").css("background", "#fff");
        $("#steps-info.step-12").hide(500);
    });

    // Smooth scroll for Mindler School Nav section
    $('#nav-section a[href*=\\#]:not([href=\\#])').on('click', function() {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
            return false;
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // Reset the flag in sessionStorage every time the page is loaded
    sessionStorage.setItem('chatButtonClicked', 'false');

    // visible after 10s
    const modalTimeout = setTimeout(() => {
        $('#myPopUpModal').modal('show');
    }, 10000);

    // Add an event listener to the 'Let’s chat!' button
    document.querySelector('.start-chat-btn').addEventListener('click', () => {
        // Prevent the popup modal from being visible
        clearTimeout(modalTimeout);
        sessionStorage.setItem('chatButtonClicked', 'true');
    });
});
// JavaScript to handle button click and open the iframe with the correct data
document.querySelectorAll('.start-chat-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        var buttonId = event.target.getAttribute('data-button-id');

        // Set the iframe src based on the button clicked
        var iframe = document.getElementById('myOrionIframe');
        var host = window.location.hostname;
        var orian_url = "";

        if (host == 'preproduction.mindler.com' || host == 'live.mindler.com') {
            orian_url = "https://b2corionqa.mindler.com";
        } else {
            orian_url = "https://b2corion.mindler.com";
        }
        console.log(host, buttonId, orian_url);
        iframe.src = orian_url + "?source=" + buttonId;
    });
});
document.querySelectorAll('.ai-pop-up-start-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        var buttonId = event.target.getAttribute('data-button-id');

        // Set the iframe src based on the button clicked
        var iframe = document.getElementById('myOrionIframe');
        var host = window.location.hostname;
        var orian_url = "";

        if (host == 'preproduction.mindler.com' || host == 'live.mindler.com') {
            orian_url = "https://b2corionqa.mindler.com";
        } else {
            orian_url = "https://b2corion.mindler.com";
        }
        console.log(host, buttonId, orian_url, orian_url + "?source=" + buttonId);
        iframe.src = orian_url + "?source=" + buttonId;
    });
});
// function setModalSource(source) {
//     // Update the URL hash
//     window.location.hash = "source=" + source;
//   }
//  $('#myModalOrion').on('show.bs.modal', function (e) {
//     // Get the fragment from the URL
//     var source = window.location.hash;

//     // Set the iframe's src based on the fragment
//     var iframe = document.getElementById('myOrionIframe');
//     var host = window.location.origin;
// console.log(host,source,"pppppppppppppp");
//     iframe.src = "http://your-nodejs-api-url.com" + source;
//   });