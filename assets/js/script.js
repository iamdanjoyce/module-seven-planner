// Display the current day at the top of the planner
function displayCurrentDay() {
  var today = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('en-UK', options);
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
const handleSaveButtonClick = () => {
  $(".btn-secondary").on("click", (event) => {
    // Find the text area associated with the clicked save button
    const timeSlot = $(event.currentTarget).attr("id");
    const calendarItem = $(event.currentTarget).closest('.row').find("textarea").val();
    
    // Check if both time slot and calendar item are valid
    if (timeSlot && calendarItem.trim() !== "") {
      localStorage.setItem(timeSlot, calendarItem);
      console.log("Data saved to local storage:", timeSlot, calendarItem);
    } else {
      console.error("Error: Unable to save data to local storage.");
    }
  });
};


// save event to local storage
const displaySavedEvents = () => {
  $(".calendar-item").each(function() {
    const timeSlot = $(this).attr("id");
    const savedEvent = localStorage.getItem(timeSlot);

    if (savedEvent) {
      $(this).val(savedEvent);
    }
  });
};

$(".calendar-item").on('input', function() {
  const timeSlot = $(this).attr("id");
  const eventValue = $(this).val();
  localStorage.setItem(timeSlot, eventValue);
});

displaySavedEvents();


$(document).ready(function () {
  console.log("Document ready!");

  $("#currentDay").text(displayCurrentDay());
  console.log("Current day displayed:", displayCurrentDay());

  updateTimeBlockColors();
  console.log("Time block colors updated.");

  handleSaveButtonClick();
  console.log("Save button click handler added.");

  displaySavedEvents();
  console.log("Saved events displayed.");
});
