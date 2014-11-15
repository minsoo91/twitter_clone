$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.handleClick = function(event) {
  event.preventDefault();

  var formData = $(this).serialize();
  var request = this.followState === 'followed' ? 'DELETE' : 'POST';
  
  // this.render();
  this.$el.prop('disabled', true);
  
  $.ajax({
    url: '/users/' + this.userId + '/follow',
    type: request,
    data: formData,
    dataType: 'json',
    success: function () {
      this.followState = this.followState === 'followed' ? 'unfollow' : 'followed';
      this.render();
      this.$el.prop('disabled', false);
    }.bind(this),
    // error: function () {
    //   console.log("Something went wrong!");
    // }
    //
  });
};

$.FollowToggle.prototype.render = function () {
  this.$el.text(this.followState === 'unfollow' ? 'follow' : 'unfollow');
};

$.fn.followToggle = function () {
  return this.each(function (idx, el) {
    new $.FollowToggle(el);
  });
};

// $(function () {
//   $("button.follow-toggle").followToggle();
// });