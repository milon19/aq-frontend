import {ToastMessage} from "primereact/toast";

export interface ToastContextType {
  showToast: (options: ToastMessage | ToastMessage[]) => void;
}