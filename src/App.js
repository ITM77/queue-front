import { useEffect } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import { getUserApi } from './http/user';
import { isAuthAC } from './store/reducers/app';

function App() {
  const dispatch = useDispatch();
  const isSpin  = useSelector(state => state.app.isSpin);
  const isAuth = useSelector(state => state.app.isAuth);

  useEffect(() => {
    const token = localStorage.getItem('at');
    if (token) {
      dispatch(getUserApi())
      dispatch(isAuthAC(true));
    }
  }, []);

  return (
    <Spin size='large' spinning={isSpin}>
      <div className='App'>{isAuth ? <Dashboard /> : <Auth />}</div>
    </Spin>
  );
}

export default App;
