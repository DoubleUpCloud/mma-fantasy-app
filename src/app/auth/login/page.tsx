import LoginForm from '@/components/auth/LoginForm';
import AuthLayout from '@/components/auth/AuthLayout';

export const metadata = {
  title: 'Login - Fantasy MMA',
  description: 'Sign in to your Fantasy MMA account',
};

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Sign In" 
      subtitle="Welcome back! Sign in to access your Fantasy MMA account."
    >
      <LoginForm />
    </AuthLayout>
  );
}