/*jslint browser: true plusplus: true*/
/*global $, jQuery, alert, console*/
$(document).ready(function () {
  "use strict";

  var tweet_text,
    $quote = $('#quote'),
    $author = $('#author'),
    $tweet = $("#tweet"),
    $generate = $('#generate'),
    $currentQuote = $('.currentQuote');

  function generateTweet(data) {
    if (data.length > 100) {
      data = data.slice(0, 100);
      data += "...";
    }
    tweet_text = encodeURIComponent(data);
    $tweet.attr("href", "https://twitter.com/intent/tweet?text=" + tweet_text + "~ http://ihelios.me");
  }

  function getQuote() {
    $.ajax({
      jsonp: "jsonp",
      dataType: "jsonp",
      url: 'http://api.forismatic.com/api/1.0/',
      contentType: 'application/jsonp',
      data: {
        lang: "en",
        method: "getQuote",
        format: "jsonp"
      },
      success: function (data) {
        $currentQuote.fadeOut(150, function () {
          $quote.text(data.quoteText);
          if (data.quoteAuthor === "") {
            $author.text('Unknown');
          } else {
            $author.text(data.quoteAuthor );
          }
        }).fadeIn(150);

        generateTweet(data.quoteText);

      },
      error: function (data) {
        $quote.text("Error Loading Quote");
        $author.text('Please try again after some time...');
      }
    });
  }

  $generate.click(function () {
    getQuote().fadeIn('slow');
  });
  getQuote().fadeIn('slow');
});
