$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
        var html = `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__message-list__info">
          <div class="chat-main__message-list__info__upper">
          <div class="chat-main__message-list__info__upper__talker">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__info__upper__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__info__lower">
          <p class="chat-main__message-list__info__lower__text">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`;

        // `
        // <div class="message" data-message-id=${message.id}></div>
        //  <div class="chat-main__message-list__info" >
        //     <div class="chat-main__message-list__info__upper">
        //       <div class="chat-main__message-list__info__upper__talker">
        //        ${message.user_name}
        //       </div>
        //     </div>
        //   </div>`
           

        return html;
      } else {
        var html = `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__message-list__info">
          <div class="chat-main__message-list__info__upper">
          <div class="chat-main__message-list__info__upper__talker">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__info__upper__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__info__lower">
          <p class="chat-main__message-list__info__lower__text">
            ${message.content}
          </p>
        </div>
      </div>`;
        // `<div class="message" data-message-id=${message.id}></div>
        //  <div class="chat-main__message-list__info" >
        //     <div class="chat-main__message-list__info__upper">
        //       <div class="chat-main__message-list__info__upper__talker">
        //        ${message.user_name}
        //       </div>
        //     </div>
        //   </div>`
          

        return html;
      };
    }

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');   
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: "json",
    processData: false,
    contentType: false,
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = "";
      $.each(messages, function(i, message) {
        console.log(message)
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    }
  })
  .fail(function(){
    alert('error')

  })
    return false;
  })

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function (messages) {
      var insertHTML ='';
          messages.forEach(function(message){
          insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      });
    })
    .fail(function () {    
      alert('メッセージの取得に失敗しました');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
  setInterval(reloadMessages, 7000);
  }
});
