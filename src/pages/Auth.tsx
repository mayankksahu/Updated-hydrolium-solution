import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplets, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToastNotification } from "@/hooks/useToastNotification";

const DEMO_CREDENTIALS = {
  email: "admin@tankmonitor.com",
  password: "admin123",
};

export const Auth = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToastNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      if (
        formData.email === DEMO_CREDENTIALS.email &&
        formData.password === DEMO_CREDENTIALS.password
      ) {
        localStorage.setItem("tankmonitor_auth", "true");
        showToast("Login successful! Welcome back.", "success");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        showToast("Invalid credentials. Try: admin@tankmonitor.com / admin123", "error");
      }
    } else {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        showToast("Passwords do not match", "error");
        return;
      }
      showToast("Account created! Please login.", "success");
      setIsLogin(true);
      setFormData({ email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <ToastContainer />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-primary to-primary-glow p-4 rounded-2xl shadow-lg mb-4">
            <Droplets className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Smart Tank Monitor</h1>
          <p className="text-muted-foreground">Hydroleum Water Detection Solution</p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <div className="flex gap-2 mb-6 p-1 bg-secondary rounded-lg">
            <Button
              type="button"
              variant={isLogin ? "default" : "ghost"}
              className="flex-1 transition-all"
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button
              type="button"
              variant={!isLogin ? "default" : "ghost"}
              className="flex-1 transition-all"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="floating-label-input">
              <input
                type="email"
                id="email"
                placeholder=" "
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label htmlFor="email">Email Address</label>
              <Mail className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
            </div>

            <div className="floating-label-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <label htmlFor="password">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="floating-label-input">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder=" "
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Lock className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg">
              {isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-xs text-center text-muted-foreground mb-2">Demo Credentials:</p>
            <p className="text-sm text-center font-mono">
              <span className="text-primary font-semibold">admin@tankmonitor.com</span>
              <br />
              <span className="text-primary font-semibold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
