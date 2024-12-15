import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


interface ToastNotificationProps {
  title: string;
  text: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
}

export const showToast = ({ title, text, type }: ToastNotificationProps) => {
  switch (type) {
    case 'success':
      toast.success(<div><strong>{title}</strong><br />{text}</div>);
      break;
    case 'error':
      toast.error(<div><strong>{title}</strong><br />{text}</div>);
      break;
    case 'warning':
      toast.warning(<div><strong>{title}</strong><br />{text}</div>);
      break;
    case 'info':
      toast.info(<div><strong>{title}</strong><br />{text}</div>);
      break;
    default:
      toast(<div><strong>{title}</strong><br />{text}</div>);
      break;
  }
};
