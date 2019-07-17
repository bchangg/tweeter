const data = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
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
    ${tweet.content.text}
    </div>
    <footer>
    <div class="time-tweeted">
    ${tweet.created_at}
    </div>
    <div class="actions-on-tweet">
    some buttons
    </div>
    </footer></article>`;

    return tweetArticle;
  }

  const renderTweets = function(data) {
    data.forEach((tweet) => {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    });
  }
  renderTweets(data);
});