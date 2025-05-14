
import LoginForm from "@/components/auth/LoginForm";
import { CyberLogo } from "@/components/CyberLogo";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-900 to-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-background rounded-lg shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <CyberLogo />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
