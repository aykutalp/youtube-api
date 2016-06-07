var timeInterval,
    mPlayer,
    videoList,
    randomNum,
    oldNum,
    num;

var playerDefaults = {
      autoplay: 0,
      autohide: 1,
      modestbranding: 0,
      rel: 0,
      showinfo: 0,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      iv_load_policy: 3
};

// Youtube Iframe Api config
var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady(){
  mPlayer = new YT.Player('mplayer', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: playerDefaults
  });
}

function onPlayerReady(){
  // 1- First cue a playlist but not play
  mPlayer.cuePlaylist({
    'listType': 'playlist',
    'list': 'PLwUSw0O4FYbTOkprHePUAi7aoqo2EwofK',
    'index': 0,
    'startSeconds': '0'
  });

  // Circle Timeline
  clearInterval(timeInterval);
  timeInterval = setInterval(function(){
    timeValue = Math.round(mPlayer.getCurrentTime() / mPlayer.getDuration() * 100);
    displayTime(timeValue);
  }, 1000);
}


function onPlayerStateChange(event) {
  // Player state 0 = ended  1 = playing
  if(event.data == YT.PlayerState.CUED){
    // 2- Get video id's from playlist
    videoList = mPlayer.getPlaylist();
    nextVid();
  }
  if(event.data == YT.PlayerState.ENDED) {
    nextVid();
  }
}

function nextVid() {
  num = randomId();
  // 3- Load videos one by one
  mPlayer.loadVideoById({
    'videoId': videoList[num]
  });
  videoTitle(videoList[num]);
  console.log(videoList.length);
}

function randomId(){
  oldNum = randomNum;
  randomNum = Math.floor(Math.random() * videoList.length);
  if (oldNum == randomNum){
    randomId();
  } else {
    return randomNum;
  }
}

// Youtube Iframe api doesn't provide Video title so use youtube data api on google developer console
function videoTitle(id){
  $.get("https://www.googleapis.com/youtube/v3/videos", {
      part: 'snippet',
      id: id,
      key: 'AIzaSyD3wRE0k6Q-zGj8-j-yP0tn5KG2kFF0Vok'},
      function(data){
          var vTitle = data.items[0].snippet.title;
          console.log(vTitle);
      }
  );
}

function displayTime(timeValue){
  $('.dial').val(timeValue).trigger('change'); // Knob.js Manupulation
  // $('.time').text(mPlayer.getCurrentTime() +' / '+ mPlayer.getDuration() +' / '+ timeValue);
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
  nextVid();
});

// $('.pause').on('click', function(){
//   mPlayer.pauseVideo();
// });
//
// $('.stop').on('click', function(){
//   mPlayer.stopVideo();
// });
//
// $('.resume').on('click', function(){
//   mPlayer.playVideo();
// });
