import { cn } from "@/lib/utils";
import React from "react";

const HeaderText = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm md:text-base text-muted-foreground mx-auto">
        {description}
      </p>
    </div>
  );
};

export default HeaderText;
