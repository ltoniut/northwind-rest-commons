import { Context } from '@src/shared/dtos/context';

export function mockContext(overrides: Record<string, any> = {}): Context {
  return new Context({
    userId: 4,
    finitials: 'ERA',
    fpassword: 'FUDGE',
    fname: 'EILEEN ROSE',
    fmenu: 'MMENU',
    flevel: 5,
    email: 'ltoniut@gmail.com',
    ...overrides,
  });
}
