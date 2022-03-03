import $ from 'jquery';
import styles from './index.module.less';

let container;
function init() {
  container = $('<div>').addClass(styles.container).appendTo('#app');
}

init();

export function createMovieTag(movies) {
  const result = movies.map((m) => {
    return `<div class="item">
    <a href="${m.url}" target="_blank"><img src="${m.cover}"></a>
    <a href="${m.url}" target="_blank"><p class="${styles.title}">${m.title}</p></a>
    <p class="${styles.rate}">${m.rate}</p>
    </div>`;
  });
  container.html(result.join(''));
}
