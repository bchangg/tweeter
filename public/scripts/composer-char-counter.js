$(document).ready(function() {
  const textArea = $('.new-tweet textarea');
  // let charCounter = $('#remaining-chars');
  let maxChars = 140;

  // textArea.on("keydown", function(event) {
  //   if (textArea.val().length >= maxChars && event.keyCode !== 8 && event.keyCode !== 46) {
  //     event.preventDefault();
  //   }
  // });

  textArea.on("keyup", function(event) {
    if ($(this).val().length > maxChars) {
      $(this).parent().children('span').css("color", "red");
    } else {
      $(this).parent().children('span').css("color", "inherit");
    }
    
    $(this).parent().children('span').text(maxChars - $(this).val().length);
  });
});