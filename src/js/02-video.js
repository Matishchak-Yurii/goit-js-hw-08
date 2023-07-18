import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe, {
  loop: true,
  fullscreen: true,
  quality: '1080p',
});

const time = 'videoplayer-current-time';

const getCurrentTime = function (currentTime) {
  localStorage.setItem(time, currentTime.seconds);
};
player.on('timeupdate', throttle(getCurrentTime, 1000));
player.setCurrentTime(JSON.parse(localStorage.getItem(time)) || 0);
console.log(time);
