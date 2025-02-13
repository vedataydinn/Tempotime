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
}

export function ReminderDialog({ open, onClose, timeSpeed }: ReminderDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary">Zaman Kontrolü</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p className="font-medium">Şu an zamanı nasıl deneyimliyorsunuz?</p>
            <p>
              {timeSpeed < 1 
                ? "Zaman yavaşlatıldı, her an daha uzun sürebilir."
                : timeSpeed > 1
                  ? "Zaman hızlandırıldı, anlar daha hızlı geçebilir."
                  : "Zaman normal hızında akıyor."}
            </p>
            <p className="italic">
              Bir an durun ve zamanın nasıl aktığını hissedin...
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={onClose}>Devam Et</Button>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}