import { toast } from "sonner";

const Toast = {
  success: (message, options = {}) => toast.success(message, options),
  error: (message, options = {}) => toast.error(message, options),
  info: (message, options = {}) => toast(message, options),
  custom: (message, options = {}) => toast(message, options),
};

export default Toast;