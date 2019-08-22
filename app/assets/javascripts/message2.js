$(function () {
  if (document.URL.match(/groups/) && document.URL.match(/messages/)) {
    var message_main = $('.messages');

    $(function () {
      function buildHTML(message) {
        var content = message.content ? `${message.content}` : "";
        var image = message.image.url ? `<img src= ${message.image.url}>` : "";

        var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                    <p class="lower-message__content">
                      ${content}
                    </p>
                      ${image}
                    </div>
                </div>`
        message_main.append(html);
        return html;
      }

      function scrollBottom() {
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
      }

      $('#new_message').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        var url = (window.location.href);
        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
          .done(function (data) {
            buildHTML(data);
            $('#new_message')[0].reset();
            scrollBottom();

          })
          .fail(function () {
            alert('何もないのは『許可』しないィィィッ!!');
          })
          .always(function () {
            $('.form__submit').prop('disabled', false);
          });
      });
      var reloadMessages = function () {
        var last_message_id = $('.message').last().data('message-id');
        var group_id = $('.left-header').data('group-id');
        var groupMessage = '/groups/' + group_id + '/api/messages';

        $.ajax({
          url: groupMessage,
          type: 'get',
          dataType: 'json',
          data: { id: last_message_id }
        })
          .done(function (messages) {
            messages.forEach(function (message) {
              buildHTML(message);
              scrollBottom();

            });
          })
          .fail(function () {
            console.log('error');
          });
      };
      setInterval(reloadMessages, 5000);
    });
  }
});