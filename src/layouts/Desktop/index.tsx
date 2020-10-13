import React, { PropsWithChildren, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Switch, Route, Redirect } from "react-router-dom";
import actions from "@/store/actions/desktop";
import { DesktopState } from "@/store/reducers/desktop";
import { CombinedState } from "@/store/reducers";
import { AxiosError } from "axios";

import { Layout } from "antd";
import "./index.less";

import SectionHeader from "./components/SectionHeader";
import SectionSider from "./components/SectionSider";
import routes from "@/routes";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface Params {}
type Props = PropsWithChildren<
  RouteComponentProps<Params> & StateProps & CombinedState & DispatchProps
>;

const { Sider, Header, Content } = Layout;

function Desktop(props: Props) {
  // 页面加载后，直接判断是否登录过
  useEffect(() => {
    // props.validate().catch((error: AxiosError) => {
    //   console.error(error.message)
    // })
  }, [])
  
  return (
    <>
      <Layout className="desktop-layout">
        <Sider
          className="desktop-layout-sider"
          width="240"
          collapsible
        >
          <SectionSider
            menus={props.menus}
            history={props.history}
            getMenus={props.getMenus}
          ></SectionSider>
        </Sider>
        <Layout>
          <Header className="desktop-layout-header">
            <SectionHeader
              products={props.products}
              getProducts={props.getProducts}
            ></SectionHeader>
          </Header>
          <Content className="desktop-layout-content">
            <Switch>
              {routes.map((item) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    exact={item.exact}
                    render={(props) => <item.component {...props} />}
                  ></Route>
                );
              })}
              <Redirect to="/404" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
let mapStateToProps = (state: CombinedState): DesktopState => state.desktop;

export default connect(mapStateToProps, actions)(Desktop);