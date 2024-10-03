export {};

interface Database {
  users: Array<{ id: string; name: string; email: string; password: string }>;
}

declare global {
  interface Window {
    db: Database;
  }
}
