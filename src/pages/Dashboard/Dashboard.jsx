import React  from 'react';
import { useTranslation } from 'react-i18next';
import {
  UserOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';

import { Layout, Dropdown, Menu, Avatar } from 'antd';
import styled from 'styled-components';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthAC } from '../../store/reducers/appReducer';

import Registration from './Registration/Registration'
import Claims from './Claims/Claims'
import Rejected from './Claims/Rejected'
import ClaimTypes from './ClaimTypes/ClaimTypes';
import DocumentTypes from './DocumentTypes/DocumentTypes';
import Main from './License/Main';

const { Header, Sider, Content } = Layout;
const DashboardStyled = styled.div`
  .trigger {
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #e53540 !important;
  }
  .ant-menu-item, .ant-menu-submenu span, i {
    color: #fff !important;
  }
  .ant-menu-item, .ant-menu-submenu {
    border-radius: 0;
  }

  > section {
    min-height: 100vh;

    > section {
      > header {
        padding: 0 24px !important;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        background: #fff !important;
        display: flex;
        align-items: center;
        justify-content: end;
      }

      > main {
        margin: 16px;
        border-radius: 4px;
        padding: 24px;
        min-height: 280px;
        background: #fff !important;
      }
    }

    > aside {
      background: #001529 !important;
      width: 300px;

      > div {
        > div {
          margin: 20px 20px 30px 20px;

          > img {
            max-width: 170px;
            width: 100%;
          }
        }
      }
    }
  }
`;

function Dashboard() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.appReducer.user);

  const nav = [
    {
      key: '/documentTypes',
      label: t('documentTypes'),
      component: <DocumentTypes/>,
      icon:  <FileProtectOutlined />,
    },
    {
      key: '/claimTypes',
      label: t('claimTypes'),
      component: <ClaimTypes/>,
      icon:  <FileProtectOutlined />,
    },
    {
      key: '/registration',
      label: t('createUser'),
      component: <Registration/>,
      icon:  <FileProtectOutlined />,
    },
    {
      key: '/claims',
      icon:  <FileProtectOutlined />,
      label: t('claims'),
      children: [
        {
          key: '/current',
          label: t('current'),
          component: <Claims/>
        },
        {
          key: '/rejected',
          label: t('rejected'),
          component: <Rejected/>
        },
      ]
    },
    {
      key: '/license',
      label: t('license'),
      component: <Main/>,
      icon:  <FileProtectOutlined />,
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          key: '4',
          danger: true,
          label: t('exit'),
          onClick: () => {
            localStorage.removeItem('at');
            localStorage.removeItem('rt');
            dispatch(isAuthAC(false));
          },
        },
        {
          key: '5',
          danger: false,
          label: t('language'),
          onClick: () => {
            i18n.changeLanguage(i18n.language === 'ru' ? 'tj' : 'ru')
          },
        },
      ]}
    />
  );

  return (
    <DashboardStyled>
      <Layout>
        <Sider width={250} trigger={null} collapsible>
          <div className='logo'>
            <h1 style={{color: '#49bff4'}} className='text-3xl font-bold'>CRM</h1>
          </div>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['/main']} selectedKeys={[location.pathname]}>
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
          <Header>
            <div className='flex items-center'>
              <p className='mr-4'>{t('Welcome')} {user.firstName} {user.lastName} !</p>
              <Dropdown overlay={menu} trigger={['click']}>
                <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
              </Dropdown>
            </div>
          </Header>
          <Content>
            <Routes>
              {nav.map(rout =>
                rout?.component ? (
                  <Route key={rout.key} path={`${ rout.key }/*`} element={rout.component} />
                ) : (
                  rout.children.map(roCh => (
                    <Route key={`${rout.key}${roCh.key}`} path={`${rout.key}${roCh.key}/*`} element={roCh.component} />
                  ))
                )
              )}
              <Route path='*' element={<Navigate to='/claims/current' replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </DashboardStyled>
  );
}

export default Dashboard;
