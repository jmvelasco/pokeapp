export const getDatesFromDateRange = (from, to) => {
  const dates = [];
  for (let date = from; date <= to; date.setDate(date.getDate() + 1)) {
    //   const cloned = new Date(date.valueOf());
    const cloned = date.valueOf();
    dates.push(cloned);
  }
  return dates;
};

export function formatDate(date, separator) {
  let options = [{year: 'numeric'}, {month: 'numeric'}, {day: 'numeric'}];
  function format(m) {
    let f = new Intl.DateTimeFormat("en", m);
    return f.format(date);
  }
  return options.map(format).join(separator);
}

export const displayDate = (stringDate) => {
  const date = new Date(stringDate);
  return date.toLocaleDateString();
};