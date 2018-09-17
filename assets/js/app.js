$(document).on("ready", function(){
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

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.email);
    console.log(sv.age);
    console.log(sv.comment);

    var tr = $("<tr>");
    tr.append($("<td>").text(sv.name), $("<td>").text(sv.dest), $("<td>").text(sv.startTime), $("<td>").text(sv.freq));
    $("#train-table").append(tr);
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
});