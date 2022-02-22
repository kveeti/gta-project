import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";

export const Chevron = ({ open }) => {
  return open ? (
    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }}>
      <ChevronRightIcon style={{ transform: "scale(1.2)" }} />
    </motion.div>
  ) : (
    <motion.div initial={{ rotate: 90 }} animate={{ rotate: 0 }}>
      <ChevronRightIcon style={{ transform: "scale(1.2)" }} />
    </motion.div>
  );
};
