$(document).ready(function(){
    //variables//
    let player1 = null;
    let player2 = null;
    let namePlayer1 = "";
    let namePlayer2 = "";
    let p1Choice;
    let p2Choice;
    let p1WinCount = 0;
    let p1LoseCount = 0;
    let p2WinCount = 0;
    let p2LoseCount = 0;
    let ties = 0
    let assignPlayer = false
    

    let restart = function () {
        p1WinCount = 0;
        p1LoseCount = 0;
        p2WinCount = 0;
        p2LoseCount = 0;
        ties = 0
        $("#messageDisplay").empty()
        namePlayer1 = ""
        namePlayer2 = ""
    }

    let display


    let firebaseConfig = {
        apiKey: "AIzaSyDOTTdhYcgCi6UBUZ5a1gF4TjhX23-BWko",
        authDomain: "rps-game-8f3bc.firebaseapp.com",
        databaseURL: "https://rps-game-8f3bc.firebaseio.com",
        projectId: "rps-game-8f3bc",
        storageBucket: "rps-game-8f3bc.appspot.com",
        messagingSenderId: "744816090571",
        appId: "1:744816090571:web:73a21c122856020ffc6a4e",
        measurementId: "G-S87349LBSZ"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let database = firebase.database()

    //allow users to enter name
    $("#p1Submit").on("click", function(event){
        event.preventDefault();
        // if ( ($("#inputP1Name").val().trim() !== "") && (!player1 && !player2) ) {
            if (assignPlayer === false) {
                namePlayer1 = $("#inputP1Name").val().trim();
                player1 = {
                    name: namePlayer1,
                };
                $("#p1Wins").text(p1WinCount);
                $("#p1Loses").text(p1LoseCount);
                $("#player1Ties").text(ties);
                $("#p2Wins").text(p2WinCount);
                $("#p2Loses").text(p2LoseCount);
                $("#player2Ties").text(ties);
                $("#p1Info").append("<button id='rock1'>Rock</button>")
                $("#p1Info").append("<button id='paper1'>Paper</button>")
                $("#p1Info").append("<button id='scissor1'>Scissor</button>")
                $("#alerts").text("Waiting for Player 2")
                database.ref().child("/users/player1").set(player1);
                database.ref("/users/player1").onDisconnect().remove();
            }
        
        
    // })
    // $("#p2Submit").on("click", function(event){
    //     event.preventDefault();
        
            if( assignPlayer === true ) {
                namePlayer2 = $("#inputP1Name").val().trim();
                player2 = {
                    name: namePlayer2,
                };
                $("#p2Wins").text(p2WinCount);
                $("#p2Loses").text(p2LoseCount);
                $("#player2Ties").text(ties);
                $("#p1Wins").text(p1WinCount);
                $("#p1Loses").text(p1LoseCount);
                $("#player1Ties").text(ties);
                $("#p2Info").append("<button id='rock2'>Rock</button>")
                $("#p2Info").append("<button id='paper2'>Paper</button>")
                $("#p2Info").append("<button id='scissor2'>Scissor</button>")
                database.ref().child("/users/player2").set(player2);
                database.ref("/users/player2").onDisconnect().remove();
              }
            
            $("#rock1").on("click", function() {
                console.log("yes")
                p1Choice = "<img src='assets/image/rock.png'>"
                $("#paper1").remove()
                $("#scissor1").remove()
                $("#rock1").remove()
                $("#alerts").text("Waiting for " + namePlayer2)
                database.ref().child("/users/player1/choice").set(p1Choice);
                database.ref("/users/player1/choice").on("value", function(snapshot) {
                    $("#p1Image").append(p1Choice)
                })
            })
            $("#paper1").on("click", function() {
                p1Choice = "<img src='assets/image/paper.jpg'>"
                $("#rock1").remove()
                $("#scissor1").remove()
                $("#paper1").remove()
                $("#alerts").text("Waiting for " + namePlayer2)
                database.ref().child("/users/player1/choice").set(p1Choice);
                database.ref("/users/player1/choice").on("value", function(snapshot) {
                    $("#p1Image").append(p1Choice)
                })
            })
            $("#scissor1").on("click", function() {
                p1Choice = "<img src='assets/image/scissor.jpg'>"
                $("#rock1").remove()
                $("#paper1").remove()
                $("#scissor1").remove()
                $("#alerts").text("Waiting for " + namePlayer2)
                database.ref().child("/users/player1/choice").set(p1Choice);
                database.ref("/users/player1/choice").on("value", function(snapshot) {
                    $("#p1Image").append(p1Choice)
                })
            })
            $("#rock2").on("click", function() {
                p2Choice = "<img src='assets/image/rock.png'>"
                $("#paper2").remove()
                $("#rock2").remove()
                $("#scissor2").remove()
                database.ref().child("/users/player2/choice").set(p2Choice);
                database.ref("/users/player2/choice").on("value", function(snapshot) {
                    $("#p2Image").append(p2Choice)
                })
            })
            $("#paper2").on("click", function() {
                p2Choice = "<img src='assets/image/paper.jpg'>"
                $("#rock2").remove()
                $("#scissor2").remove()
                $("#paper2").remove()
                database.ref().child("/users/player2/choice").set(p2Choice);
                database.ref("/users/player2/choice").on("value", function(snapshot) {
                    $("#p2Image").append(p2Choice)
                })
            })
            $("#scissor2").on("click", function() {
                p2Choice = "<img src='assets/image/scissor.jpg'>"
                $("#rock2").remove()
                $("#paper2").remove()
                $("#scissor2").remove()
                database.ref().child("/users/player2/choice").set(p2Choice);
                database.ref("/users/player2/choice").on("value", function(snapshot) {
                    $("#p2Image").append(p2Choice)
                })
            })
            assignPlayer = true
        })
    //assign users to firebase 
    database.ref("/users/").on("value", function(snapshot) {
        if (snapshot.child("player1").exists()) {
        player1 = snapshot.val().player1;
        namePlayer1 = player1.name
        $("#p1Name").text(namePlayer1)
        }
        else {
            player1 = null;
            namePlayer1 = "";
        }

        if (snapshot.child("player2").exists()) {
        player2 = snapshot.val().player2;
        namePlayer2 = player2.name
        $("#p2Name").text(namePlayer2)
        // $("#p2Form").remove()
        // $("#p1Form").remove()
        }
        else {
            player2 = null;
            nameplayer2 = "";
        }

        if (player1 && player2) {
            $("#alerts").text(namePlayer1 + "'s turn, please select your choice")
        }
        if (!player1 && !player2) {
            restart();
        }        
    });
    
    
    


});

