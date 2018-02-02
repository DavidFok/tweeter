$(function(){
  const $tweetContainer = $('#tweet-container');
  const $form = $('form');
  const $textarea = $('textarea');
  const $body = $('body');

  function renderTweets (tweets) {
    for (let obj of tweets) {
      let HTMLtweet = createTweetElement(obj)
      $tweetContainer.prepend(HTMLtweet);
    }
  }

  function createTweetElement (tweetData) {
    const newTweet = $('<article>').addClass("tweet");

    //Header
    const header = $('<header>');
    header.append(`<img src=${tweetData.user.avatars.small}>`);
    $(`<h1>${tweetData.user.name}</h1>`).addClass("name").appendTo(header);
    $(`<h3>${tweetData.user.handle}</h3>`).addClass("handle").appendTo(header);

    //Content div
    const content = $('<div>');
    $('<p>').text(tweetData.content.text).addClass("content").appendTo(content);

    // Footer
    const footer = $('<footer>');
    const icon1 = $('<i>').addClass('fa fa-heart SMLink');
    const icon2 = $('<i>').addClass('fa fa-retweet SMLink');
    const icon3 = $('<i>').addClass('fa fa-flag SMLink');
    footer.append(`<span>${dayCalc(tweetData)}</span>`);
    footer.append(icon1);
    footer.append(icon2);
    footer.append(icon3);

    // Connect Parts
    newTweet.prepend(header);
    newTweet.append(content);
    newTweet.append(footer);
    return newTweet;
  }

  // Ajax Management of Tweet post
  $form.on('submit', function (event) {
    event.preventDefault();
    if ($textarea.val().length > 140) {
      const tooLong = $('<span>').text('Your tweet is too long!').addClass('tooLong');
      $('section').first().effect("shake");
      $('input').after(tooLong);
    } else if ($textarea.val() === "") {
      $textarea.attr('placeholder', 'Write your tweet here');
    } else {
      $.post('/tweets', $textarea.serialize()).done(function() {
        // console.log(res);
        $textarea.val('');
        loadTweets();
      })
    }
  });

  // reset the <textarea>
  $textarea.on('keypress', () => {
    $textarea.attr('placeholder', 'What are you humming about?');
    });
  $body.on('keypress', () => {
    $('.tooLong').remove();
  });
  $textarea.on('mousemove', () => {
    $('.tooLong').remove();
  });
  $('input').on('click', () => {       //???????????
    $('.tooLong').remove();
  });


  function loadTweets () {
    $.get('/tweets').done(renderTweets);
  }
  loadTweets();

  // Compose button reveal Tweet Form
  $('button').on('click', () => {         //??????????????
    $('h2').parent().slideToggle(300);   // ??????????????
    $textarea.focus().select()
  });
});

