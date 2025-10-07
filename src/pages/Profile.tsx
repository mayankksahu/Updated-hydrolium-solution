import { useState } from "react";
import { Navigation } from "@/components/Layout/Navigation";
import { Button } from "@/components/ui/button";
import { User, Building2, Save, Edit, KeyRound } from "lucide-react";
import { useToastNotification } from "@/hooks/useToastNotification";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Profile = () => {
  const { showToast, ToastContainer } = useToastNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [formData, setFormData] = useState({
    fullName: "Admin User",
    email: "admin@tankmonitor.com",
    phone: "+91 98765 43210",
    role: "System Administrator",
    stationName: "Hydroleum Station Alpha",
    stationAddress: "Tech Park, Sector 15, Mumbai",
    stationCapacity: "50000",
    licenseNumber: "HS-2024-001",
  });

  const handleSave = () => {
    showToast("Profile updated successfully!", "success");
    setIsEditing(false);
  };

  const handlePasswordReset = () => {
    if (!resetEmail || !resetEmail.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    // Simulate password reset
    showToast("Password reset link sent to your email!", "success");
    setResetPasswordOpen(false);
    setResetEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ToastContainer />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">User Profile</h1>
          <p className="text-muted-foreground">Manage your account and station information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture & Quick Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-xl p-8 border border-border text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mb-4 shadow-lg">
                <User className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{formData.fullName}</h2>
              <p className="text-muted-foreground mb-4">{formData.role}</p>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                className="w-full gap-2"
              >
                <Edit className="h-4 w-4" />
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </Button>

              <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <KeyRound className="h-4 w-4" />
                    Reset Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                      Enter your email address and we'll send you a link to reset your password.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="floating-label-input">
                      <input
                        type="email"
                        id="resetEmail"
                        placeholder=" "
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
                      <label htmlFor="resetEmail">Email Address</label>
                    </div>
                    <Button onClick={handlePasswordReset} className="w-full">
                      Send Reset Link
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-3">Account Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-success">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since:</span>
                  <span className="font-semibold">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License:</span>
                  <span className="font-semibold text-primary">{formData.licenseNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="floating-label-input">
                  <input
                    type="text"
                    id="fullName"
                    placeholder=" "
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    disabled={!isEditing}
                  />
                  <label htmlFor="fullName">Full Name</label>
                </div>

                <div className="floating-label-input">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="floating-label-input">
                  <input
                    type="tel"
                    id="phone"
                    placeholder=" "
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                  <label htmlFor="phone">Phone Number</label>
                </div>

                <div className="floating-label-input">
                  <input
                    type="text"
                    id="role"
                    placeholder=" "
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    disabled={!isEditing}
                  />
                  <label htmlFor="role">Role</label>
                </div>
              </div>
            </div>

            {/* Station Information */}
            <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Building2 className="h-6 w-6 text-primary" />
                Station Information
              </h2>

              <div className="space-y-6">
                <div className="floating-label-input">
                  <input
                    type="text"
                    id="stationName"
                    placeholder=" "
                    value={formData.stationName}
                    onChange={(e) => setFormData({ ...formData, stationName: e.target.value })}
                    disabled={!isEditing}
                  />
                  <label htmlFor="stationName">Station Name</label>
                </div>

                <div className="floating-label-input">
                  <input
                    type="text"
                    id="stationAddress"
                    placeholder=" "
                    value={formData.stationAddress}
                    onChange={(e) => setFormData({ ...formData, stationAddress: e.target.value })}
                    disabled={!isEditing}
                  />
                  <label htmlFor="stationAddress">Station Address</label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="floating-label-input">
                    <input
                      type="text"
                      id="stationCapacity"
                      placeholder=" "
                      value={formData.stationCapacity}
                      onChange={(e) => setFormData({ ...formData, stationCapacity: e.target.value })}
                      disabled={!isEditing}
                    />
                    <label htmlFor="stationCapacity">Tank Capacity (Liters)</label>
                  </div>

                  <div className="floating-label-input">
                    <input
                      type="text"
                      id="licenseNumber"
                      placeholder=" "
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      disabled={!isEditing}
                    />
                    <label htmlFor="licenseNumber">License Number</label>
                  </div>
                </div>
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="w-full mt-6 h-12 text-base font-semibold gap-2">
                  <Save className="h-5 w-5" />
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
