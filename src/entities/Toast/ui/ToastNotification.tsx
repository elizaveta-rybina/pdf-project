import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastNotificationProps {
  title: string;
  text: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  options?: object;
}

const isValidType = (type: string): type is ToastNotificationProps['type'] => {
  return ['success', 'error', 'warning', 'info', 'default'].includes(type);
};

export const showToast = ({ title, text, type, options = {} }: ToastNotificationProps) => {
  const content = (
    <div>
      <strong>{title}</strong>
      <br />
      {text}
    </div>
  );

  if (!isValidType(type)) {
    console.warn(`Invalid toast type: "${type}". Falling back to "default".`);
    type = 'default';
  }

  const toastOptions = {
    success: () => toast.success(content, options),
    error: () => toast.error(content, options),
    warning: () => toast.warning(content, options),
    info: () => toast.info(content, options),
    default: () => toast(content, options),
  };

  toastOptions[type]();
};
