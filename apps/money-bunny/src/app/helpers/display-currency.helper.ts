import { Currency } from '@money-bunny/models';

export function displayCurrencyHelper(currency: Currency): string {
  const labelMap: Record<Currency, string> = {
    [Currency.CHF]: 'CHF',
    [Currency.RUB]: 'RUB',
    [Currency.USD]: 'USD',
  };

  return labelMap[currency];
}
