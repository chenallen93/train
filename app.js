  var config = {
    apiKey: "AIzaSyBTl84bStxh5y0Tcpukrky9SACdHMazYRk",
    authDomain: "train-cf012.firebaseapp.com",
    databaseURL: "https://train-cf012.firebaseio.com",
    storageBucket: "train-cf012.appspot.com",
    messagingSenderId: "807096770453"
  };
  firebase.initializeApp(config);


var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var timeUsed = "";
var timeNow = "";


$("#searchBtn").on("click", function() {

	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#firstTrain").val().trim();
	frequency = $("#frequency").val().trim();

    
    var convertTime = moment(firstTrain, "hh:mm").subtract(1, "years");
        console.log(convertTime);

    var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var timeDifference = moment().diff(moment(convertTime), "minutes");
        console.log("DIFFERENCE IN TIME: " + timeDifference);

    var Remainder = timeDifference % frequency;
        console.log(Remainder);

    var MinutesTillTrain = frequency - Remainder;
        console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

    var nextTrain = moment().add(MinutesTillTrain, "minutes");
    var train = moment(nextTrain).format("hh:mm")
        console.log("ARRIVAL TIME: " + train);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain.toString(),
        frequency: frequency.toString(),
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        train: train.toString(),
        MinutesTillTrain: MinutesTillTrain.toString()
    });

    $("#trainName").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#firstTrain").val("");

    
	return false;

});



database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().MinutesTillTrain);
    console.log(childSnapshot.val().nextTrain);

    $("#table").append("<tr> <td>" + childSnapshot.val().trainName + " </td> <td> " + childSnapshot.val().destination + "</td> <td>" + childSnapshot.val().frequency + " </td> <td>" + childSnapshot.val().train + "</td> <td> " + childSnapshot.val().MinutesTillTrain + "</td> </tr>");

 
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


