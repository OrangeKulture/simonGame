$(document).ready(function() {
  $('[data-toggle="popover"]').popover({
    container: "body"
  });
  $("#strictChange").on("click", function() {
    $("#strict")[0].play();
  });

  let counter = 1;
  let index = 0;
  let colorList = [];
  let colorSelect = [];
  let playerSelect = [];
  let playerTurn = false;
  let start, finish;

  // Game Functionality

  // Functions

  // Set beginning of each round
  function clearPlayer() {
    index = 0;
    colorSelect = [];
    playerSelect = [];
    playerTurn = false;
  }

  // Check score after each player selection

  function checkScore() {
    if (
      playerSelect[playerSelect.length - 1] !==
      colorSelect[playerSelect.length - 1]
    ) {
      let strictOn = $("#strictChange").prop("checked");
      if (strictOn) {
        $(".alert").css("margin-left", "15%");
        $(".alert").text("Wrong Selection, Restarting game...");
        $(".alert").css("visibility", "visible");
        setTimeout(function() {
          $(".alert").css("visibility", "hidden");
        }, 1000);
        setTimeout(function() {
          window.location.reload(true);
        }, 2000);
      }
      $(".alert")
        .css("visibility", "visible")
        .addClass("animated flash")
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function() {
            $(this).removeClass("animated flash");
          }
        );
      $(".countDisp")
        .text("XX")
        .css("color", "red")
        .addClass("animated flash")
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function() {
            $(this).removeClass("animated flash");
            $(this).css("color", "#3ad334");
          }
        );
      setTimeout(function() {
        $(".alert").css("visibility", "hidden");
        if (counter < 10) {
          $(".countDisp").text("0" + counter);
        } else {
          $(".countDisp").text(counter);
        }
      }, 1000);

      setTimeout(function() {
        clearPlayer();
        gameStart();
      }, 1200);
    } else {
      if (colorSelect.length === playerSelect.length) {
        if (playerSelect.join("") === colorSelect.join("")) {
          if (counter === 20) {
            playerTurn = true;
            $("#winModal").modal("show");
          } else {
            setTimeout(function() {
              counter++;
              if (counter < 10) {
                $(".countDisp").text("0" + counter);
              } else {
                $(".countDisp").text(counter);
              }
              clearPlayer();
              gameStart();
            }, 1000);
          }
        }
      }
    }
  }

  // Initial game setup and animations
  function animStart() {
    $(".start")
      .addClass("animated bounceOutDown")
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function() {
          $(this).removeClass("animated bounceOutDown");
        }
      );
    setTimeout(function() {
      $(".start").css("display", "none");
      $(".reset").css("display", "initial");
    }, 600);

    setTimeout(function() {
      $(".count").css("visibility", "visible");
    }, 600);

    setTimeout(function() {
      $(".countDisp").text("0" + counter);
    }, 1200);
  }

  // Main function, displays colors to the user
  function gameStart() {
    if (counter <= 10) {
      start = 900;
      finish = 500;
    } else {
      start = 500;
      finish = 300;
    }

    let game = setInterval(function() {
      let ind = colorList[index];
      $(`#${ind}`).addClass(`light${ind}`);
      $(`#audio${ind}`)[0].play();
      colorSelect.push(ind);
      setInterval(function() {
        $(`#${ind}`).removeClass(`light${ind}`);
      }, finish);
      index++;
      if (index >= counter) {
        clearInterval(game);
        playerTurn = true;
      }
    }, start);
  }

  // Start button and game start configuration

  $(".start").on("click", function() {
    $("#start")[0].play();
    // Get array of random colors to display (total 20 steps) //
    for (let i = 0; i < 20; i++) {
      colorList.push(Math.floor(1 + Math.random() * 4));
    }
    animStart();
    setTimeout(gameStart, 1500);
  });

  // Reset Button
  $(".reset").on("click", function() {
    if (playerTurn) {
      $("#reset")[0].play();
      clearPlayer();
      counter = 1;
      colorList = [];
      $(".countDisp").text("0" + counter);
      setTimeout(function() {
        $(".reset").css("display", "none");
        $(".start")
          .removeClass("animated bounceOutDown")
          .css("display", "initial");
      }, 600);
    }
  });

  // Click handler for player input

  $(".box").on("click", function() {
    if (playerTurn) {
      let player = +this.id;
      $(`#${player}`).addClass(`light${player}`);
      $(`#audio${player}`)[0].play();
      playerSelect.push(player);
      setTimeout(function() {
        $(`#${player}`).removeClass(`light${player}`);
      }, 350);
      checkScore();
    }
  });
}); // end document.ready
