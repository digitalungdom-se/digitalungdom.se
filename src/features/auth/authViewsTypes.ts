export interface AuthViewsProps {
  onSuccess: () => void;
  isDialog?: boolean;
  redirect?: (s: AuthViews) => void;
}

export type AuthViews = null | 'LOGIN' | 'REGISTER' | 'VERIFY';
