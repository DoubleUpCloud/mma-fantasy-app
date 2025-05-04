import RegisterForm from '@/components/auth/RegisterForm';
import AuthLayout from '@/components/auth/AuthLayout';

export const metadata = {
  title: 'Register - Fantasy MMA',
  description: 'Create a new Fantasy MMA account to start predicting fights',
};

export default function RegisterPage() {
  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join Fantasy MMA and start predicting fight outcomes!"
    >
      <RegisterForm />
    </AuthLayout>
  );
}