import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

interface ToastNotificationProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export const ToastNotification = ({
  message,
  type,
  onClose,
  duration = 3000,
}: ToastNotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl animate-in slide-in-from-top-5 bg-card border-2",
        type === "success" && "border-success",
        type === "error" && "border-destructive",
        type === "info" && "border-primary"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5",
          type === "success" && "text-success",
          type === "error" && "text-destructive",
          type === "info" && "text-primary"
        )}
      />
      <p className="text-sm font-medium text-foreground">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
