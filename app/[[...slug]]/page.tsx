// Catch-all route: /resources, /company, /worksheet, etc. all render the same SPA
// AppContext reads window.location.pathname to set the correct initial tab
export { default } from '@/app/page';
