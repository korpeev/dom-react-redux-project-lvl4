/* eslint-disable consistent-return */
import filter from 'leo-profanity';

filter.loadDictionary('ru');
const filterBadWords = (data) => {
  if (!data) return;
  if (Array.isArray(data)) {
    return data.map((d) => (filter.check(d.text) ? ({ ...d, text: filter.clean(d.text, '*', 2) }) : d));
  }
  return { ...data, text: filter.check(data.text) ? filter.clean(data.text, '*', 2) : data.text };
};

export { filterBadWords };
