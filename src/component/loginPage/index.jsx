import React, { useState } from "react"; import { Menu } from 'antd';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import './index.scss';
import SignUp from "./SignUp";
import Login from "./LogIn"

const LoginPage = ({ setCookieIsAuth }) => {

  const [current, setCurrent] = useState('login')

  const handleClick = (e) => {
    setCurrent(e.key)
  };

  return (
    <div className="LoginPageContainer">
      <div className="LoginPageNavMenu">
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="login" icon={<UserOutlined />}>
            Login
          </Menu.Item>
          <Menu.Item key="signup" icon={<UserAddOutlined />}>
            SignUp
          </Menu.Item>
        </Menu>
      </div>
      <div className="FormWrapper">
        {current === 'login'
          ? <Login setCookieIsAuth={setCookieIsAuth}/>
          : <SignUp setCookieIsAuth={setCookieIsAuth}/>
        }
      </div>
    </div>
  )
};

export default LoginPage