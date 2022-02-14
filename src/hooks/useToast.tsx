import { ToastType } from '@src/components/toast/ToastType';
import { toast } from 'react-toastify';
import { useRTL } from './useRTL';

export const useToast = () => {
  var [isRtl] = useRTL();

  const showToast = (message: string, type: ToastType) => {
    const position = isRtl ? 'top-right' : 'top-left';

    switch (type) {
      case ToastType.Default:
        toast(message, { position: position });
        break;
      case ToastType.Success:
        toast.success(message, { position: position });
        break;
      case ToastType.Warning:
        toast.warning(message, { position: position });
        break;
      case ToastType.Info:
        toast.info(message, { position: position });
        break;
      case ToastType.Error:
        toast.error(message, { position: position });
        break;
    }
  };

  const showError = (message: string) => showToast(message, ToastType.Error);
  const showSuccess = (message: string) => showToast(message, ToastType.Success);
  const showWarning = (message: string) => showToast(message, ToastType.Warning);
  const showInfo = (message: string) => showToast(message, ToastType.Info);
  const showDefault = (message: string) => showToast(message, ToastType.Default);

  return { showDefault, showToast, showSuccess, showWarning, showInfo, showError };
};
