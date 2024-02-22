var options = {
  startHour: 9,
  endHour: 17,
};

function updateTimeslots() {
  var currentHour = dayjs().hour();

  $('.time-block').each(function (index, element) {
    var hour = parseInt($(element).attr('data-hour'));

    if (hour < options.startHour) {
      $(element).find('.description').addClass('past').removeClass('present future');
    } else if (hour === currentHour) {
      $(element).find('.description').addClass('present').removeClass('past future');
    } else if (hour > options.endHour) {
      $(element).find('.description').addClass('future').removeClass('past present');
    } else {
      $(element).find('.description').removeClass('past present future');
    }
  });
}

$(document).ready(function () {
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  for (var i = options.startHour; i <= options.endHour; i++) {
    var timeBlock = $('<div>').addClass('row time-block').attr('data-hour', i);
    var hourCol = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(dayjs().hour(i).format('hA'));
    var descriptionCol = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>');

    timeBlock.append(hourCol, descriptionCol, saveBtn);
    $('.container').append(timeBlock);
  }

  //loads events from local storage for each time blocks
  $('.description').each(function () {
    var time = $(this).parent().attr('data-hour');
    $(this).val(localStorage.getItem('hour-' + time));
  });

  setInterval(updateTimeslots, 60000);

  updateTimeslots();

  $('.saveBtn').on('click', function () {
    var value = $(this).siblings('.description').val();
    var time = $(this).parent().attr('data-hour');

    localStorage.setItem('hour-' + time, value);

    $('#notification').addClass('show');

    setTimeout(function () {
      $('#notification').removeClass('show');
    }, 5000);
  });
});