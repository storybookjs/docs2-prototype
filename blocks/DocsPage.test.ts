import { extractTitle } from './Title';

describe('defaultTitleSlot', () => {
  it('splits on last /', () => {
    expect(extractTitle({ title: 'a/b/c' } as any)).toBe('c');
    expect(extractTitle({ title: 'a|b' } as any)).toBe('a|b');
    expect(extractTitle({ title: 'a/b/c.d' } as any)).toBe('c.d');
  });
});
