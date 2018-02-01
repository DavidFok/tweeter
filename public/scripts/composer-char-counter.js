$(document).ready(function() {

  var totalChars = 140;

  $("textarea").on('keyup', function () {
    var currentCount = $('#tweetText').val().length;
    var leftChars = totalChars - currentCount;
    $('#countchars').text(leftChars);
    if (leftChars < 0) {
      $('#countchars').css('color', 'red');
    } else {
      $('#countchars').css('color', 'black');
    }
  });
});