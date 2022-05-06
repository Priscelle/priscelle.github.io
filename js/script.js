var currentFrame = -1;
var shakeLock = false;

// Show/hide contact
function toggleAddress() {
  var address = $("header address");
  if (address.hasClass("expanded")) {
    address.removeClass("expanded");
    address.stop(true).slideUp(500, "easeInExpo");
  } else {
    var apple = $("#appleInfo");
    apple.removeClass("expanded");
    apple.stop(true).slideUp(500, "easeInExpo", function () {
      address.addClass("expanded");
      address.stop(true).slideDown(500, "easeOutExpo");
    });
  }
}

// Show/hide contact
function toggleApple() {
  var apple = $("#appleInfo");
  if (apple.hasClass("expanded")) {
    apple.removeClass("expanded");
    apple.stop(true).slideUp(500, "easeInExpo");
  } else {
    var address = $("header address");
    address.removeClass("expanded");
    address.stop(true).slideUp(500, "easeInExpo", function () {
      apple.addClass("expanded");
      apple.stop(true).slideDown(500, "easeOutExpo");
    });
  }
}

function animateHome(to) {
  $("#cicle").fadeOut();
  if (currentFrame != 0) {
    $("#frame1TitleImg")
      .stop(true)
      .animate({ left: 0, top: 0 }, 1000, "easeInOutExpo", function () {
        $("#frame1IphoneDevice")
          .stop(true)
          .animate({ top: 0 }, 1000, "easeInOutExpo", function () {
            displayTexts(0);
            currentFrame = 0;
            $("#cicle").fadeIn();
            displayNavigation();
          });
        setTimeout(function () {
          $("#frame1IphoneShadow").fadeIn("slow");
        }, 600);
      });
  } else {
    hideTexts();
    $("#frame1IphoneDevice")
      .stop(true)
      .animate({ top: "-120%" }, 1000, "easeInOutExpo");
    $("#frame1TitleImg")
      .stop(true)
      .animate(
        { left: "120%", top: "120%" },
        1000,
        "easeInOutExpo",
        function () {
          $("#frame1TitleImg, #frame1IphoneDevice").attr("style", "");
          if (to == "right") animateShake();
          else if (to == "left") animateFill();
        }
      );
    setTimeout(function () {
      $("#frame1IphoneShadow").fadeOut("slow");
    }, 600);
  }
}

function animateShake(to) {
  $("#cicle").fadeOut();
  if (currentFrame != 1) {
    var top = 0;
    if ($(window).width() < 550) top = -40;
    $("#frame2TitleImg1")
      .stop(true)
      .animate({ left: 0, top: top }, 1000, "easeInOutExpo");
    $("#frame2TitleImg2")
      .stop(true)
      .animate({ left: 0, top: 0 }, 1000, "easeInOutExpo", function () {
        $("#frame2TitleImg1, #frame2TitleImg2").addClass("current");
        displayTexts(1);
        currentFrame = 1;
        $("#cicle").fadeIn();
      });
    $("#frame2IphoneDevice").show();
    setTimeout(function () {
      $("#frame2IphoneDevice").addClass("current");
    }, 100);
    shakeLock = false;
    setTimeout(function () {
      shakeIphone("up");
    }, 500);
  } else {
    hideTexts();
    shakeLock = true;
    $("#frame2IphoneDevice").removeClass("up down current").addClass("go");
    $("#frame2TitleImg2")
      .stop(true)
      .animate({ left: "120%", top: "-120%" }, 1000, "easeInOutExpo");
    $("#frame2TitleImg1")
      .stop(true)
      .animate(
        { left: "-120%", top: "120%" },
        1000,
        "easeInOutExpo",
        function () {
          $("#frame2TitleImg1, #frame2TitleImg2").removeClass("current");
          $("#frame2IphoneDevice").hide().removeClass("go");
          if (to == "right") animateFill();
          else if (to == "left") animateHome();
        }
      );
  }
}

function animateFill(to) {
  $("#cicle").fadeOut();
  if (currentFrame != 2) {
    var top = 0;
    if ($(window).width() < 550) top = -40;
    $("#frame3TitleImg1")
      .stop(true)
      .animate({ left: 0, top: top }, 1000, "easeInOutExpo");
    $("#frame3TitleImg2")
      .stop(true)
      .animate({ left: 0, top: 0 }, 1000, "easeInOutExpo", function () {
        $(
          "#frame3IphoneDevice, #frame3IphoneDeviceScreen, #frame3IphoneDeviceLogo"
        )
          .stop(true)
          .animate({ top: 0 }, 1000, "easeInOutExpo", function () {
            $(
              "#frame3TitleImg1, #frame3TitleImg2, #frame3IphoneDeviceScreen"
            ).addClass("current");
            $("#lefa").addClass("up");
            displayTexts(2);
            currentFrame = 2;
            $("#cicle").fadeIn();
          });
        setTimeout(function () {
          $("#frame3IphoneShadow").fadeIn("slow");
        }, 600);
      });
  } else {
    hideTexts();
    shakeLock = true;
    $(
      "#frame3TitleImg1, #frame3TitleImg2, #frame3IphoneDeviceScreen"
    ).removeClass("current");
    $("#lefa").removeClass("up");
    $("#frame3IphoneDevice, #frame3IphoneDeviceScreen, #frame3IphoneDeviceLogo")
      .stop(true)
      .animate({ top: "-120%" }, 1000, "easeInOutExpo");
    $("#frame3TitleImg2")
      .stop(true)
      .animate({ left: "120%", top: "-120%" }, 1000, "easeInOutExpo");
    $("#frame3TitleImg1")
      .stop(true)
      .animate(
        { left: "-120%", top: "120%" },
        1000,
        "easeInOutExpo",
        function () {
          if (to == "right") animateHome();
          else animateShake();
        }
      );
    setTimeout(function () {
      $("#frame3IphoneShadow").fadeOut("slow");
    }, 600);
  }
}

