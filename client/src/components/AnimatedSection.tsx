import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  initialVisible?: boolean;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  initialVisible = false
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "150px 0px 0px 0px" });

  if (initialVisible) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease-out ${delay}s, transform 0.4s ease-out ${delay}s`,
        willChange: isInView ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
