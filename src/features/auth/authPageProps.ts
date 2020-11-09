import { AuthPage } from './authSlice';

export default interface AuthPageProps {
  onSuccess: () => void;
  isDialog?: boolean;
  redirect?: (s: AuthPage) => void;
}
