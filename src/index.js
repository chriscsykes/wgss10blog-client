// change require to es6 import style
// import $ from 'jquery';
import './style.scss';

let secs = 0;

function updateSec() {
  secs += 1;
  document.getElementById('main').innerText = `You've been on this page for ${secs} seconds.`;
}

setInterval(updateSec, 1000);
