
import LoginForm from "@/components/auth/LoginForm";
import { CcrLogo } from "@/components/CcrLogo";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <CcrLogo size="lg" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
