
import LoginForm from "@/components/auth/LoginForm";
import { CcrLogo } from "@/components/CcrLogo";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <CcrLogo size="lg" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
