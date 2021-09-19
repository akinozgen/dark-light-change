import '../styles/index.scss';
import '../styles/toggle.scss';
import '../styles/notice.scss';
import img from '/src/bg.png';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

document.getElementById('img').attributes['src'].value = img;


document.getElementById('mode-switch').addEventListener('change', function() {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    return document.body.classList.add('light');
  }

  document.body.classList.remove('light');
  return document.body.classList.add('dark');
});

document.getElementById('dismiss').addEventListener('click', function() {
  var notice = document.getElementById('cookie-notice');
  if (notice) notice.parentNode.removeChild(notice);
});
