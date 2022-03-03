import $ from 'jquery';
import styles from './index.module.less';
import { getMovies } from '@/api/movie';
import { createMovieTag } from '../list/index';

let container;
function init() {
  container = $('<div>').addClass(styles.container).appendTo('#app');
}

init();

/**
 * 根据传入的页码，页容量，总记录数，创建分页区域标签
 * @date 2022-03-03
 * @param {any} page
 * @param {any} limit
 * @param {any} total
 * @returns {any}
 */
export function createPager(page, limit, total) {
  container.empty();
  const pageNumber = Math.ceil(total / limit); // 最大页数

  /**
   * 辅助函数 创建一个页码标签
   * @date 2022-03-03
   * @param {any} text 标签的文本
   * @param {any} status 标签的状态 ''-普通状态 disabled-禁用状态 active-激活状态
   * @param {any} tagetPage 跳转页码数
   * @returns {any}
   */
  function createTag(text, status, tagetPage) {
    const span = $('<span>').appendTo(container).text(text);
    const className = styles[status];

    span.addClass(className);
    if (status === '') {
      span.on('click', async function () {
        const resp = await getMovies(tagetPage, limit);
        createMovieTag(resp.data.movieList);
        createPager(tagetPage, limit, resp.data.movieTotal);
      });
    }
  }
  createTag('首页', page === 1 ? 'disabled' : '', 1);
  createTag('上一页', page === 1 ? 'disabled' : '', page - 1);
  // 创建数字页码
  const maxCount = 10; // 最大数字页码数量
  let min = Math.ceil(page - maxCount / 2);
  min < 1 && (min = 1);
  let max = min + maxCount - 1;
  for (let i = min; i < max; i++) {
    createTag(i, i === page ? 'active' : '', i);
  }

  createTag('下一页', page === pageNumber ? 'disabled' : '', page + 1);
  createTag('尾页', page === pageNumber ? 'disabled' : '', pageNumber);
}
