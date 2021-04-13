import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Clock from "react-live-clock";
import logo from ".././style/images/kaist_logo.png"

const { Header } = Layout;

export default class MenuBar extends React.Component {
  state = { current: "1" };

  render() {
    const { current } = this.state;

    return (
      <>
        <Header className="MenuBar_wrap">
          <div className="header">
            <div className="kaist_logo_wrap">
              <img
                className="kaist_logo"
                src={logo}
                alt="KAIST_LOGO"
              />
            </div>

            <p className="header_txt">HCA200bps 관리시스템</p>

            <div className="nav_wrap">
              <Menu
                selectedKeys={[current]}
                mode="horizontal"
                className="nav"
                onClick={this._menuClickHandler}
              >
                <Menu.Item key="1">
                  <Link to="/">메인화면</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/MM01">이벤트</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="MM02">트래픽</Link>
                </Menu.Item>
                
              </Menu>
            </div>

            <div className="nav_right">
              <Clock format={"YYYY년 MM월 DD일 HH:mm:ss"} ticking={true} />
            </div>
          </div>
        </Header>
      </>
    );
  }

  _menuClickHandler = (event) => {
    console.log("Click", event.key);

    this.setState({
      current: event.key,
    });
  };
}
