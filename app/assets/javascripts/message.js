$(function () {
  function buildHTML(message) {
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message">
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
        scrollBottom();
        $('.massages').append(html)
        $('#message_content').reset();
      })
      .fail(function () {
        alert('error');
      })
      .always(function () {
        $('.submit-btn').prop('disabled', false);
      })
  })
});
