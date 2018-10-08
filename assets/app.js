  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCuxzvxazgrGjfAnLcAczRvBLpJKzlj3Mo",
    authDomain: "classwork-20949.firebaseapp.com",
    databaseURL: "https://classwork-20949.firebaseio.com",
    projectId: "classwork-20949",
    storageBucket: "classwork-20949.appspot.com",
    messagingSenderId: "136543480096"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// add train button
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var trainTime = $("#time-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    frequency: frequency,
    time: trainTime
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#time-input").val("");
});

//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var trainTime = childSnapshot.val().time;

  // logic for next arrival and minutes away using moment.js
  var randomTime = trainTime;
  var randomFormat = "HH:mm";
  var convertedTime = moment(randomTime, randomFormat);
  var timeDiff = moment().diff(convertedTime, "minutes");
  var overtime = timeDiff % frequency; 
  var minutesAway = frequency - overtime;
  var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

  console.log(nextArrival);
  console.log(minutesAway);
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
