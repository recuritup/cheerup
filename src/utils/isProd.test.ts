import { describe, expect, it } from 'vitest';

import { isProd } from './isProd';

describe('isProd', () => {
  it(`인자가 'production'이면 반환 값은 'true'를 반환해야 합니다.`, () => {
    const env = 'production';

    const result = isProd(env);

    expect(result).toBe(true);
  });

  it(`인자가 'production'이 아니라면 반환 값은 'false'를 반환해야 합니다.`, () => {
    const env = 'development';

    const result = isProd(env);

    expect(result).toBe(false);
  });
});
