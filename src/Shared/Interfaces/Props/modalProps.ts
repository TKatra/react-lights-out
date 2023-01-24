export interface ModalProps {
  title: string;
  show: boolean;
  closable: boolean;
  description?: string;
  children?: React.ReactNode;
  disablePrimaryBtn?: boolean;
  primaryBtnText?: string;
  disableSecondaryBtn?: boolean;
  secondaryBtnText?: string;
  closeBtnText?: string;

  onPrimaryBtnClick?: onPrimaryBtnClickFunc;
  onSecondaryBtnClick?: onSecondaryBtnClickFunc;
  onClose?: onCloseFunc;
}

interface onPrimaryBtnClickFunc {
  (...args: any[]): void
}

interface onSecondaryBtnClickFunc {
  (...args: any[]): void
}

interface onCloseFunc {
  (...args: any[]): void
}