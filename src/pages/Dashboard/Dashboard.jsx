import React, { useState } from 'react';
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileProtectOutlined
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import styled from 'styled-components';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAuthAC } from '../../store/reducers/appReducer';
import Lisense from './Lisense'

const { Header, Sider, Content, Footer } = Layout;
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

  > section {
    min-height: 100vh;

    > section {
      > header {
        margin: 0 16px;
        padding: 0 24px !important;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        background: #fff !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      > main {
        margin: 24px 16px 0;
        border-radius: 20px;
        padding: 24px;
        min-height: 280px;
        background: #fff !important;
      }

      > footer {
        text-align: center;
      }
    }

    > aside {
      background: #fff !important;
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
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [nav] = useState([
    {
      key: '/main',
      icon: <HomeOutlined />,
      label: 'Главная',
      component: <p>Main</p>,
    },
    {
      key: '/licence',
      icon:  <FileProtectOutlined />,
      label: 'Лицензии',
      children: [
        {
          key: '/all',
          label: 'Все',
          component: <Lisense/>
        }
      ]
    },
  ]);

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: 'Olim',
        },
        {
          key: '4',
          danger: true,
          label: 'Выйти',
          onClick: () => {
            dispatch(isAuthAC(false));
          },
        },
      ]}
    />
  );

  return (
    <DashboardStyled>
      <Layout>
        <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
          <div className='logo'>
            <h1 style={{color: '#49bff4'}} className={collapsed ? 'text-xl font-bold' : 'text-3xl font-bold'}>CRM</h1>
          </div>
          <Menu mode='inline' defaultSelectedKeys={['/main']} selectedKeys={[location.pathname]}>
            {nav.map(el => {
              if (!el?.component) {
                return (
                  <Menu.SubMenu key={el.key} title={el.label} icon={el.icon}>
                    {el.children.map(elCh => (
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
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}

            <Dropdown overlay={menu} trigger={['click']}>
              <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
            </Dropdown>
          </Header>
          <Content>
            <Routes>
              {nav.map(rout =>
                rout?.component ? (
                  <Route key={rout.key} path={rout.key} element={rout.component} />
                ) : (
                  rout.children.map(roCh => (
                    <Route key={`${rout.key}${roCh.key}`} path={`${rout.key}${roCh.key}`} element={roCh.component} />
                  ))
                )
              )}
              <Route path='*' element={<Navigate to='/main' replace />} />
            </Routes>
          </Content>
          <Footer>Created on 2023</Footer>
        </Layout>
      </Layout>
    </DashboardStyled>
  );
}

export default Dashboard;
