$(document).ready(function(){
    //variables//
    let player1 = null;
    let player2 = null;
    let namePlayer1 = "";
    let namePlayer2 = "";
    let databaseChoice1;
    let p1Choice;
    let p2Choice;
    let p1WinCount = 0;
    let p1LoseCount = 0;
    let p2WinCount = 0;
    let p2LoseCount = 0;
    let ties = 0
    let rock = "<img src='assets/image/rock.png'>"
    let paper = "<img src='assets/image/paper.jpg'>"
    let scissors = "<img src='assets/image/scissor.jpg'>"
    let chatmessage

 
    let restart = function () {
        p1WinCount = 0;
        p1LoseCount = 0;
        p2WinCount = 0;
        p2LoseCount = 0;
        ties = 0
        $("#alerts").empty()
        namePlayer1 = ""
        namePlayer2 = ""
    }

    let p1Winner = function (){
        p1WinCount++
        p2LoseCount++
        database.ref().child("/users/player1/wins").set(p1WinCount)
        database.ref().child("/users/player2/loses").set(p2LoseCount)
        database.ref().child("/users/message/").set(namePlayer1 + " Wins!")
        setTimeout(function(){
            database.ref().child("/users/player1/choice").set("")
            database.ref().child("/users/player2/choice").set("")
            }, 3000)
    }

    let p2Winner = function (){
        p2WinCount++
        p1LoseCount++
        database.ref().child("/users/player2/wins").set(p2WinCount)
        database.ref().child("/users/player1/loses").set(p1LoseCount)
        database.ref().child("/users/message/").set(namePlayer2 + " Wins!")
        setTimeout(function(){
            database.ref().child("/users/player1/choice").set("")
            database.ref().child("/users/player2/choice").set("")
            }, 3000)
    }

    let tie = function (){
        ties++
        database.ref().child("/users/player2/ties").set(ties)
        database.ref().child("/users/player1/ties").set(ties)
        database.ref().child("/users/message/").set("It's A Tie!")
        setTimeout(function(){
            database.ref().child("/users/player1/choice").set("")
            database.ref().child("/users/player2/choice").set("")
            }, 3000)
    }

    let newturn = function (){
        database.ref().child("/users/message/").set(namePlayer1 + "'s turn")
    }

    let gameLogic = function () {
        console.log("running logic")
        console.log(p1Choice)
        console.log(p2Choice)
        if (p2Choice === rock && databaseChoice1 === paper) {
            $("#p1Image").empty()
            $("#p2Image").empty()
            p1Winner()
            }
        if (p2Choice === rock && databaseChoice1 === scissors){
            $("#p1Image").empty()
            $("#p2Image").empty()
            p2Winner()
            setTimeout(function(){
                newturn()
            }, 3000)
            }
        if (p2Choice === rock && databaseChoice1 === rock){
            $("#p1Image").empty()
            $("#p2Image").empty()
            tie()
            setTimeout(function(){
                newturn()
            }, 3000)
            }
        if (p2Choice === paper && databaseChoice1 === scissors) {
            console.log("yes")
            $("#p1Image").empty()
            $("#p2Image").empty()
            p1Winner()
            setTimeout(function(){
                newturn()
            }, 3000)
            }
        if (p2Choice === paper && databaseChoice1 === rock){
            $("#p1Image").empty()
            $("#p2Image").empty()
            p2Winner()
            setTimeout(function(){
                newturn()
            }, 3000)
            }
        if (p2Choice === paper && databaseChoice1 === paper){
            $("#p1Image").empty()
            $("#p2Image").empty()
             tie()
             setTimeout(function(){
                newturn()
            }, 3000)
            }
        if (p2Choice === scissors && databaseChoice1 === rock) {
            $("#p1Image").empty()
            $("#p2Image").empty()
            p1Winner()
            setTimeout(function(){
                newturn()
            }, 3000)
            }
        if (p2Choice === scissors && databaseChoice1 === paper){
            $("#p1Image").empty()
            $("#p2Image").empty()
            p2Winner()
            setTimeout(function(){
                newturn()
            }, 3000)
            }
        if (p2Choice === scissors && databaseChoice1 === scissors){
            $("#p1Image").empty()
            $("#p2Image").empty()
            tie()
            setTimeout(function(){
                newturn()
            }, 3000)
            }
    }

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
        if ( ($("#inputP1Name").val().trim() !== "") && (!player1 && !player2) ) {
            if (!player1 && !player2) {
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
                $("#p1Info").append("<button id='rock1' class='text-white btn btn-warning m-2'>Rock</button>")
                $("#p1Info").append("<button id='paper1' class='btn btn-danger m-2'>Paper</button>")
                $("#p1Info").append("<button id='scissor1' class='btn btn-success m-2'>Scissor</button>")
                $("#alerts").text("Waiting for Player 2")
                database.ref().child("/users/player1").set(player1);
                database.ref("/users/player1").onDisconnect().remove();
                database.ref("/users/message").onDisconnect().remove();
            }
        }
        $("#rock1").on("click", function() {
            p1Choice = rock
            database.ref().child("/users/player1/choice").set(p1Choice)
            database.ref().child("/users/message/").set(namePlayer2 + "'s turn")

        })
        $("#paper1").on("click", function() {
            p1Choice = paper
            database.ref().child("/users/player1/choice").set(p1Choice);
            database.ref().child("/users/message/").set(namePlayer2 + "'s turn")

        })
        $("#scissor1").on("click", function() {
            p1Choice = scissors
            database.ref().child("/users/player1/choice").set(p1Choice);
            database.ref().child("/users/message/").set(namePlayer2 + "'s turn")
        })
        
    })
    $("#p2Submit").on("click", function(event){
        event.preventDefault();
        if ( ($("#inputP2Name").val().trim() !== "") && (player1 && !player2) ) {
            if(player1 && !player2) {
                namePlayer2 = $("#inputP2Name").val().trim();
                player2 = {
                    name: namePlayer2,
                };
                $("#p2Wins").text(p2WinCount);
                $("#p2Loses").text(p2LoseCount);
                $("#player2Ties").text(ties);
                $("#p1Wins").text(p1WinCount);
                $("#p1Loses").text(p1LoseCount);
                $("#player1Ties").text(ties);
                $("#p2Info").append("<button id='rock2' class='text-white btn btn-warning m-2'>Rock</button>")
                $("#p2Info").append("<button id='paper2' class='btn btn-danger m-2'>Paper</button>")
                $("#p2Info").append("<button id='scissor2'class='btn btn-success m-2' >Scissor</button>")
                database.ref().child("/users/player2").set(player2);
                database.ref("/users/player2").onDisconnect().remove();
                database.ref("/users/message").onDisconnect().remove();
              }
            }
            
            $("#rock2").on("click", function() {
                p2Choice = rock
                database.ref().child("/users/player2/choice").set(p2Choice);
                gameLogic ()
            })
            $("#paper2").on("click", function() {
                p2Choice = paper
                console.log(p2Choice)
                database.ref().child("/users/player2/choice").set(p2Choice);
                gameLogic ()
                
            })
            $("#scissor2").on("click", function() {
                p2Choice = scissors
                database.ref().child("/users/player2/choice").set(p2Choice);
                gameLogic ()
            })
          
            
        })

