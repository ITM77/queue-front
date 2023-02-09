import { Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import { isAuthAC } from './store/reducers/app';
import { getUserApi } from './http/user'

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
