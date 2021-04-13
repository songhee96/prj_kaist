import React from "react";
import { Route } from "react-router-dom";
import { MM00, MM01, MM02, MM02Chart } from "../screen";
import MenuBar from "./MenuBar";
import { Layout } from "antd";

const { Content } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <div>
            <MenuBar />
          </div>

          <Content style={{ width: "100%" }}>
            <Route exact path="/" component={MM00} />
            <Route exact path="/MM01" component={MM01} />
            <Route exact path="/MM02" component={MM02} />
            <Route exact path="/MM02Chart" component={MM02Chart} />
          </Content>
        </Layout>
      </>
    );
  }
}
