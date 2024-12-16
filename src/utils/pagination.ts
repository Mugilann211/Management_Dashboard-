export const paginate = <T>(data: T[], page: number, pageSize: number): T[] => {
  const startIndex = (page - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
};
