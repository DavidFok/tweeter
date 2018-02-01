/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.
$(function(){

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
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
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function renderTweets (tweets) {
    for (let obj of tweets) {
      let HTMLtweet = createTweetElement(obj)
      $('#tweet-container').prepend(HTMLtweet);
    }
  }

  function createTweetElement (tweetData) {
    const newTweet = $('<article>').addClass("tweet");

    //Header
    const header = $('<header>');
    header.append(`<img src=${tweetData.user.avatars.small}>`)
    $(`<h1>${tweetData.user.name}</h1>`).addClass("name").appendTo(header);
    $(`<h2>${tweetData.user.handle}</h2>`).addClass("handle").appendTo(header);

    //Content div
    const content = $('<div>');
    $('<p>').text(tweetData.content.text).addClass("content").appendTo(content);

    // Date Calculator
    const today = new Date();
    const tweetDate = new Date(tweetData.created_at);
    const dayCount = `${Math.floor((today - tweetDate) / 1000 / 60 / 60 / 24)} days ago`;

    // Footer
    const footer = $('<footer>');
    footer.append(`<span>${dayCount}</span>`);
    footer.append(`<img id="SMLink" src="/images/bird.png">`);
    footer.append(`<img id="SMLink" src="/images/bird.png">`);
    footer.append(`<img id="SMLink" src="/images/bird.png">`);

    // Connect Parts
    newTweet.prepend(header);
    newTweet.append(content);
    newTweet.append(footer);
    return newTweet;
  }

  // Ajax Management of Tweet post
  $('form').on('submit', function (event) {
    event.preventDefault();
    const textarea = $('textarea');
    if (textarea.val().length > 140) {
      const tooLong = $('<span>').text('Your tweet is too long!').addClass('tooLong');
      $('section').first().effect("shake");
      $('input').after(tooLong);
    } else if (textarea.val() === "") {
      textarea.attr('placeholder', 'Write your tweet here');
    } else {
      $.post('/tweets', textarea.serialize()).done(function() {
        // console.log(res);
        loadTweets();
        $('textarea').val('');
      })
    }
  });
  // reset the <textarea>
  $('textarea').on('keypress', () => {
    $('textarea').attr('placeholder', 'What are you humming about?');
    });
  $('textarea').on('focus', () => {
    $('.tooLong').remove();
  });


  function loadTweets () {
    $.get('/tweets').done(renderTweets);
  }
  loadTweets();

  // Compose button reveal Tweet Form
  $('button').on('click', () => {
    $('h2').parent().slideToggle(300);
    $('textarea').focus().select()
  });
});



































