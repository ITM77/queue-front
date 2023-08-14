import React from 'react';
import { Layout, Dropdown, Menu, Avatar, theme } from 'antd';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { HomeOutlined, TeamOutlined, UserOutlined, UsergroupAddOutlined, TagsOutlined, AuditOutlined, ContactsOutlined, BankOutlined, StarOutlined, ContainerOutlined, FileProtectOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthAC } from '../../store/reducers/app';

import Test from './Test';
import MyClients from './MyClients';
import Cabinet from './Cabinet';
import AllUsers from './AllUsers';
import ServiceCenters from './ServiceCenters';
import Services from './Services';
import Clients from './Clients';
import Queue from './Queue';

import { logOutApi } from '../../http/auth';
import ServiceCategories from './ServiceCategories';

const { Header, Sider, Content } = Layout;

function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.app.user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const nav = [
    {
      key: '/',
      label: 'Главная',
      component: <Test />,
      icon: <HomeOutlined />,
    },
    {
      key: '/queue',
      label: 'Очередь',
      component: <Queue />,
      icon: <ContainerOutlined />,
    },
    {
      key: '/cabinet',
      label: 'Кабинет',
      component: <Cabinet />,
      icon: <AuditOutlined />,
    },
    {
      key: '/myClients',
      label: 'Мои клиенты',
      component: <MyClients />,
      icon: <ContactsOutlined />,
    },
    {
      key: '/services',
      label: 'Услуги',
      component: <Services />,
      icon: <StarOutlined />,
    },
    {
      key: '/categories',
      label: 'Категории',
      component: <ServiceCategories />,
      icon: <TagsOutlined />,
    },
    {
      key: '/users',
      label: 'Пользователи',
      component: <AllUsers />,
      icon: <TeamOutlined />,
    },
    {
      key: '/clients',
      label: 'Клиенты',
      component: <Clients />,
      icon: <UsergroupAddOutlined />,
    },
    {
      key: '/serviceCenters',
      label: 'Филиалы',
      component: <ServiceCenters />,
      icon: <BankOutlined />,
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          key: '4',
          danger: true,
          label: 'Выйти',
          onClick: () => {
            dispatch(logOutApi());
            localStorage.removeItem('at');
            dispatch(isAuthAC(false));
          },
        },
      ]}
    />
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={250} trigger={null} collapsible>
        <div className='logo py-4 text-center'>
          <h1 style={{ color: '#1677ff' }} className='text-3xl font-bold'>
            TezTar
          </h1>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['/main']}
          selectedKeys={[location.pathname]}
        >
          {nav.map(el => {
            if (!el?.component) {
              return (
                <Menu.SubMenu key={el.key} title={el.label} icon={el.icon}>
                  {el?.children.map(elCh => (
                    <Menu.Item key={`${el.key}${elCh.key}`}>
                      <NavLink to={`${el.key}${elCh.key}`}>
                        <span>{elCh.label}</span>
                      </NavLink>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            }
            return (
              <Menu.Item key={el.key}>
                <NavLink to={el.key}>
                  {el.icon}
                  <span>{el.label}</span>
                </NavLink>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: colorBgContainer }}>
          <div className='flex items-center justify-end'>
            <p className='mr-4'>Добро пожаловать {user.full_name} !</p>
            <Dropdown overlay={menu} trigger={['click']}>
              <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            margin: '16px',
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            {nav.map(rout =>
              rout?.component ? (
                <Route key={rout.key} path={`${rout.key}/*`} element={rout.component} />
              ) : (
                rout.children.map(roCh => (
                  <Route key={`${rout.key}${roCh.key}`} path={`${rout.key}${roCh.key}/*`} element={roCh.component} />
                ))
              )
            )}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
