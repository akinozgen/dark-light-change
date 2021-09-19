import '../styles/index.scss';
import '../styles/toggle.scss';
import '../styles/notice.scss';
import '../styles/responsive.scss';
import img from '/src/bg.png';
import stars from '/src/stars.png';
import normalize from "./normalize";
import { fromEvent, interval } from 'rxjs';
import { throttle } from 'rxjs/operators';

const backgroundSlideThrottle = 10;
const backgroundSlideSensitivity = 10;

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

// Images
document.getElementById('img').attributes['src'].value = img;
document.querySelector('.stars').style.backgroundImage = `url('${stars}')`;

// Mode switch handler
document.getElementById('mode-switch').addEventListener('change', function() {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    return document.body.classList.add('light');
  }

  document.body.classList.remove('light');
  return document.body.classList.add('dark');
});

// Dismiss button Handler
document.getElementById('dismiss').addEventListener('click', function() {
  let notice = document.getElementById('cookie-notice');
  if (notice) notice.parentNode.removeChild(notice);
});

// Mouse move handler
const moveEvent = fromEvent(document, 'mousemove');
const moveEventResults = moveEvent.pipe(
    throttle(() => interval(backgroundSlideThrottle))
);

moveEventResults.subscribe(function (e) {
  const { clientX, clientY } = e;
  const point = {x: clientX, y:clientY};
  const normalizeX = normalize(0, window.visualViewport.width * backgroundSlideSensitivity);
  const normalizeY = normalize(0, window.visualViewport.height * backgroundSlideSensitivity);

  point.x = normalizeX(point.x) * 100;
  point.y = normalizeY(point.y) * 100;

  document.querySelector('.stars').style.backgroundPositionX = `${point.x}%`;
  document.querySelector('.stars').style.backgroundPositionY = `${point.y}%`;
});
