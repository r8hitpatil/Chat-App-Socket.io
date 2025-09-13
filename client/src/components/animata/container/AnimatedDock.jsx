import { cn } from "@/lib/utils"; // Import utility for conditional class names
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { Menu, X } from "lucide-react";

// Main AnimatedDock component that renders both LargeDock and SmallDock
export default function AnimatedDock({ items, largeClassName, smallClassName }) {
  return (
    <>
      {/* Render LargeDock for larger screens */}
      <LargeDock items={items} className={largeClassName} />
      {/* Render SmallDock for smaller screens */}
      <SmallDock items={items} className={smallClassName} />
    </>
  );
}

// Component for the large dock, visible on larger screens
const LargeDock = ({ items, className }) => {
  const mouseXPosition = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseXPosition.set(e.pageX)}
      onMouseLeave={() => mouseXPosition.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-center gap-4 rounded-2xl bg-white/10 px-4 py-3 dark:bg-black/10 md:flex",
        className,
        "border border-gray-200/30 backdrop-blur-sm dark:border-gray-800/30 shadow-lg"
      )}
    >
      {items.map((item) => (
        <DockIcon mouseX={mouseXPosition} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

// Component for individual icons in the dock
function DockIcon({ mouseX, title, icon, to }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    if (to?.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(to);
      target?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distanceFromMouse, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distanceFromMouse, [-150, 0, 150], [40, 80, 40]);

  const iconWidthTransform = useTransform(distanceFromMouse, [-150, 0, 150], [20, 40, 20]);
  const iconHeightTransform = useTransform(distanceFromMouse, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const iconWidth = useSpring(iconWidthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const iconHeight = useSpring(iconHeightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className="relative flex aspect-square items-center justify-center rounded-full bg-white/20 text-black shadow-lg backdrop-blur-md dark:bg-black/20 dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-colors duration-200 cursor-pointer"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-10 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200/50 bg-black/80 backdrop-blur-lg px-3 py-1.5 text-sm text-white shadow-xl dark:border-neutral-700 dark:bg-black/90"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: iconWidth, height: iconHeight }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Component for the small dock, visible on smaller screens
const SmallDock = ({ items, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            layoutId="nav" 
            className="absolute inset-x-0 bottom-full mb-4 flex flex-col gap-3 items-center"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                  transition: { delay: index * 0.05 },
                }}
                transition={{ 
                  delay: (items.length - 1 - index) * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="relative"
              >
                <button
                  onClick={() => {
                    const target = document.querySelector(item.to);
                    target?.scrollIntoView({ behavior: "smooth" });
                    setIsOpen(false); // Close dock after navigation
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black/80 backdrop-blur-lg text-white shadow-xl border border-white/20 hover:scale-110 transition-transform duration-200"
                >
                  <div className="h-5 w-5">{item.icon}</div>
                </button>
                {/* Title tooltip */}
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-lg text-white text-xs px-2 py-1 rounded-md whitespace-nowrap border border-white/20">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black/80 backdrop-blur-lg text-white shadow-xl border border-white/20 hover:scale-110 transition-all duration-200"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.div>
      </button>
    </div>
  );
};
