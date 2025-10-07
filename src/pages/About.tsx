import { Navigation } from "@/components/Layout/Navigation";
import { Droplets, Shield, Zap, BarChart, Bell, Cloud } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Real-time Water Detection",
    description: "Advanced sensors continuously monitor fuel quality and detect water contamination instantly.",
  },
  {
    icon: Shield,
    title: "ML-Powered Threat Analysis",
    description: "Machine learning algorithms predict and alert on potential contamination threats before they escalate.",
  },
  {
    icon: Zap,
    title: "Instant Emergency Response",
    description: "Automated emergency switches and pump controls prevent damage during critical situations.",
  },
  {
    icon: BarChart,
    title: "Comprehensive Analytics",
    description: "Detailed historical data and trends help optimize operations and maintain fuel quality standards.",
  },
  {
    icon: Bell,
    title: "Multi-level Alert System",
    description: "Configurable alerts via audio, visual, and notifications ensure no critical event goes unnoticed.",
  },
  {
    icon: Cloud,
    title: "Cloud-based Monitoring",
    description: "Access your tank data from anywhere, anytime with our secure cloud platform.",
  },
];

const benefits = [
  "Prevent costly fuel contamination",
  "Reduce maintenance downtime",
  "Ensure regulatory compliance",
  "Protect customer satisfaction",
  "Minimize environmental risks",
  "Real-time operational insights",
];

export const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary">Hydroleum</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing petrol pump safety with intelligent water detection and real-time monitoring
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl shadow-xl p-8 md:p-12 border border-primary/20 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To protect fuel quality and operational integrity through cutting-edge IoT technology and AI-driven
              monitoring systems. We empower petrol pump operators with real-time insights and automated safety
              mechanisms to ensure the highest standards of fuel purity and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl shadow-xl p-6 border border-border hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">How Water Detection Works</h2>
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Continuous Sensor Monitoring</h3>
                  <p className="text-muted-foreground">
                    High-precision sensors at the tank bottom continuously measure water content using capacitance
                    technology, detecting even trace amounts of water contamination.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Data Transmission</h3>
                  <p className="text-muted-foreground">
                    Sensor data is transmitted to our cloud platform via IoT connectivity (ThingSpeak), providing
                    instant visibility into tank conditions from any device.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">ML-Powered Analysis</h3>
                  <p className="text-muted-foreground">
                    Machine learning algorithms analyze patterns and predict contamination risks, triggering
                    proactive alerts before problems escalate.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Automated Emergency Response</h3>
                  <p className="text-muted-foreground">
                    When critical thresholds are exceeded, the system automatically activates emergency protocols,
                    including pump shutoff and multi-channel alerts to operators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-card rounded-xl shadow-md p-4 border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-foreground font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">📡</div>
              <h3 className="font-semibold text-foreground">IoT Sensors</h3>
              <p className="text-sm text-muted-foreground">Capacitance-based</p>
            </div>
            <div>
              <div className="text-3xl mb-2">☁️</div>
              <h3 className="font-semibold text-foreground">ThingSpeak</h3>
              <p className="text-sm text-muted-foreground">Cloud Platform</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-foreground">ML Models</h3>
              <p className="text-sm text-muted-foreground">Threat Detection</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-foreground">Web Dashboard</h3>
              <p className="text-sm text-muted-foreground">Real-time UI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
