$(document).ready(function() {
  var TIMER = 21000,
      OPP_MIN_TIME = 7000,
      OPP_MAX_TIME = 20000,
      NUM_QUESTIONS = $("a").length,
      OPP_CORRECT_RATE = 2, // out of number of questions
      url = window.location.pathname,
      q_n = url.charAt(url.length-6);
      start = new Date().getTime();

  if (q_n == 1) {
    sessionStorage.setItem("your_points", 0);
    sessionStorage.setItem("opp_points", 0);
  }

  console.log("yours: " + sessionStorage.getItem("your_points"));
  console.log("opp: " + sessionStorage.getItem("opp_points"));

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
    var c = Math.floor(Math.random() * numQ) + 1;
    return c <= OPP_CORRECT_RATE;
  }

  $(".correct").click(function() {
    var end = new Date().getTime(),
        user_time = end - start,
        opp_time = getOpponentTime(OPP_MIN_TIME, OPP_MAX_TIME),
        opp_correct = oppCorrect(NUM_QUESTIONS),
        your_points = JSON.parse(sessionStorage.getItem("your_points")),
        opp_points = JSON.parse(sessionStorage.getItem("opp_points"));

    if (opp_correct) {
      if (user_time <= opp_time)
        your_points += 1;
      else
        opp_points += 1;
    } else {
      your_points += 1;
    }

    sessionStorage.setItem("your_points", JSON.stringify(your_points));
    sessionStorage.setItem("opp_points", JSON.stringify(opp_points));
    console.log("yours: " + sessionStorage.getItem("your_points"));
    console.log("opp: " + sessionStorage.getItem("opp_points"));
    window.location.href = "correct" + q_n + ".html";

  });

  $(".incorrect").click(function() {
    var end = new Date().getTime(),
        user_time = end - start,
        opp_time = getOpponentTime(OPP_MIN_TIME, OPP_MAX_TIME),
        opp_correct = oppCorrect(NUM_QUESTIONS),
        your_points = JSON.parse(sessionStorage.getItem("your_points")),
        opp_points = JSON.parse(sessionStorage.getItem("opp_points"));

    if (opp_correct) {
      opp_points += 1;
    }

    sessionStorage.setItem("your_points", JSON.stringify(your_points));
    sessionStorage.setItem("opp_points", JSON.stringify(opp_points));
    console.log("yours: " + sessionStorage.getItem("your_points"));
    console.log("opp: " + sessionStorage.getItem("opp_points"));
    window.location.href = "incorrect" + q_n + ".html";

  });


});
