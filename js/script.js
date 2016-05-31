
var videoId,
    videoArray = [44],
    timeInterval,
    mPlayer,
    playerDefaults,
    randomVid;

// Getting Playlist with Youtube Api key
$.get(
  "https://www.googleapis.com/youtube/v3/playlistItems", {
    part: 'snippet',
    maxResults: 44,
    playlistId: 'PLwUSw0O4FYbQ2t6WNWXgl3TH63MTXdAdU',
    key: 'AIzaSyD3wRE0k6Q-zGj8-j-yP0tn5KG2kFF0Vok'},
    function(data){
      var output;
      $.each(data.items, function(i, item){
        videoTitle = item.snippet.title;
        videoId = item.snippet.resourceId.videoId;
        videoArray[i] = {
          "index": i,
          "id": videoId
        }
      })
    }
);

// Youtube Api config
var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

playerDefaults = {
  autoplay: 0,
  autohide: 1,
  modestbranding: 0,
  rel: 0,
  showinfo: 0,
  controls: 0,
  disablekb: 1,
  enablejsapi: 0,
  iv_load_policy: 3
};
randomVid = Math.floor(Math.random() * (44 - 1 + 1));

function onYouTubePlayerAPIReady(){
  mPlayer = new YT.Player('mplayer', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  mPlayer.loadVideoById(videoArray[randomVid].id);

  // Timeline
  timeInterval = setInterval(function(){
    timeValue = Math.round(mPlayer.getCurrentTime() / mPlayer.getDuration() * 100) ;
    displayTime(timeValue);
  }, 1000);

}

function onPlayerStateChange(event) {
  if (event.data === 1){
    $('#mPlayer').addClass('active');
  } else if (event.data === 0){
    randomVid++;
    onPlayerReady(randomVid);
  }
}

function displayTime(timeValue){
  $('.dial').val(timeValue).trigger('change'); // Knob.js Manupulation
  $('.time').text(mPlayer.getCurrentTime());
}

// Knob.js Config
$('.dial').knob({
  'width': 40,
  'height': 40,
  'thickness': .2,
  'fgColor': '#c7d4c7',
  'bgColor': '#282430',
  'readOnly': false,
  'displayInput' : false,
  'change' : function(v){
    console.log(v);
  }
});

// Pause and Resume controller
$('.on-off').on('click', function(){
  var $_this = $(this);
  if ($_this.hasClass('rotate')){
    $_this.removeClass('rotate');
    mPlayer.playVideo();
  }
  else {
    $_this.addClass('rotate');
    mPlayer.pauseVideo();
  }
})

$('.player-next').on('click', function(){
  randomVid++;
  onPlayerReady(randomVid);
});

$('.pause').on('click', function(){
  mPlayer.pauseVideo();
});

$('.stop').on('click', function(){
  mPlayer.stopVideo();
});

$('.resume').on('click', function(){
  mPlayer.playVideo();
});
