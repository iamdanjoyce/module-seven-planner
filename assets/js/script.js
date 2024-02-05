// Display the current day at the top of the planner
function displayCurrentDay() {
  var today = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('en-US', options);
}

// Update time block colors based on past, present, or future
function updateTimeBlockColors() {
  var timeBlocks = $(".hour");
  var currentTime = new Date().getHours();

  timeBlocks.each(function () {
    var blockHour = parseInt($(this).attr("id"));

    if (blockHour === currentTime) {
      $(this).next().addClass("present");
    } else if (blockHour < currentTime) {
      $(this).next().addClass("past");
    } else {
      $(this).next().addClass("future");
    }
  });
}

// Save button functionality for text areas, storing data in local storage
function handleSaveButtonClick() {
  $(".saveBtn").on("click", function (event) {
    var calendarItem = $(this).prev().children("textarea").val();
    var timeSlot = $(this).parent().attr("id");
    localStorage.setItem(timeSlot, calendarItem);
  });
}

// Display saved events from local storage upon refresh
function displaySavedEvents() {
  $(".hour").each(function () {
    var timeSlot = $(this).attr("id");
    var savedEvent = localStorage.getItem(timeSlot);

    if (savedEvent) {
      var eventText = $("<p>").text(savedEvent);
      $(this).next().append(eventText);
    }
  });
}

$(document).ready(function () {
  $("#currentDay").text(displayCurrentDay());
  updateTimeBlockColors();
  handleSaveButtonClick();
  displaySavedEvents();
});
