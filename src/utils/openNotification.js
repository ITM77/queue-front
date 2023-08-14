import { notification } from 'antd'

const openNotification = (type, desc) => {
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
