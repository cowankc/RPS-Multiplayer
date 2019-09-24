$(document).ready(function(){
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
    

    database.ref().on("value", function(snapshot) {
        let p1WinCount = 0;
        let p1LoseCount = 0;
        let p2WinCount = 0;
        let p2LoseCount = 0;
        let ties = 0
        let user1
        let user2
        $("#p1Wins").text(p1WinCount);
        $("#p1Loses").text(p1LoseCount);
        $("#player1Ties").text(ties);
        $("#p2Wins").text(p2WinCount);
        $("#p2Loses").text(p2LoseCount);
        $("#player2Ties").text(ties);
    });
    $("#p1").on("click", function() {
        let rockBtn = "<button id='rock1'>Rock</button>"
        let paperBtn = "<button id='paper1'>Paper</button>"
        let scissorBtn = "<button id='scissor1'>Scissor</button>"
        $("#p1Info").append(rockBtn)
        $("#p1Info").append(paperBtn)
        $("#p1Info").append(scissorBtn)
        $("#p1").remove()
    })
    $("#p2").on("click", function() {
        let rockBtn = "<button id='rock2'>Rock</button>"
        let paperBtn = "<button id='paper2'>Paper</button>"
        let scissorBtn = "<button id='scissor2'>Scissor</button>"
        $("#p2Info").append(rockBtn)
        $("#p2Info").append(paperBtn)
        $("#p2Info").append(scissorBtn)
        $("#p2").remove()
    })




});

