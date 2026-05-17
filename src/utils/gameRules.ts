export const GAS_PRICE_PER_GALLON = 3;
export const PERFECT_TOLERANCE = 0.05;

export const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

export const getPumpError = (amount: number, target: number) =>
  Number(Math.abs(amount - target).toFixed(2));

export const isPerfectStop = (amount: number, target: number) =>
  getPumpError(amount, target) <= PERFECT_TOLERANCE;

export const getTargetProgress = (amount: number, target: number) => {
  if (target <= 0) return 0;
  return Math.min((amount / target) * 100, 120);
};

export const getPrecisionLabel = (amount: number, target: number) => {
  const error = getPumpError(amount, target);

  if (error <= PERFECT_TOLERANCE) return 'Perfect zone';
  if (amount < target) return error <= 1 ? 'Ease up' : 'Keep pumping';
  return 'Over target';
};
