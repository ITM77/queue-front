// import { useTranslation } from 'react-i18next';
import { notification } from 'antd'

const openNotification = (type, desc) => {
  // const { t } = useTranslation();
  if (type === 'success') {
    notification.success({
      message: '',
      description: desc || 'Success',
      placement: 'bottomRight',
    })
  } else {
    notification.error({
      message: '',
      description: desc || 'Error',
      placement: 'bottomRight',
    })
  }
}

export default openNotification
