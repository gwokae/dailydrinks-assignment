export const SORT_ORDER = { ASC: 'asc', DESC: 'desc' };

export const resolveCompare = (order, a, b) => (order === SORT_ORDER.DESC ? [b, a] : [a, b]);
