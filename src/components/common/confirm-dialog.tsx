import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ConfirmDialogProps {
  open: boolean;
  isLoading?: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: (reason?: string) => void;
  confirmText?: string;
  cancelText?: string;
  reasonRequired?: boolean;
  reasonLabel?: string;
}

export function ConfirmDialog({
  open,
  isLoading = false,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  reasonRequired = false,
  reasonLabel = "Lý do",
}: ConfirmDialogProps) {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {reasonRequired && (
          <div className="grid gap-2 py-2">
            <Label htmlFor="confirm-reason">{reasonLabel}</Label>
            <Textarea
              id="confirm-reason"
              placeholder={`Nhập ${reasonLabel.toLowerCase()}`}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
              className="min-h-[80px]"
              required={reasonRequired}
            />
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            isLoading={isLoading}
            disabled={isLoading || (reasonRequired && !reason)}
            onClick={() => onConfirm(reason)}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
