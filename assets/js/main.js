(function($) {
    "use strict";

    /*---------------------------------
    Sticky header
    -----------------------------------*/
    var $window = $(window);
    $window.on('scroll', function() {
        var scroll = $window.scrollTop();
        if (scroll < 300) {
            $(".sticker").removeClass("sticky");
        } else {
            $(".sticker").addClass("sticky");
        }
    });
    /*---------------------------------
    Header Cart
    -----------------------------------*/
    var headerActionToggle = $('.drop-toggle');
    var headerActionDropdown = $('.drop-dropdown');
    // Toggle Header Cart
    headerActionToggle.on("click", function() {
        var $this = $(this);
        headerActionDropdown.slideUp();
        if ($this.siblings('.drop-dropdown').is(':hidden')) {
            $this.siblings('.drop-dropdown').slideDown();
        } else {
            $this.siblings('.drop-dropdown').slideUp();
        }
    });
    // Prevent closing Header Cart upon clicking inside the Header Cart
    $('.drop-dropdown').on('click', function(e) {
        e.stopPropagation();
    });

    // Nice Select
    $('.select-option').niceSelect()

    // category trigger
    $(".category-toggle").click(function() {
        $(".category-dropdown").slideToggle();
    });

    // categories Item Show Hide
    $(".category-item-parent.hidden").hide();
    $(".more-btn").on('click', function(e) {
        e.preventDefault();
        $(".category-item-parent.hidden").toggle(500);
        var htmlAfter = "Hide categoryes";
        var htmlBefore = "More categoryes";

        $(this).html($(this).text() == htmlAfter ? htmlBefore : htmlAfter);
        $(this).toggleClass("minus");
    });

    /*---------------------------------
    Slider
    -----------------------------------*/

    // Slider One
    $('.slider-one').slick({
        dots: true,
        arrows: false,
    });

    // Slider Two Full Slider
    $('.slider-two').slick({
        dots: true,
        arrows: false,
    });

    /*---------------------------------
    Product Offer Slider
    -----------------------------------*/
    $('.product-offer-slider').slick({
        dots: false,
        arrows: false,
    });
    /*---------------------------------
    Product Thing Carouse
    -----------------------------------*/
    $('.product-thing').slick({
        dots: false,
        nextArrow: '<i class="fa fa-angle-right arrow-right arrow-button"></i>',
        prevArrow: '<i class="fa fa-angle-left arrow-left arrow-button"></i>',
        slidesToShow: 5,
        infinite: true,
        responsive: [{
                breakpoint: 0,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    });
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
            $('.product-thing').slick('setPosition');
        })
        /*---------------------------------
        Product Thing Tab Carousel
        -----------------------------------*/
    $('.product-thing-tab').slick({
        dots: false,
        arrows: false,
        slidesToShow: 5,
        infinite: true,
        responsive: [{
                breakpoint: 0,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    });
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
            $('.product-thing-tab').slick('setPosition');
        })
        /*---------------------------------
        Feature Carousel
        -----------------------------------*/
    $('.feature-carousel').slick({
        dots: false,
        nextArrow: '<i class="fa fa-angle-right arrow-right arrow-button"></i>',
        prevArrow: '<i class="fa fa-angle-left arrow-left arrow-button"></i>',
    });
    /*---------------------------------
    Blog Slider
    -----------------------------------*/
    $('.blog-slider').slick({
        dots: false,
        nextArrow: '<i class="fa fa-angle-left arrow-right arrow-button"></i>',
        prevArrow: '<i class="fa fa-angle-right arrow-left arrow-button"></i>',
    });
    /*---------------------------------
    Brand Logo Carousel
    -----------------------------------*/
    $('.brand-logo').slick({
        dots: false,
        arrows: false,
        slidesToShow: 6,
        responsive: [{
                breakpoint: 0,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5
                }
            }
        ]
    });
    /*---------------------------------
    Blog Post Carousel
    -----------------------------------*/
    $('.blog-post-carousel').slick({
        dots: false,
        nextArrow: '<i class="fa fa-angle-right arrow-right arrow-button"></i>',
        prevArrow: '<i class="fa fa-angle-left arrow-left arrow-button"></i>',
    });
    /*---------------------------------
    Testimonial Carousel
    -----------------------------------*/
    $('.testimonial-carousel').slick({
        dots: false,
        nextArrow: '<i class="fa fa-angle-right arrow-right arrow-button"></i>',
        prevArrow: '<i class="fa fa-angle-left arrow-left arrow-button"></i>',
    });
    /*---------------------------------
    Product Carousel Home 2
    -----------------------------------*/
    $('.product-carousel-home2').slick({
        dots: false,
        nextArrow: '<i class="fa fa-angle-right arrow-right arrow-button"></i>',
        prevArrow: '<i class="fa fa-angle-left arrow-left arrow-button"></i>',
        slidesToShow: 4,
        infinite: true,
        responsive: [{
                breakpoint: 0,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
            $('.product-carousel-home2').slick('setPosition');
        })
        /*---------------------------------
        Product Details Slider
        -----------------------------------*/
        /*---------------------------------
        Product Details Slider
        -----------------------------------*/
    $('.product-slider-container').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: '<i class="fa fa-angle-left arrow-right arrow-button"></i>',
        prevArrow: '<i class="fa fa-angle-right arrow-left arrow-button"></i>',
        fade: true,
        accessibility: false,
        asNavFor: '.product-details-thumbnail, .product-thumbnail-vertical',
    });
    $('.product-details-thumbnail').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-slider-container',
        nextArrow: '<i class="fa fa-angle-left arrow-right arrow-button"></i>',
        prevArrow: '<i class="fa fa-angle-right arrow-left arrow-button"></i>',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [{
                breakpoint: 340,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });
    $('.product-thumbnail-vertical').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-slider-container',
        dots: false,
        vertical: true,
        verticalScrolling: true,
        centerMode: false,
        focusOnSelect: true,
        arrows: false,
        responsive: [{
                breakpoint: 340,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });

    /*---------------------------------
    Product Details Slider box Activation
    -----------------------------------*/
    $('.product-sliderbox').slick({
        dots: false,
        nextArrow: '<i class="fa fa-angle-left arrow-right arrow-button"></i>',
        prevArrow: '<i class="fa fa-angle-right arrow-left arrow-button"></i>',
        slidesToShow: 3,
        responsive: [{
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });
    /*---------------------------------
	Magnific Popup Activation
	-----------------------------------*/
    $('.product-slider-container,.product-popup-container').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    /*---------------------------------
    Sticky Sidebar Activation
    -----------------------------------*/
    $('.sidebar-active').stickySidebar({
        topSpacing: 100,
        bottomSpacing: 0,
        minWidth: 767,
    });

    /*---------------------------------
    Countdown Activation
    -----------------------------------*/
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime(' <div class="single-countdown"><span class="single-countdown_time">%S</span><span class="single-countdown_text">ثانیه</span></div> <div class="single-countdown"><span class="single-countdown_time">%M</span><span class="single-countdown_text">دقیقه</span></div> <div class="single-countdown"><span class="single-countdown_time">%H</span><span class="single-countdown_text">ساعت</span></div> <div class="single-countdown"><span class="single-countdown_time">%D</span><span class="single-countdown_text">روز</span></div>'));
        });
    });
    /*--------------------------------- 
    canvas menu activation
    -----------------------------------*/
    $('.canvas_open').on('click', function() {
        $('.offcanvas_menu_wrapper,.offcanvas_overlay').addClass('active')
    });
    $('.canvas_close,.offcanvas_overlay').on('click', function() {
        $('.offcanvas_menu_wrapper,.offcanvas_overlay').removeClass('active')
    });
    /*---Off Canvas Menu---*/
    var $offcanvasNav = $('.offcanvas_main_menu, .sidebar-category-expand, .categories-expand'),
        $offcanvasNavSubMenu = $offcanvasNav.find('.sub-menu');
    $offcanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fa fa-angle-down"></i></span>');
    $offcanvasNavSubMenu.slideUp();
    $offcanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.siblings('ul').slideUp('slow');
            } else {
                $this.closest('li').siblings('li').find('ul:visible').slideUp('slow');
                $this.siblings('ul').slideDown('slow');
            }
        }
        if ($this.is('a') || $this.is('span') || $this.attr('clas').match(/\b(menu-expand)\b/)) {
            $this.parent().toggleClass('menu-open');
        } else if ($this.is('li') && $this.attr('class').match(/\b('menu-item-has-children')\b/)) {
            $this.toggleClass('menu-open');
        }
    });
    /*---------------------------------
    shop grid activation
    -----------------------------------*/
    $('.shop_toolbar_btn > button').on('click', function(e) {
        e.preventDefault();
        $('.shop_toolbar_btn > button').removeClass('active');
        $(this).addClass('active');
        var parentsDiv = $('.shop-wrapper');
        var viewMode = $(this).data('role');
        parentsDiv.removeClass('grid_3 grid_4 grid_list').addClass(viewMode);
        if (viewMode == 'grid_3') {
            parentsDiv.children().addClass('col-lg-3 col-md-4 col-sm-6').removeClass('col-lg-3 col-cust-5 col-12');
        }
        if (viewMode == 'grid_4') {
            parentsDiv.children().addClass('col-lg-3 col-md-4 col-sm-6').removeClass('col-lg-4 col-cust-5 col-12');
        }
        if (viewMode == 'grid_list') {
            parentsDiv.children().addClass('col-12').removeClass('col-lg-3 col-lg-4 col-md-4 col-sm-6 col-cust-5');
        }
    });
    /*---------------------------------
    Slider-range here
    -----------------------------------*/
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1000,
        values: [100, 900],
        slide: function(event, ui) {
            $("#amount").val( ui.values[0]+ " تومان - " +  ui.values[1]+ "تومان " );
        }
    });
    $("#amount").val( $("#slider-range").slider("values", 0)+" تومان - " +
          $("#slider-range").slider("values", 1)+" تومان ");
    /*---------------------------------
        Product Quantity
    -----------------------------------*/
    $('.qty-btn').on('click', function() {
        var $this = $(this);
        var oldValue = $this.siblings('input').val();
        if ($this.hasClass('plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $this.siblings('input').val(newVal);
    });
    /*--------------------------
    	ScrollUp
    ---------------------------- */
    function scrollToTop() {
        var $scrollUp = $('.scroll-to-top'),
            $lastScrollTop = 0,
            $window = $(window);
        $window.on('scroll', function() {
            var topPos = $(this).scrollTop();
            if (topPos > $lastScrollTop) {
                $scrollUp.removeClass('show');
            } else {
                if ($window.scrollTop() > 200) {
                    $scrollUp.addClass('show');
                } else {
                    $scrollUp.removeClass('show');
                }
            }
            $lastScrollTop = topPos;
        });
        $scrollUp.on('click', function(evt) {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
            evt.preventDefault();
        });
    }
    scrollToTop();
    /*--------------------------
    	Modal Activation
    ---------------------------- */
    $('.modal').on('shown.bs.modal', function(e) {
            $('.product_navactive').resize();
        })
        /*---------------------------------
        MailChimp
    -----------------------------------*/
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'
    });

    function mailChimpResponse(resp) {
        if (resp.result === 'success') {
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);
        } else if (resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }
    }
    /*---------------------------------
        Ajax Contact Form
    -----------------------------------*/
    $(function() {
        // Get the form.
        var form = $('#contact-form');
        // Get the messages div.
        var formMessages = $('.form-message');
        // Set up an event listener for the contact form.
        $(form).submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();
            // Serialize the form data.
            var formData = $(form).serialize();
            // Submit the form using AJAX.
            $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    data: formData
                })
                .done(function(response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass('error text-danger').addClass('success text-success learts-mt-10').text(response);
                    // Clear the form.
                    form.find('input:not([type="submit"]), textarea').val('');
                })
                .fail(function(data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass('success text-success').addClass('error text-danger mt-3');
                    // Set the message text.
                    if (data.responseText !== '') {
                        formMessages.text(data.responseText);
                    } else {
                        formMessages.text('Oops! An error occured and your message could not be sent.');
                    }
                });
        });
    });


})(jQuery);