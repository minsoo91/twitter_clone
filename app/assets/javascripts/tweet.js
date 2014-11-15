$.TweetCompose = function (el) {
  this.$el = $(el);
  // this.userId = this.$el.data("user-id") || options.userId;
//   this.followState = this.$el.data("initial-follow-state") || options.followState;
//   this.render();
  this.$el.on("submit", this.submit.bind(this));
  this.$el.find('textarea').on('keyup', this.charsLeft.bind(this));
};

$.TweetCompose.prototype.submit = function(event) {
  event.preventDefault();
  var formJSON = $(event.currentTarget).serializeJSON();
  var formData = $(this).serialize();
  $(':input').prop('disabled', true);
  $.ajax({
    url: '/tweets',
    type: 'POST',
    data: formJSON,
    dataType: 'json',
    success: function (tweet) {
      this.handleSuccess($(event.currentTarget), tweet);
    }.bind(this),
  });
}

$.TweetCompose.prototype.clearInput = function($form) {
  $form.find('textarea').val('');
  $form.find('select').val('default');
}

$.TweetCompose.prototype.handleSuccess = function($form, tweet) {
  $(':input').prop('disabled', false);
  this.clearInput($form)
  debugger;
  tweet = JSON.stringify(tweet);
  $li = $('li')
  $li.append(tweet)
  debugger;
  var list = $($form.data('data-tweets-ul'))
  list.append($li);
}

$.TweetCompose.prototype.charsLeft = function(event) {
  
  var chars = $(event.currentTarget).val().length;
  if(140 - chars <= 0) {
    $(event.currentTarget).val($(event.currentTarget).val().substring(0, 140));
  }
  this.$el.find('strong').text(140 - chars);
}

$.fn.tweetCompose = function (options) {
  return this.each(function () {
    new $.TweetCompose(this, options);
  });
};

$(function () {
  $(".tweet-compose").tweetCompose();
});