"use client";

import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

type LucideIconComponent = React.ComponentType<LucideProps>;

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // Convert snake_case or kebab-case to PascalCase
  const pascalName = name
    .split(/[-_]/)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join("");

  const IconComponent = (Icons as unknown as Record<string, LucideIconComponent>)[
    pascalName
  ];

  if (!IconComponent) {
    // Fallback to BookOpen if icon not found
    return <Icons.BookOpen {...props} />;
  }

  return <IconComponent {...props} />;
}
