// change require to es6 import style
import $ from 'jquery';
import './style.scss';

let secs = 0;

// // javascript format
// function updateSec() {
//   secs += 1;
//   document.getElementById('main').innerText = `You've been on this page for ${secs} seconds.`;
// }

// jquery
$(document).ready(() => {
  setInterval(() => {
    secs += 1;
    document.getElementById('main').innerText = `You've been on this page for ${secs} seconds.`;
  }, 1000);
});
