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
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white/10 px-4 pb-3 dark:bg-black/10 md:flex",
        className,
        "border border-gray-200/30 backdrop-blur-sm dark:border-gray-800/30 cursor-none"
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
        className="relative flex aspect-square items-center justify-center rounded-full bg-white/20 text-black shadow-lg backdrop-blur-md dark:bg-black/20 dark:text-white cursor-none"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-white/80 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
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
          <motion.div layoutId="nav" className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2 ">
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: index * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - index) * 0.05 }}
                className="bg-black rounded-full"
              >
                <button
                  onClick={() => {
                    const target = document.querySelector(item.to);
                    target?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-black shadow-md backdrop-blur-md dark:bg-black/20 dark:text-white cursor-none"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-black shadow-md backdrop-blur-md dark:bg-black/20 dark:text-white cursor-none"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
};
