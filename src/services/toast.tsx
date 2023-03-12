import {ShowToastType} from "../types/services";
import {toast} from "react-toastify";

export const showToast = (type: ShowToastType["type"], message: ShowToastType["message"]) => {
  switch (type){
    case "success":
      toast.success(message);
      return
    case "error":
      toast.error(message);
      return;
    case "info":
      toast.info(message);
      return;
    case "warning":
      toast.warning(message);
      return;
    default:
      toast(message)
  }
}