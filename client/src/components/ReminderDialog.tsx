import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ReminderDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ReminderDialog({ open, onClose }: ReminderDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Time Check</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>How are you feeling about time right now?</p>
            <p>Take a moment to notice how time is passing.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={onClose}>Continue</Button>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
