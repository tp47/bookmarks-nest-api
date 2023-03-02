export const userDefaultSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
}

export interface UserDefault {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
}
