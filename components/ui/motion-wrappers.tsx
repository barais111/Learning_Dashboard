"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

// Stagger container
export const bentoContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Individual tile — fade up
export const bentoItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

// Hover state for cards
export const cardHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.015,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

interface BentoContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function BentoContainer({ children, className, ...props }: BentoContainerProps) {
  return (
    <motion.div
      variants={bentoContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface BentoItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function BentoItem({ children, className, ...props }: BentoItemProps) {
  return (
    <motion.div
      variants={bentoItemVariants}
      whileHover={cardHoverVariants.hover}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
