export interface UserBase {
  userId: string;
  name: string;
  token: string;
  role: "student" | "admin";
}

export interface StudentUser extends UserBase {
  role: "student";
  schoolId: string | null;
}

export interface AdminUser extends UserBase {
  role: "admin";
  email: string;
  phone: string;
  schoolId: string;
}

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  userName: string | null;
  schoolId: string | null;
  role: "student" | "admin" | null;
};
