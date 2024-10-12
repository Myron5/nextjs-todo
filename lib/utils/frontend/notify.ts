import { toast } from "react-toastify";

const defaultSettings = Object.freeze({
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});

const notify = {
  success: (message: string) => {
    if (!toast.isActive(message)) {
      toast.success(message, { ...defaultSettings, toastId: message });
    }
  },

  warning: (message: string) => {
    if (!toast.isActive(message)) {
      toast.warning(message, { ...defaultSettings, toastId: message });
    }
  },

  error: (message: string) => {
    if (!toast.isActive(message)) {
      toast.error(message, { ...defaultSettings, toastId: message });
    }
  },
};

export default notify;
