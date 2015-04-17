$(document).ready(function() {
  var TIMER = 21000,
      OPP_MIN_TIME = 7000,
      OPP_MAX_TIME = 20000,
      NUM_QUESTIONS = $("a").length,
      url = window.location.pathname,
      q_n = url.charAt(url.length-6);
      start = new Date().getTime();

  if (!sessionStorage.getItem("points")) {
    sessionStorage.setItem("points", 0);
  }

  /*
  window.setTimeout(function() {
    var points = JSON.parse(sessionStorage.getItem("points"));
    points -= 1;
    sessionStorage.setItem("points", JSON.stringify(points));
    window.location.href = "timeout.html" + q_n;
  }, TIMER);
  */

  function getOpponentTime(min, max) {
    return Math.random()*(max - min) + min;
  }

  function oppCorrect(numQ) {
    if (Math.random()*(numQ-1) + 1 == 1){
      return true;
    } else {
      return false;
    }
  }

  $(".correct").click(function() {
    var end = new Date().getTime(),
        user_time = end - start,
        opp_time = getOpponentTime(OPP_MIN_TIME, OPP_MAX_TIME),
        opp_correct = oppCorrect(NUM_QUESTIONS),
        points = JSON.parse(sessionStorage.getItem("points"));

    if (opp_correct) {
      if (user_time <= opp_time)
        points += 1;
      else
        points -= 1;
    } else {
      points += 1;
    }

    sessionStorage.setItem("points", JSON.stringify(points));
    window.location.href = "correct.html" + q_n;

  });

  $(".incorrect").click(function() {
    var end = new Date().getTime(),
        user_time = end - start,
        opp_time = getOpponentTime(OPP_MIN_TIME, OPP_MAX_TIME),
        opp_correct = oppCorrect(NUM_QUESTIONS),
        points = JSON.parse(sessionStorage.getItem("points"));

    if (opp_correct) {
      points -= 1;
    }

    sessionStorage.setItem("points", points);
    sessionStorage.setItem("points", JSON.stringify(points));
    window.location.href = "incorrect.html" + q_n;

  });


});
