$(document).ready(function() {
  const $textArea = $('.new-tweet textarea');
  let maxChars = 140;
  
  $textArea.on("keyup", function(event) {
    if ($(this).val().length > maxChars) {
      $(this).parent().parent().children('span').css("color", "red");
    } else {
      $(this).parent().parent().children('span').css("color", "inherit");
    }
    $(this).parent().parent().children('span').text(maxChars - $(this).val().length);
  });
});