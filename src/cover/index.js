import $ from 'jquery';
import styles from './index.module.less';
import videoUrl from '../assets/movie.mp4';

function init() {
  const container = $('<div>').addClass(styles.container).appendTo('#app');
  const video = $('<video>')
    .prop('src', videoUrl)
    .prop('autoplay', true)
    .prop('loop', true)
    .addClass(styles.video)
    .appendTo(container);

  $('<h1>').text('LLLLuoxi电影').addClass(styles.title).appendTo(container);

  $(window).on('scroll', function () {
    const scrollTop = $(window).scrollTop();
    const vHeight = $(window).height();
    console.log('scrollTop', scrollTop);
    console.log('vHeight', vHeight);
    if (scrollTop >= vHeight) {
      console.log('暂停');
      video[0].pause();
    } else {
      console.log('播放');
      video[0].play();
    }
  });
}
init();
