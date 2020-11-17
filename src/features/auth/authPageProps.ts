import { AuthPage } from './authSlice';

export default interface AuthPageProps {
  onSuccess: (email: string) => void;
  isDialog?: boolean;
  redirect?: (s: AuthPage, email?: string) => void;
}
