import { useState } from "react";
import { Navigation } from "@/components/Layout/Navigation";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToastNotification } from "@/hooks/useToastNotification";

export const Contact = () => {
  const { showToast, ToastContainer } = useToastNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "STANDARD",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    showToast("Message sent successfully! We'll get back to you soon.", "success");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "STANDARD",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ToastContainer />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Contact Support</h1>
          <p className="text-muted-foreground">Get in touch with our technical team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="floating-label-input">
                    <input
                      type="text"
                      id="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <label htmlFor="name">Full Name</label>
                  </div>

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
                  </div>
                </div>

                <div className="floating-label-input">
                  <input
                    type="text"
                    id="subject"
                    placeholder=" "
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                  <label htmlFor="subject">Subject</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Priority Level
                  </label>
                  <div className="flex gap-2">
                    {["CRITICAL", "HIGH", "STANDARD"].map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority })}
                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                          formData.priority === priority
                            ? priority === "CRITICAL"
                              ? "bg-destructive text-destructive-foreground"
                              : priority === "HIGH"
                              ? "bg-warning text-warning-foreground"
                              : "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="floating-label-input">
                  <textarea
                    id="message"
                    placeholder=" "
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                  <label htmlFor="message">Message</label>
                </div>

                <Button type="submit" className="w-full h-12 text-base font-semibold gap-2">
                  <Send className="h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-2">24/7 Emergency Hotline</p>
                  <a href="tel:+911800123456" className="text-primary font-semibold hover:underline">
                    +91 1800 123 456
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-2">Response within 24 hours</p>
                  <a
                    href="mailto:support@hydroleum.com"
                    className="text-primary font-semibold hover:underline break-all"
                  >
                    support@hydroleum.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Location</h3>
                  <p className="text-sm text-muted-foreground mb-2">Visit us during business hours</p>
                  <address className="text-sm text-foreground not-italic">
                    Hydroleum Solutions Pvt. Ltd.<br />
                    Tech Park, Sector 15<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </address>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For critical system alerts and emergencies, please call our 24/7 hotline immediately.
              </p>
              <Button className="w-full gap-2">
                <Phone className="h-4 w-4" />
                Call Emergency Hotline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
