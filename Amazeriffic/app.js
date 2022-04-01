// var main = function () {
//     console.log('OK2');

//     var displayImg = function (messageIndex) {
//         // создаем и скрываем элемент DOM
//         var $img = $("<img>");
//         $img.attr("src", photo.media.m);
//         $("main.photos").append($img);
//         $message.fadeIn();
//         setTimeout(function () {
//             var url = "http://api.flickr.com/services/feeds/photos_public.gne? + tags=dogs&format=json&jsoncallback=?";
//             displayImg(function (param) {
//                 $.getJSON(url, function (flickrResponse) {
//                     flickrResponse.items.forEach(function (photo) {

//                         $img.attr(src, photo.media.m);
//                         $img.fadeIn();
//                     });
//                 });
//             });
//         }, 3000);
//     };
//     displayImg(0);
// }
// $(document).ready(main);
var searchImg = function (tag) {
    if (tag == '') {
        return alert('Пустой запрос');
    }
    "use strict";
    console.log('OK');
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?" + "tags=" + tag + "&format=json&jsoncallback=?";
    $.getJSON(url, function (flickrResponse) {
        var flickrResponse = flickrResponse.items;
        console.log(flickrResponse.length);
        // var i = 0;
        var displayImg = function (i) {
            var $img = $("<img>").hide();
            $img.attr("src", flickrResponse[i].media.m);
            $(".photos").empty();
            $(".photos").append($img);
            $img.fadeIn();
            setTimeout(function () {
                if (i + 1 < flickrResponse.length) {
                    console.log(i);
                    i = i + 1;
                    displayImg(i);
                }
                else { return }
            }, 1000);
            console.log(timeouts);
        };
        displayImg(0);
    });

};

var main = function () {
    $("input").keyup(function (event) {
        if (event.keyCode === 13) {
            $("button").click();
        }
    });
}

$(document).ready(main);
