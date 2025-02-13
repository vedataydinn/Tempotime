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
  timeSpeed: number;
  t: (key: string) => string;
}

export function ReminderDialog({ open, onClose, timeSpeed, t }: ReminderDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary">{t('title')}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p className="font-medium">{t('howExperiencing')}</p>
            <p>
              {timeSpeed < 1 
                ? t('speedStatus.slow')
                : timeSpeed > 1
                  ? t('speedStatus.fast')
                  : t('speedStatus.normal')}
            </p>
            <p className="italic">
              {t('feelTime')}
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={onClose}>{t('continue')}</Button>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}