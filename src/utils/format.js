export const formatCurrency = (v) => {
  if (v == null) return '-';
  // show dollars with thousands separator
  return '$' + Number(v).toLocaleString();
};

export const formatPercent = (v) => {
  if (v == null) return '-';
  return Number(v).toFixed(2) + '%';
};
