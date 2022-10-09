import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_TIME = 'videoplayer-current-time';

updateMainCurrentTime();

const onPlay = function (currentTime) {
  const currTime = currentTime.seconds;
  console.log(currTime);
  localStorage.setItem(STORAGE_TIME, currTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

function updateMainCurrentTime() {
  const saveTime = localStorage.getItem(STORAGE_TIME);

  if (saveTime) {
    player.setCurrentTime(saveTime);
  }
}
