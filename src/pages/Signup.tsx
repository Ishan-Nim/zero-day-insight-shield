
import SignupForm from "@/components/auth/SignupForm";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/f78a1255-90fc-4bf6-a3ef-839e93cd4305.png" 
            alt="CyberCrew Logo" 
            className="h-12 w-auto"
          />
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
