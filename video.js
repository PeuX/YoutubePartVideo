 // 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var players = []
var v = 0;var VidNow=0;
var promises = [];
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    var playersDiv = document.getElementById(divPlayers);
    for(i in videos){
        var promise = new Promise(function(resolve,reject){
            var t = document.createElement('div');
            playersDiv.appendChild(t);
            var id = 'player'+v++;
            t.setAttribute('id',id);
            t.style.display='none';

            var player;
            player = new YT.Player(id, {
                height: '390',
                width: '640',
                videoId: videos[i].id,
                playerVars :{
                    enablejsapi:1,
                    start:videos[i].start,
                    end:videos[i].end,
                },
                events: {
                    'onReady': function(event){
                        event.target.playVideo();
                        event.target.pauseVideo();
                        resolve();
                    },
                    'onStateChange': onPlayerStateChange
                }
            });
            players.push(player);
        });
        promises.push(promise);

    }

    Promise.all(promises).then(function(){
        var p=document.getElementById('player0');
        p.style.display='block';
        players[0].playVideo();
    });

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {

    if (event.data == YT.PlayerState.PAUSED) {
        var vOld = VidNow++;
        if(VidNow< v){
            var p=document.getElementById('player'+vOld);
            p.style.display='none';
            p=document.getElementById('player'+VidNow);
            p.style.display='block';
            players[VidNow].playVideo();
        }
    }
}




