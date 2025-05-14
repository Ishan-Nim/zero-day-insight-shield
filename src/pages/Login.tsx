
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
