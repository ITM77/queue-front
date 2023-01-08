import { Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import { isAuthAC, userAC } from './store/reducers/appReducer';
// import { profileApi } from './http/profile';

function App() {
  const dispatch = useDispatch();
  const { isSpin } = useSelector(state => state.appReducer);
  const isAuth = useSelector(state => state.appReducer.isAuth);

  // const getProfileInfo = async () => {
  //   const data = await profileApi();
  //   dispatch(userAC(data.data));
  // };

  useEffect(() => {
    const token = localStorage.getItem('at');
    if (token) {
      const tokenData = jwtDecode(token);
      dispatch(userAC(tokenData));
      dispatch(isAuthAC(true));
      // getProfileInfo();
    }
  }, []);

  return (
    <Spin size='large' spinning={isSpin}>
      <div className='App'>{isAuth ? <Dashboard /> : <Auth />}</div>
    </Spin>
  );
}

export default App;
