import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
    const data = {
        duration: 61.857,
        percent: 0.049,
        seconds: 3.034,
};  
    const savedTime = localStorage.getItem('videoplayer-current-time');
    const parsedTime = JSON.parse(savedTime);
player.on('timeupdate', throttle(onUpdateVideoTime, 1000) );
    
function onUpdateVideoTime (data) {
   const storageInfo = JSON.stringify(data);
    localStorage.setItem('videoplayer-current-time', storageInfo); 
};


if (parsedTime.seconds) {
    player.setCurrentTime(parsedTime.seconds);
}

