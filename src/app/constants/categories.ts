export const EXPENSE_CATEGORIES = [
  'продукты',
  'проживание',
  'одежда',
  'проезд',
  'развлечения'
] as const;

export const CATEGORY_COLORS = {
  'продукты': 'rgb(141,114,220)',
  'проживание': 'rgb(81,62,136)',
  'одежда': 'rgb(162,136,240)',
  'проезд': 'rgb(120,100,180)',
  'развлечения': 'rgb(100,80,160)'
};

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
