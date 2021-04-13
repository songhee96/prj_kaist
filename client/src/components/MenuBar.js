import React from "react";
import { NavLink } from "react-router-dom";
import { Layout } from "antd";
import Clock from "react-live-clock";
import logo from ".././style/images/kaist_logo.png";

const { Header } = Layout;

export default class MenuBar extends React.Component {
  render() {
    return (
      <>
        <Header className="MenuBar_wrap">
          <div className="header">
            <div className="kaist_logo_wrap">
              <NavLink exact to="/">
                <div className="logi_wraps">
                  <img className="kaist_logo" src={logo} alt="KAIST_LOGO" />
                  <span className="header_txt">HCA200bps 관리시스템</span>
                </div>
              </NavLink>
            </div>

            <div className="nav_wrap">
              <ul className="nav">
                <NavLink exact to="/">
                  <li>메인화면</li>
                </NavLink>
                <NavLink exact to="/MM01">
                  <li>이벤트</li>
                </NavLink>
                <NavLink exact to="/MM02">
                  <li>트래픽</li>
                </NavLink>
              </ul>
            </div>

            <div className="nav_right">
              <Clock format={"YYYY년 MM월 DD일 HH:mm:ss"} ticking={true} />
            </div>
          </div>
        </Header>
      </>
    );
  }
}
