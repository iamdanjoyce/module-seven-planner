// Display the current day at the top of the planner using Moment.js
var today = moment().format("MMMM Do YYYY");
$("#currentDay").text(today);

// Variables for current time and HTML time blocks to adjust color relative to now
var timeBlocks = $(".hour");
var currentTime = parseInt(moment().format("H"));

// Check each time block to determine if it's past (gray), present (red), or future (green)
$.each(timeBlocks, function (i, hour) {
  var blockHour = parseInt($(this).attr("id"));

  if (blockHour === currentTime) {
    $(this).next().addClass("present");
  } else if (blockHour < currentTime) {
    $(this).next().addClass("past");
  } else if (blockHour > currentTime) {
    $(this).next().addClass("future");
  }
});

// Save button functionality for text areas, storing data in local storage
$(".saveBtn").on("click", function (event) {
  var calendarItem =
    event.target.parentElement.previousElementSibling.children[0].value;
  var timeSlot = event.target.attributes[0].value;
  localStorage.setItem(timeSlot, calendarItem);
});

// Load and display saved events from local storage upon refresh
$(document).ready(function () {
  function displaySavedEvent(timeSlot) {
    if (localStorage[timeSlot] !== null && localStorage[timeSlot] !== undefined) {
      var $timeSlot = $(`#${timeSlot}`);
      var eventText = $("<p>").text(localStorage[timeSlot]);
      $timeSlot.next().append(eventText);
    }
  }

  displaySavedEvent("9am");
  displaySavedEvent("10am");
  displaySavedEvent("11am");
  displaySavedEvent("12pm");
  displaySavedEvent("1pm");
  displaySavedEvent("2pm");
  displaySavedEvent("3pm");
  displaySavedEvent("4pm");
  displaySavedEvent("5pm");
});
