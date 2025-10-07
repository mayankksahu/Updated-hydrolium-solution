import { useEffect, useState, useRef } from "react";
import { Navigation } from "@/components/Layout/Navigation";
import { TankVisualization } from "@/components/Dashboard/TankVisualization";
import { RadialProgress } from "@/components/Dashboard/RadialProgress";
import { Droplets, Power, AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToastNotification } from "@/hooks/useToastNotification";

interface SensorData {
  waterLevel: number;
  emergencySwitch: string;
  pumpState: string;
  timestamp: string;
}

interface ThreatData {
  threatLevel: string;
  reason: string;
  waterLevel: number;
}

export const Dashboard = () => {
  const { showToast, ToastContainer } = useToastNotification();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [threatData, setThreatData] = useState<ThreatData | null>(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastAlertRef = useRef<number>(0);

  const fetchSensorData = async () => {
    try {
      const response = await fetch(
        "https://api.thingspeak.com/channels/3024727/feeds.json?results=1"
      );
      const data = await response.json();
      
      if (data.feeds && data.feeds.length > 0) {
        const feed = data.feeds[0];
        setSensorData({
          waterLevel: parseFloat(feed.field1) || 0,
          emergencySwitch: feed.field2 === "1" ? "ALERT" : "OK",
          pumpState: feed.field3 === "1" ? "ON" : "OFF",
          timestamp: feed.created_at,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      setLoading(false);
    }
  };

  const fetchThreatData = async () => {
    try {
      const response = await fetch('https://ml-model-for-hydroleum-solution.onrender.com/api/threat');
      const data = await response.json();
      setThreatData(data);
    } catch (error) {
      // Silently handle error as this is an external API that might not be accessible
      console.error("Error fetching threat data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    fetchThreatData();

    const sensorInterval = setInterval(fetchSensorData, 15000);
    const threatInterval = setInterval(fetchThreatData, 30000);

    return () => {
      clearInterval(sensorInterval);
      clearInterval(threatInterval);
    };
  }, []);

  useEffect(() => {
    if (sensorData && sensorData.waterLevel > 20) {
      const now = Date.now();
      // Only trigger alert every 30 seconds
      if (now - lastAlertRef.current > 30000) {
        // Try to play audio (might be blocked by browser)
        if (!audioRef.current) {
          audioRef.current = new Audio("/alert.mp3");
        }
        audioRef.current.play().catch(() => {
          // Silently handle audio play errors
        });
        
        showToast("CRITICAL: Water contamination exceeds 20%!", "error");
        lastAlertRef.current = now;
      }
    }
  }, [sensorData, showToast]);

  const isWarning = sensorData ? sensorData.waterLevel > 16 : false;
  const isCritical = sensorData ? sensorData.waterLevel > 20 : false;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ToastContainer />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Real-time Monitoring</h1>
          <p className="text-muted-foreground">Live tank status and contamination detection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-8 space-y-6">
            {/* Water Contamination KPI */}
            <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Water Contamination Level</h2>
                  <p className="text-muted-foreground">Real-time detection status</p>
                </div>
                {isCritical && (
                  <div className="pulse-glow bg-destructive/20 text-destructive px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    CRITICAL
                  </div>
                )}
                {isWarning && !isCritical && (
                  <div className="bg-warning/20 text-warning px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    WARNING
                  </div>
                )}
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                <div className="flex-shrink-0">
                  <RadialProgress value={sensorData?.waterLevel || 0} />
                </div>
                
                <div className="flex-1 w-full">
                  <TankVisualization
                    waterLevel={sensorData?.waterLevel || 0}
                    isWarning={isCritical}
                  />
                </div>
              </div>
            </div>

            {/* Sensor Controls */}
            <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                Real-time Sensor Controls
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-6 bg-secondary/50 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <Power className={cn(
                      "h-8 w-8",
                      sensorData?.pumpState === "ON" ? "text-success" : "text-muted-foreground"
                    )} />
                    <div>
                      <p className="text-sm text-muted-foreground">Pump State</p>
                      <p className="text-xl font-bold text-foreground">
                        {loading ? "Loading..." : sensorData?.pumpState || "OFF"}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "w-16 h-8 rounded-full transition-all duration-300",
                    sensorData?.pumpState === "ON" ? "bg-success" : "bg-muted"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-full bg-white shadow-lg transition-transform duration-300",
                      sensorData?.pumpState === "ON" && "translate-x-8"
                    )}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-secondary/50 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={cn(
                      "h-8 w-8",
                      sensorData?.emergencySwitch === "ALERT" ? "text-destructive" : "text-success"
                    )} />
                    <div>
                      <p className="text-sm text-muted-foreground">Emergency Switch</p>
                      <p className="text-xl font-bold text-foreground">
                        {loading ? "Loading..." : sensorData?.emergencySwitch || "OK"}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "w-16 h-8 rounded-full transition-all duration-300",
                    sensorData?.emergencySwitch === "ALERT" ? "bg-destructive" : "bg-success"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-full bg-white shadow-lg transition-transform duration-300",
                      sensorData?.emergencySwitch === "OK" && "translate-x-8"
                    )}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* System Summary */}
            <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">System Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={cn(
                    "font-semibold",
                    isCritical ? "text-destructive" : isWarning ? "text-warning" : "text-success"
                  )}>
                    {isCritical ? "Critical" : isWarning ? "Warning" : "Normal"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Update:</span>
                  <span className="font-mono text-xs">
                    {sensorData?.timestamp ? new Date(sensorData.timestamp).toLocaleTimeString() : "--:--"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Petrol Purity:</span>
                  <span className="font-semibold text-success">
                    {sensorData ? (100 - sensorData.waterLevel).toFixed(1) : "0"}%
                  </span>
                </div>
              </div>
            </div>

            {/* ThingSpeak Chart */}
            <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                Live Data Stream
              </h3>
              <iframe
                width="100%"
                height="260"
                className="rounded-lg border border-border"
                src="https://thingspeak.com/channels/3024727/charts/1?bgcolor=%23ffffff&color=%2300A389&dynamic=true&results=60&type=line"
              ></iframe>
            </div>

            {/* ML Contamination Alerts */}
            <div className={cn(
              "bg-card rounded-2xl shadow-xl p-6 border-2 transition-all",
              threatData?.threatLevel === "HIGH" ? "border-destructive pulse-glow" : "border-border"
            )}>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                ML Threat Detection
              </h3>
              
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                </div>
              ) : threatData ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Threat Level:</span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold",
                      threatData.threatLevel === "HIGH" 
                        ? "bg-destructive/20 text-destructive" 
                        : "bg-success/20 text-success"
                    )}>
                      {threatData.threatLevel}
                    </span>
                  </div>
                  {threatData.reason && (
                    <p className="text-sm text-muted-foreground border-l-2 border-primary pl-3">
                      {threatData.reason}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No threat data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