function shakeIphone(option) {
  if (shakeLock) return;

  var value = "10%";
  if ($(window).width() < 550) value = "5%";

  if (option == "down") {
    $("#frame2IphoneDevice").removeClass("up current").addClass("down");
    setTimeout(function () {
      shakeIphone("up");
    }, 190);
  } else {
    $("#frame2IphoneDevice").removeClass("down current").addClass("up");
    setTimeout(function () {
      shakeIphone("down");
    }, 190);
  }
}

// Text bellow Titles
function displayTexts(option) {
  if ($(window).width() > 550) {
    switch (option) {
      case 0:
        var x =
          $("#frame1TitleImg").offset().left - $("#frame1Inner").offset().left;
        var y =
          $("#frame1TitleImg").offset().top - $("#frame1Inner").offset().top;
        var width = $("#frame1TitleImg").width();
        var height = $("#frame1TitleImg").height();

        var left = (872 / 1089) * width + x;
        var top = (874 / 1256) * height + y;
        $("#frame1Text").css("top", top + "px");
        $("#frame1Text").css("left", left + "px");
        $("#frame1Text").fadeIn();
        break;
      case 1:
        var x =
          $("#frame2TitleImg1").offset().left - $("#frame2Inner").offset().left;
        var y =
          $("#frame2TitleImg1").offset().top - $("#frame2Inner").offset().top;
        var width = $("#frame2TitleImg1").width();
        var height = $("#frame2TitleImg1").height();

        var left = (1024 / 1242) * width + x;
        var top = (482 / 1293) * height + y;
        $("#frame2Text").css("top", top + "px");
        $("#frame2Text").css("left", left + "px");
        $("#frame2Text").fadeIn();

        var left = (435 / 1242) * width + x;
        var top = (1051 / 1293) * height + y;
        $("#frame2Link").css("top", top + "px");
        $("#frame2Link").css("left", left + "px");
        $("#frame2Link").fadeIn();
        break;
      case 2:
        var x =
          $("#frame3TitleImg1").offset().left - $("#frame3Inner").offset().left;
        var y =
          $("#frame3TitleImg1").offset().top - $("#frame3Inner").offset().top;
        var width = $("#frame3TitleImg1").width();
        var height = $("#frame3TitleImg1").height();

        var left = (758 / 1095) * width + x;
        var top = (510 / 1063) * height + y;
        $("#frame3Text").css("top", top + "px");
        $("#frame3Text").css("left", left + "px");
        $("#frame3Text").fadeIn();
        break;
    }
  } else {
    $(".frameText").hide();
    switch (option) {
      case 0:
        $("#frame1Text").show();
        break;
      case 1:
        $("#frame2Text").show();
        $("#frame2Link").show();
        break;
      case 2:
        $("#frame3Text").show();
        break;
    }
  }
}

function hideTexts() {
  $(".frameText").fadeOut("fast");
}

// Control next / previous links and ccs them
function displayNavigation() {
  $("#cicle").css(
    "top",
    ($(window).height() - $("a.more").height()) / 2 + "px"
  );
}

// Necessary when window < 550 (relative)
function resetTitles() {
  var top = $("#frame3TitleImg2").position().top;

  if ($(window).width() < 550) {
    $("#frame3TitleImg2").css("top", "40px");
  } else {
    $("#frame3TitleImg2").css("top", "0px");
  }
}

// Navigation positive
function more() {
  switch (currentFrame) {
    case 0:
      animateHome("right");
      break;
    case 1:
      animateShake("right");
      break;
    case 2:
      animateFill("right");
      break;
  }
}

// Navigation negative
function minus() {
  switch (currentFrame) {
    case 0:
      animateHome("left");
      break;
    case 1:
      animateShake("left");
      break;
    case 2:
      animateFill("left");
      break;
  }
}

$(document).ready(function () {
  setTimeout(function () {
    animateHome();
  }, 400);
  $(window).resize(function () {
    displayTexts(currentFrame);
    displayNavigation();
    resetTitles();
  });
});
