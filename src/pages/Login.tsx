
import LoginForm from "@/components/auth/LoginForm";
import { CyberLogo } from "@/components/CyberLogo";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <CyberLogo />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
