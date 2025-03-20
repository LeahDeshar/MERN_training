import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
      {children}
    </button>
  );
}

// 🔹 Variant Styles (Color Themes)
const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
  secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-400",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
};

// 🔹 Size Styles
const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
