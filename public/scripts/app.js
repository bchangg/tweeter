$(document).ready(function() {
  $('.new-tweet').css("display", "none");

  const safeText = function(someText) {
    let $div = $("<div/>");
    $div.append(document.createTextNode(someText));
    return $div.innerHTML;
  }

  const createTweetElement = function(tweet) {
    let tweetArticle = `
    <article><header>
    <div class="tweeter-name">
    <img src=${tweet.user.avatars}>
    <span>
    ${tweet.user.name}
    </span>
    </div>
    <span class="tweeter-handle">
    ${tweet.user.handle}
    </span></header>
    <div>
    ${$('<div>').text(tweet.content.text).html()}
    </div>
    <footer>
    <div class="time-tweeted">
    ${moment(tweet.created_at).fromNow()}
    </div>
    <div class="actions-on-tweet">
    <img src="../images/like.png">
    <img src="../images/comment.png">
    <img src="../images/share.png">
    </div>
    </footer></article>`;

    return tweetArticle;
  }

  const renderTweets = function(data) {
    data.forEach((tweet) => {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    });
  }

  const $form = $('#new-tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const renderErrorMessage = function(errorMessage) {
      if (!$('.error').length) {
        $('<div>').addClass("error").text(errorMessage).insertBefore($('.new-tweet'));
        setTimeout(() => {
          $('.error').remove();
        }, 4000);
      }
    }

    if ($form.children('textarea').val().length > 140) {
      renderErrorMessage("Tweet must be less than 140 characters!");
    } else if ($form.children('textarea').val().length === 0) {
      renderErrorMessage("Tweet must be longer than 0 characters!");
    } else {
      $.post("/tweets/", $form.serialize())
        .done((data) => {
          $form.children('textarea').val('');
          $form.children('span').text('140');
          $('.tweet-container').empty();
          loadTweets();
        });
    }
  });

  const loadTweets = function() {
    $.ajax("/tweets", { method: 'GET' })
      .then(function(data) {
        renderTweets(data);
      });
  }

  const $button = $('#new-tweet-form input');
  $button.on('mousedown', (event) => {
    $button.css("background-color", "red");
  });
  $button.on('mouseup', (event) => {
    $button.css("background-color", "#4353A0");
  });

  const focusTextArea = function(delay) {
    setTimeout(() => {
      $('.new-tweet').children('form').children('textarea').focus();
    }, delay);
  }

  const $newTweetToggler = $('#newTweetButton');
  $newTweetToggler.click(function(event) {
    $('.new-tweet').slideToggle(400);
    if ($('.new-tweet').is(":visible")) {
      focusTextArea(400);
    }
  });

  $('.go-to-top').click(function(event) {
    $(window).scrollTop($('.main-header').offset());
    if (!$('.new-tweet').is(":visible")) {
      $('.new-tweet').slideToggle(400);
      focusTextArea(400);
    } else {
      focusTextArea(0);
    }
  });

  window.addEventListener('scroll', () => {
    if ($(window).scrollTop() > 400) {
      $('.go-to-top').css("display", "block");
    } else {
      $('.go-to-top').css("display", "none");
    }
  })

  loadTweets();
});