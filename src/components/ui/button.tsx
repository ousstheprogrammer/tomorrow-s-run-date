import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "love" | "mischief";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "love", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex min-h-14 items-center justify-center rounded-xl px-7 py-4 font-display text-base font-black tracking-normal transition-[filter,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none",
        variant === "love" &&
          "bg-primary text-primary-foreground shadow-love hover:brightness-110",
        variant === "mischief" &&
          "border border-border-strong bg-secondary text-secondary-foreground shadow-soft hover:bg-accent",
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";