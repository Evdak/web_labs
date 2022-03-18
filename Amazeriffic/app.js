var main = function () {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.flickr.com/services/feeds/photos_public.gne?tags=dogs&format=json&jsoncallback=?",
        "method": "GET",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-host": "FlickrdidenkoradionV1.p.rapidapi.com",
            "x-rapidapi-key": "c9afee5e7cmsh23012fe3f3ba9edp118fbfjsn105e7b6fe472"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log('done');
    });
    var messages = ["первое сообщение", "второе сообщение", "третье", "четвертое"];
    var displayMessage = function (messageIndex) {
        // создаем и скрываем элемент DOM
        var $message = $("<p>").text(messages[messageIndex]).hide();
        // очищаем текущее содержимое
        // лучше всего будет выделить текущий параграф
        // и постепенно скрыть его
        $(".message").empty();
        // добавляем сообщение с messageIndex вDOM
        $(".message ").append($message);
        // постепенное отображение сообщения
        $message.fadeIn();
        setTimeout(function () {
            // через 3 секунды вызываем displayMessage снова со следующим индексом messageIndex = messageIndex + 1;
            displayMessage(messageIndex);
        }, 3000);
    };
    displayMessage(0);
}
$(document).ready(main);
