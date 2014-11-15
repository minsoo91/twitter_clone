$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find('#search-bar');
  this.$ul = this.$el.find('.users');
  this.$input.on("input", this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function (event) {
  event.preventDefault();
  // console.log(event.currentTarget.value);
  var chars = event.currentTarget.value;
  $.ajax({
    url: '/users/search',
    type: 'GET',
    data: {query: chars},
    dataType: 'json',
    success: function (users) {
      this.addUsers(users);
    }.bind(this),
  });
}

$.UsersSearch.prototype.addUsers = function(users) {
  this.$ul.empty();
  for(var i = 0; i < users.length; i++) {
    var $li = $('<li>');
    
    var $a = $("<a>");
    $a.attr("href", "/users/" + users[i].id + "/");
    $a.text(users[i].username);
    
    var $button = $("<button type='submit'>");
    $button.data("initial-follow-state", users[i].followed ? 'followed' : 'unfollow');
    $button.data("user-id", users[i].id);
    
    $li.append($a).append($button);
    this.$ul.append($li);
    new $.FollowToggle($button);
  }
}

$(function() {
  $('.users-search').usersSearch();
})

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

