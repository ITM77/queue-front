import { notification } from 'antd'

const openNotification = (type, desc) => {
  if (type === 'success') {
    notification.success({
      message: 'Успешно',
      description: desc || 'Выполненно успешно!',
      placement: 'bottomRight',
    })
  } else {
    notification.error({
      message: 'Ошибка',
      description: desc || 'Что-то пошло не так!',
      placement: 'bottomRight',
    })
  }
}

export default openNotification
