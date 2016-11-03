$(document).ready(function () {
  // Draw dotted lines in services section
  drawLines();
  window.onresize = function (event) {
    drawLines();
  };

  //disable background video for phones
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || screen.width < 500) {
    var video = document.getElementById('video');
    video.remove();    
  }

  //stop float from being pushed down
  var leftHeight = $('.content-left').height() * -1;
  $('.content-right').css('margin-top', leftHeight);

  // change transparency on header
  $(document).scroll(function () {
    if ($(document).scrollTop() > 5) {
      if (!$('#nav-container').hasClass('nav-body')) {
        $('#nav-container').addClass('nav-body');
      }
    } else if ($(document).scrollTop() < 5) {
      if ($('#nav-container').hasClass('nav-body')) {
        $('#nav-container').removeClass('nav-body');
      }
    }
  });

  //show mobile dropdown menu
  $('#nav .icon').click(function () {
    $('#mobile-dropdown').fadeToggle('fast');
  });

  //smooth scrolling anchor tags - https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });

  function drawLines() {
    var servicesBackground = document.getElementById("servicesBackground");
    var ctx = servicesBackground.getContext("2d");
    var parentWidth = $('#services').width();
    var parentHeight = $('#services').height();
    ctx.canvas.height = parentHeight;
    ctx.canvas.width = parentWidth;
    ctx.clearRect(0, 0, parentWidth, parentHeight);
    ctx.setLineDash([15, 5]);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#A1CFE6';
    ctx.beginPath();

    var businessPointX = $('#businessService').position().left + ($("#businessService").outerWidth() / 2);
    var businessPointY = ($("#businessService").offset().top - $("#services").offset().top) + ($("#businessService").outerHeight() / 2);
    var devPointX = $('#devService').position().left + ($("#devService").outerWidth(true) / 2);
    var devPointY = ($("#devService").offset().top - $("#services").offset().top) + ($("#devService").outerHeight() / 2);
    var netPointX = $('#netService').position().left + ($("#netService").outerWidth() / 2);
    var netPointY = ($("#netService").offset().top - $("#services").offset().top) + ($("#netService").outerHeight() / 2);
    var servicePointX = $('#serviceService').position().left + ($("#serviceService").outerWidth() / 2);
    var servicePointY = ($("#serviceService").offset().top - $("#services").offset().top) + ($("#serviceService").outerHeight() / 2);

    if ($(window).width() <= 1250) {
      // draw one line connecting all services
      ctx.moveTo(businessPointX, businessPointY);
      ctx.lineTo(servicePointX, servicePointY);
      ctx.stroke();
    } else {
      //draw line from business service to customer service
      ctx.moveTo(businessPointX, businessPointY);
      ctx.lineTo(businessPointX, servicePointY);
      ctx.stroke();
      ctx.moveTo(businessPointX, servicePointY);
      ctx.lineTo(servicePointX, servicePointY);
      ctx.stroke();

      //draw line from networking service to customer service
      ctx.moveTo(netPointX, netPointY);
      ctx.lineTo(netPointX, servicePointY);
      ctx.stroke();
      ctx.moveTo(netPointX, servicePointY);
      ctx.lineTo(servicePointX, servicePointY);
      ctx.stroke();

      //draw line from development service to customer service
      ctx.moveTo(devPointX, devPointY);
      ctx.lineTo(servicePointX, servicePointY);
      ctx.stroke();
    }
  }
});