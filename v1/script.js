// Scripts.js

$(function(){
var videoId;
var save = [44];
$.get(
  "https://www.googleapis.com/youtube/v3/playlistItems", {
    part: 'snippet',
    maxResults: 44,
    playlistId: 'PLwUSw0O4FYbQ2t6WNWXgl3TH63MTXdAdU',
    key: 'AIzaSyD3wRE0k6Q-zGj8-j-yP0tn5KG2kFF0Vok'},
    function(data){
      var output;
      // console.log(data.items[2].snippet.resourceId.videoId);
      // $('#wrapper').tubular({videoId: data.items[2].snippet.resourceId.videoId});
      // videoId = data.items[3].snippet.resourceId.videoId
      // yazdir(videoId);

      $.each(data.items, function(i, item){
        videoTitle = item.snippet.title;
        videoId = item.snippet.resourceId.videoId;
        console.log(i);
        save[i] = {
          "index": i,
          "id": videoId
        }


        // yazdir(i, videoId)
        // output = '<li><iframe src=\"//youtube.com/embed/'+ videoId +'\"></iframe></li>';
        // $('#results').append(output);

      })
    }
);

  // This is a hack - I couldn't define glabal variable in $.get function so I save videoIds like this
  // var savedId = [];
  // function yazdir(index, videoId){
  //   savedId = save;
  //
  // }

$('.playnext').on('click', function(event){
  event.preventDefault();
  var randomNum = Math.floor(Math.random() * 44);
  console.log(save);
  console.log(randomNum);
  console.log(save[randomNum].id);
  output = '<iframe frameborder=\"0\" height=\"100%\" width=\"100%\"src=\"//youtube.com/embed/'+save[randomNum].id+'?autoplay=1&controls=0&showinfo=0&autohide=1&enablejsapi=1\"></iframe>';
  $('.fullscreen').append(output);


});

  // function yazdir(videoId){
  //   console.log(videoId);
  //   $('#wrapper').tubular({videoId: videoId});
  // }

var player;


var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
  // create the global player from the specific iframe (#video)
  player = new YT.Player('video', {
    events: {
      // call this function when player is ready to use
      'onReady': onPlayerReady()
    }
  });
  console.log('ddss');
}

function onPlayerReady(event) {

  $('.pause').on('click', function() {
    console.log('dd');
    player.pauseVideo();
  });

}




});
