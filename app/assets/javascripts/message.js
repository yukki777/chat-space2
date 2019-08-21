$(window).on('load', function () {
  if (document.URL.match(/groups/) && document.URL.match(/messages/)) {

    $(function () {
      function buildHTML(message) {
        var content = message.content ? `${message.content}` : "";
        var image = message.image ? `<img src= ${message.image}>` : "";
        var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.name}
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
        return html;
      }

      function scrollBottom() {
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, "300", "swing");
      }

      $('#message_content').on('submit', function (e) {
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
            var html = buildHTML(data);
            $('.massages').append(html)
            $('#message_content').reset();
          })
          .fail(function () {
            alert('error');
          })
          .always(function () {
            $('.submit-btn').prop('disabled', false);
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
              var html = buildHTML(message);
              $('.massages').append(html)
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
