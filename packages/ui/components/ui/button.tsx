import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../config/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "whitespace-nowrap bg-primary text-lg text-primary-foreground rounded-lg hover:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground backdrop-blur-lg backdrop-saturate-150 bg-background/70",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "btn-primary":
          "whitespace-nowrap text-primary-foreground dark:bg-gradient-to-t dark:from-[#24232C] dark:to-[#100F18] dark:text-primary-foreground border hover:border-primary dark:border-[#464553] dark:bg-accent bg-primary dark:border-muted-foreground text-lg font-normal shadow-xl shadow-purple-500/20 dark:shadow-purple-400/10 dark:shadow-lg",
        "btn-secondary":
          "whitespace-nowrap dark:text-primary-foreground bg-muted text-lg font-normal",
        "btn-sidebar":
          "whitespace-nowrap hover:scale-105 duration-100 transition-all dark:text-primary-foreground text-lg font-normal hover:bg-white border-[0.2px] hover:border-black/10 hover: hover:text-accent-foreground dark:hover:bg-accent dark:hover:border-muted-foreground dark:hover:bg-gradient-to-t dark:hover:from-[#24232C] dark:hover:to-[#100F18] hover:shadow-xl hover:shadow-purple-500/10 rounded-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
