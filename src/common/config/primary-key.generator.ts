import { monotonicFactory } from 'ulid';

// Security Primary key generator
export const credentialPkGenerator = monotonicFactory();
export const tokenPkGenerator = monotonicFactory();

// Site
export const sitePkGenerator = monotonicFactory();
export const locationPkGenerator = monotonicFactory();
export const siteManagerPkGenerator = monotonicFactory();

// Monitor
export const eventPkGenerator = monotonicFactory();

// Ticket
export const ticketPkGenerator = monotonicFactory();

// Report
export const reportPkGenerator = monotonicFactory();

// Employee
export const employeePkGenerator = monotonicFactory();
export const adminPkGenerator = monotonicFactory();
export const superAdminPkGenerator = monotonicFactory();
export const managerPkGenerator = monotonicFactory();
export const directorPkGenerator = monotonicFactory();

// Application &
export const applicationPkGenerator = monotonicFactory();

// Equipment
export const equipmentPkGenerator = monotonicFactory();
export const equipmentStatusPkGenerator = monotonicFactory();
export const equipmentTypePkGenerator = monotonicFactory();