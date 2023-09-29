import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import './main-page.css';
import { iconsList } from "../const";
import TableServerPc from "../components/table-server-pc/table-server-pc";
import { useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const items = iconsList.map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon.icon),
    label: `${icon.label}`,
    children: icon.subItems.map((value, j) => {
      const subKey = index * icon.subItems.length + j + 1;
      return {
        key: subKey,
        label: value
      }
    })
  }
})

function MainPage() {
  const location = useLocation();
  const searchValue = new URLSearchParams(location.search).get('search_val');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider width={250} theme="light" style={{height: '100%'}}>
        <div className='demo-logo' />
        <Menu mode='inline' items={items} defaultSelectedKeys={['1']} />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: colorBgContainer }} />
        <Layout style={{ padding: '0 20px 20px', backgroundColor: colorBgContainer }}>
          <Breadcrumb style={{ margin: '5px 0' }}>
            <Breadcrumb.Item>CMDB</Breadcrumb.Item>
            <Breadcrumb.Item>Серверы и ПК</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            <h1>Серверы и ПК</h1>
            <TableServerPc searchValue={searchValue} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainPage;
