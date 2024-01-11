import React from "react";
import "./BtnBlur.scss";
import { cn } from "../../../config/utils";
const BtnBlur = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("button", className)}> {children}</div>;
};

export default BtnBlur;
