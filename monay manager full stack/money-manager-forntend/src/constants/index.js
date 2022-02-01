import randomColor from "randomcolor";

// const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d', '#00ff9d'];
// const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f'];

// export const incomeCategories = [
//   { type: 'Business', cost: 0, color: incomeColors[0] },
//   { type: 'Investments', cost: 0, color: incomeColors[1] },
//   { type: 'Extra income', cost: 0, color: incomeColors[2] },
//   { type: 'Deposits', cost: 0, color: incomeColors[3] },
//   { type: 'Lottery', cost: 0, color: incomeColors[4] },
//   { type: 'Gifts', cost: 0, color: incomeColors[5] },
//   { type: 'Salary', cost: 0, color: incomeColors[6] },
//   { type: 'Savings', cost: 0, color: incomeColors[7] },
//   { type: 'Rental income', cost: 0, color: incomeColors[8] },
// ];

// export const expenseCategories = [
//   { type: 'Bills', cost: 0, color: expenseColors[0] },
//   { type: 'Car', cost: 0, color: expenseColors[1] },
//   { type: 'Clothes', cost: 0, color: expenseColors[2] },
//   { type: 'Travel', cost: 0, color: expenseColors[3] },
//   { type: 'Food', cost: 0, color: expenseColors[4] },
//   { type: 'Shopping', cost: 0, color: expenseColors[5] },
//   { type: 'House', cost: 0, color: expenseColors[6] },
//   { type: 'Entertainment', cost: 0, color: expenseColors[7] },
//   { type: 'Phone', cost: 0, color: expenseColors[8] },
//   { type: 'Pets', cost: 0, color: expenseColors[9] },
//   { type: 'Other', cost: 0, color: expenseColors[10] },
// ];

export const incomeCategories = [
  { type: "Business", cost: 0, color: randomColor() },
  { type: "Investments", cost: 0, color: randomColor() },
  { type: "Extra income", cost: 0, color: randomColor() },
  { type: "Deposits", cost: 0, color: randomColor() },
  { type: "Lottery", cost: 0, color: randomColor() },
  { type: "Gifts", cost: 0, color: randomColor() },
  { type: "Salary", cost: 0, color: randomColor() },
  { type: "Savings", cost: 0, color: randomColor() },
  { type: "Rental income", cost: 0, color: randomColor() },
];

export const expenseCategories = [
  { type: "Bills", cost: 0, color: randomColor() },
  { type: "Car", cost: 0, color: randomColor() },
  { type: "Clothes", cost: 0, color: randomColor() },
  { type: "Travel", cost: 0, color: randomColor() },
  { type: "Food", cost: 0, color: randomColor() },
  { type: "Shopping", cost: 0, color: randomColor() },
  { type: "House", cost: 0, color: randomColor() },
  { type: "Entertainment", cost: 0, color: randomColor() },
  { type: "Phone", cost: 0, color: randomColor() },
  { type: "Pets", cost: 0, color: randomColor() },
  { type: "Other", cost: 0, color: randomColor() },
];

export const resetCategories = () => {
  incomeCategories.forEach((c) => (c.cost = 0));
  expenseCategories.forEach((c) => (c.cost = 0));
};
