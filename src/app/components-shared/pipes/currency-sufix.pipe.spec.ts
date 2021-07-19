import { CurrencyShortenerPipe } from './currency-sufix.pipe';

describe('CurrencySufixPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyShortenerPipe();
    expect(pipe).toBeTruthy();
  });
});
