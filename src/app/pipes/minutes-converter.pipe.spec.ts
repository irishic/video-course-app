import { MinutesConverterPipe } from './minutes-converter.pipe';

describe('MinutesConverterPipe', () => {
  it('it receives amount of minutes and creates Xh Ymin string', () => {
    const pipe = new MinutesConverterPipe();
    expect(pipe.transform(96)).toBe("1h 36min");
  });
});
