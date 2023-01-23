export interface ModalProps {
  title: string;
  show: boolean;
  closable: boolean;
  description?: string;
  disableConfirmBtn?: boolean;
  confirmBtnText?: string;
  closeBtnText?: string;
  children?: React.ReactNode;

  onConfirm?: onConfirmFunc;
  onClose?: onCloseFunc;
}

interface onConfirmFunc {
  (...args: any[]): void
}

interface onCloseFunc {
  (...args: any[]): void
}