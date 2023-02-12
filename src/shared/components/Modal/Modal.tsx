import { Dialog, DialogContent, DialogTitle } from '@mui/material';

export interface ModalProps {
  title?: string;
  style?: React.CSSProperties;
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({
  onClose,
  open,
  title = undefined,
  children,
  style,
}: ModalProps) {
  return (
    <Dialog onClose={() => onClose()} open={open} PaperProps={{ style }}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default Modal;