//    $("chatSubmit").on("click", function(event){
//         event.preventDefault();
//         chatmessage = $("#userMessage").val().trim();
//         database.ref().child("/users/chat").set(chatmessage)
        
//     })
    //assign users to firebase 
    database.ref("/users/").on("value", function(snapshot) {
        if (snapshot.child("player1").exists()) {
        player1 = snapshot.val().player1;
        namePlayer1 = player1.name
        $("#p1Name").text(namePlayer1)
        $("#p1Form").remove()
        }
        else {
            player1 = null;
            namePlayer1 = "";
        }

        if (snapshot.child("player2").exists()) {
        player2 = snapshot.val().player2;
        namePlayer2 = player2.name
        $("#p2Name").text(namePlayer2)
        $("#p2Form").remove()

        }
        else {
            player2 = null;
            nameplayer2 = "";
        }

        if (player1 && player2) {
            $("#alerts").text(namePlayer1 + "'s turn")
        }
        if (!player1 && !player2) {
            restart();
        }     
        
    // firebase data storage and display
    });
    database.ref("users/player1/").on("value", function(snapshot){
        if (snapshot.child("choice").exists()) {
            databaseChoice1 = snapshot.val().choice
            }
    })
    database.ref("users/player2/").on("value", function(snapshot){
        if (snapshot.child("choice").exists()) {
            choice2 = snapshot.val().choice
            $("#p2Image").empty()
            $("#p2Image").append(choice2)
            $("#p1Image").empty()
            $("#p1Image").append(databaseChoice1)
            }
    })
    database.ref("/users/").on("value", function(snapshot){
        if (snapshot.child("message").exists()) {
            message1 = snapshot.val().message
            $("#alerts").text(message1)
        }
    })
    database.ref("/users/message").onDisconnect().remove();

    database.ref("/users/player1/").on("value", function(snapshot){
        if (snapshot.child("wins").exists()) {
            p1Wins = snapshot.val().wins
            $("#p1Wins").text(p1Wins)
        }
    })
    database.ref("/users/player2/").on("value", function(snapshot){
        if (snapshot.child("loses").exists()) {
            p2Loses = snapshot.val().loses
            $("#p2Loses").text(p2Loses)
        }
    })
    database.ref("/users/player2/").on("value", function(snapshot){
        if (snapshot.child("wins").exists()) {
            p2Wins = snapshot.val().wins
            $("#p2Wins").text(p2Wins)
        }
    })
    database.ref("/users/player1/").on("value", function(snapshot){
        if (snapshot.child("loses").exists()) {
            p1Loses = snapshot.val().loses
            $("#p1Loses").text(p1Loses)
        }
    })
    database.ref("/users/player1/").on("value", function(snapshot){
        if (snapshot.child("ties").exists()) {
            p1ties = snapshot.val().ties
            $("#player1Ties").text(p1ties)
        }
    })
    database.ref("/users/player2/").on("value", function(snapshot){
        if (snapshot.child("ties").exists()) {
            p2ties = snapshot.val().ties
            $("#player2Ties").text(p2ties) 
        }
    })
    // database.ref("/users/").on("value", function(snapshot){
    //     if (snapshot.child("chat").exists()) {
    //         message1 = snapshot.val().ties
    //         $("#messageDisplay").text(message1) 
    //     }
    // })
});

