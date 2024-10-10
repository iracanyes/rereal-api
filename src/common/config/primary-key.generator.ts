import { monotonicFactory } from 'ulid';

// Security Primary key generator
export const credentialPkGenerator = monotonicFactory();
export const tokenPkGenerator = monotonicFactory();
