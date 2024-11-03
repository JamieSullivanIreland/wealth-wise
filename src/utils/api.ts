export const getTransactions = async (limit: number = 6) => {
  const res = await fetch(
    `http://localhost:3000/api/transactions?limit=${limit}`
  );
  const data = await res.json();
  return data.transactions;
};

export const getAssets = async (limit: number = 4) => {
  const res = await fetch(`http://localhost:3000/api/assets?limit=${limit}`);
  const data = await res.json();
  return data.assets;
};
