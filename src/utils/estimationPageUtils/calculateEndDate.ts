export const calculateEndDate = (
  startDate: number,
  totalUnits: number,
  unitsPerDay: number
) => {
  const daysRequired = totalUnits / unitsPerDay;
  const endDate = startDate + daysRequired - 1;

  return Math.ceil(endDate);
};
