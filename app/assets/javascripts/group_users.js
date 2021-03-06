$(function () {
  var search_list = $("#user-search-result");
  var chat_group_users_list = $("#chat-group-users");

  function userResultHTML(user) {
    var html = `<div class="chat-group-user clearfix js-chat-user">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                 </div>`
    search_list.append(html);
    return html;
  }

  function chatGroupUsers(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat_group_user_22'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    chat_group_users_list.append(html);
    return html;
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div>
                  <div class='chat-group-user'>${msg}</div>
                </div>`
    search_list.append(html);
    return html;
  }

  $(function () {
    $("#user-search-field").on("keyup", function () {
      const input = $("#user-search-field").val();
      const group_users_ids = $("#chat-group-users").data('group-users-ids');
      $.ajax({
        type: 'GET',
        url: '/users',
        dataType: 'json',
        data: {
          keyword: input,
          group: {
            group_users_ids: group_users_ids
          }
        }
      })
        .done(function (users) {
          $("#user-search-result").empty();
          if (users.length !== 0 && input.length !== 0) {
            users.forEach(function (user) {
              userResultHTML(user);
            });
          }
          else {
            appendErrMsgToHTML("一致するユーザーいません");
          }
        })
        .fail(function () {
          alert('失敗しました')
        });
    });
  });

  $(document).on("click", ".user-search-add", function () {
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    $(this).parent().remove();
    chatGroupUsers(name, user_id);
  });

  $(document).on("click", ".user-search-remove", function () {
    $(this).parent().remove();
  });
});
