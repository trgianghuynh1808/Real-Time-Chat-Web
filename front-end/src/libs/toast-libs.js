import { toast } from "react-toastify";

const DEFAULT_CONFIG = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showErrorToast = (message) => {
  return toast.error(message, DEFAULT_CONFIG);
};

export const showSuccessToast = (message) => {
  return toast.success(message, DEFAULT_CONFIG);
};

export const showInfoToast = (message) => {
  return toast.info(message, DEFAULT_CONFIG);
};
