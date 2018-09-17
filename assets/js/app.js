$(document).on("ready", function(){
    var nextTrain;
    var tMinutesTillTrain;
    var name;
    var config = {
        apiKey: "AIzaSyDYaAZWMvGA9XKYnJBxRAQKRRLe-Ds3C3g",
        authDomain: "train-cd8cc.firebaseapp.com",
        databaseURL: "https://train-cd8cc.firebaseio.com",
        projectId: "train-cd8cc",
        storageBucket: "train-cd8cc.appspot.com",
        messagingSenderId: "1075119009985"
        };

    firebase.initializeApp(config);

    var database = firebase.database();

    function calcTrain(x, y){
        var frequency = x;
        var firstTrain = y;
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % frequency;
        tMinutesTillTrain = frequency - tRemainder;
        nextTrain = moment().add(tMinutesTillTrain, "minutes");
    }

    $("#form-submit").on("click", function(event){
        console.log("Submitted");
        event.preventDefault();
        name = $("#train-name").val();
        database.ref().push({
            name: name,
            dest: $("#destination").val(),
            startTime: $("#first-train-time").val(),
            freq: $("#frequency").val()
        });
    });

    database.ref().on("child_added", function(snapshot) {
        var sv = snapshot.val();
        calcTrain(sv.freq, sv.startTime)
        // Console.loging the last user's dat
        var tr = $("<tr>");+
        tr.append($("<td>").text(sv.name), $("<td>").text(sv.dest), $("<td>").text(sv.freq), $("<td>").text(nextTrain), $("<td>").text(tMinutesTillTrain));
        $("#train-table").append(tr);
        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });



});