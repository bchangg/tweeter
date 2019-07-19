$(document).ready(function() {
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

    if ($form.children('textarea').val().length > 140) {
      if (!$('.error').length) {
        $('<div>').addClass("error").text("Please limit your input to 140 characters! Thank you :)").insertBefore($('.new-tweet'));
        setTimeout(() => {
          $('.error').remove();
        }, 4000);
      }
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

  const $newTweetToggler = $('#newTweetButton');
  $newTweetToggler.click(function(event) {
    $('.new-tweet').slideToggle(400);
  });

  $('.go-to-top').click(function(event) {
    $(window).scrollTop($('.main-header').offset());
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideToggle(400);
    }
  });

  window.addEventListener('scroll', () => {
    if ($(window).scrollTop() > (400)) {
      $('.go-to-top').css("display", "block");
    } else {
      $('.go-to-top').css("display", "none");
    }
  })

  loadTweets();
});