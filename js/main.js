jQuery(document).ready(function ($) {

  'use strict';

  /* =====================
     MODAL
     ===================== */
  var modBtn = $('#modBtn'),
    modal = $('#modal'),
    close = modal.find('.close'),
    modContent = modal.find('.modal-content');

  modBtn.on('click', function () {
    modal.css('display', 'block');
    modContent.removeClass('modal-animated-out').addClass('modal-animated-in');
  });

  $(document).on('click', function (e) {
    var target = $(e.target);
    if (target.is(modal) || target.is(close)) {
      modContent.removeClass('modal-animated-in')
        .addClass('modal-animated-out')
        .delay(300)
        .queue(function (next) {
          modal.css('display', 'none');
          next();
        });
    }
  });

  /* =====================
     ACCORDION
     ===================== */
  $(".accordion > li:eq(0) a")
    .addClass("active")
    .next()
    .slideDown();

  $(".accordion a").click(function (e) {
    var dropDown = $(this).closest("li").find("p");

    $(this).closest(".accordion")
      .find("p")
      .not(dropDown)
      .slideUp();

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(this).closest(".accordion")
        .find("a.active")
        .removeClass("active");
      $(this).addClass("active");
    }

    dropDown.stop(false, true).slideToggle();
    e.preventDefault();
  });

  /* =====================
     OWL CAROUSEL
     ===================== */
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    responsive: {
      0: { items: 1, nav: true },
      500: { items: 2, nav: false },
      800: { items: 3, nav: false },
      1000: { items: 4, nav: true, loop: false },
      1200: { items: 5, nav: true, loop: false },
      1500: { items: 6, nav: true, loop: false }
    }
  });

  /* =====================
     DATEPICKER
     ===================== */
  //$('#form-submit .date').datepicker({});

  /* =====================
     RESPONSIVE MENU
     ===================== */
  $.fn.responsivenav = function (args) {

    var defaults = {
      responsive: true,
      width: 993,
      button: $(this).attr('id') + '-button',
      animation: {
        effect: 'slide',
        show: 150,
        hide: 100
      },
      selected: 'selected',
      arrow: 'downarrow'
    };

    var settings = $.extend(defaults, args);

    init($(this).attr('id'), settings.button);

    function init(menuid, buttonid) {
      setupMenu(menuid, buttonid);
      $(window).on('resize orientationchange', function () {
        resizeMenu(menuid, buttonid);
      });
      resizeMenu(menuid, buttonid);
    }

    function setupMenu(menuid, buttonid) {
      var $mainmenu = $('#' + menuid + '>ul');
      var $headers = $mainmenu.find("ul").parent();

      $headers.each(function () {
        $(this).children('a:eq(0)')
          .append('<span class="' + settings.arrow + '"></span>');
      });

      if (settings.responsive) {
        $('#' + buttonid).click(function (e) {
          e.preventDefault();

          var $menu = $('#' + menuid);
          var $button = $(this);

          if ($menu.is(':visible')) {
            animateHide($menu, $button);
          } else {
            animateShow($menu, $button);
          }
        });
      }
    }

    function resizeMenu(menuid, buttonid) {
      var $ww = document.body.clientWidth;

      if ($ww > settings.width) {
        $('#' + menuid).removeClass('mobile').show();
        $('#' + buttonid).removeClass('mobile');
      } else {
        $('#' + menuid).addClass('mobile').hide();
        $('#' + buttonid).addClass('mobile');
      }
    }

    function animateShow(menu, button) {
      button.addClass(settings.selected);
      menu.slideDown(settings.animation.show);
    }

    function animateHide(menu, button) {
      menu.slideUp(settings.animation.hide, function () {
        button.removeClass(settings.selected);
      });
    }
  };

  $('#primary-nav').responsivenav();
  $('#top-nav').responsivenav({ responsive: false });

  /* =====================
     SCROLL SMOOTH
     ===================== */
$('a.scrollTo').on('click', function(e){

  var href = $(this).attr('href');

  // Si es un link a OTRA página → NO interferir
  if (href.includes('.html')) {
    return; // deja que navegue normal
  }

  e.preventDefault();

  var scrollTo = $(this).attr('data-scrollTo') || href.replace('#','');
  var target = $('#' + scrollTo);

  if (target.length) {
    $('html, body').animate({
      scrollTop: target.offset().top - 90
    }, 800);
  }
});

  /* =====================
     HEADER SCROLL EFFECT
     ===================== */
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('#header').addClass('scrolled');
    } else {
      $('#header').removeClass('scrolled');
    }
  });
$('a').on('click', function() {
  $('li').removeClass('active');
  $(this).parent().addClass('active');
});
});