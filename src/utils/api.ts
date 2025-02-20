export const getTransactions = async (limit: number = 0) => {
  const res = await fetch(
    `http://localhost:3000/api/transactions?limit=${limit}`
  );
  const data = await res.json();
  return data.transactions;
};

export const getAssets = async (limit: number = 0) => {
  const res = await fetch(`http://localhost:3000/api/assets?limit=${limit}`);
  const data = await res.json();
  return data.assets;
};

export const getNetWorth = async (filter: DateFilter) => {
  const res = await fetch(`http://localhost:3000/api/networth/${filter}`);
  const data = await res.json();
  return data.networth;
};
