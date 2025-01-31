import { monotonicFactory } from 'ulid';

// Security Primary key generator
export const credentialPkGenerator = monotonicFactory(() => Date.now());
export const tokenPkGenerator = monotonicFactory(() => Date.now());
