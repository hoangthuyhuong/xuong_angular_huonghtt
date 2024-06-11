export type RegisterForm = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
export type UserLoginResponse = {
  accessToken: string;
  users: {
    id: string;
    email: string;
  }
};
export type User = {
  email: string;
  role: string;
  username: string;
};
export type UserLoginRes = {
  token: string;
  user: {
    _id: string;
    email: string;
    role: string;
    username: string;
  };
};
