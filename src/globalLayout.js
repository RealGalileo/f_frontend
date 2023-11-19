import GlobalMenu from "./globalMenu";
import Layout, {Header, Footer, Content} from "antd/es/layout/layout";

function GlobalLayout(prop) {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header id='main-header'>⭐ 樊振东职业生涯战绩查询系统 ⭐</Header>
            <GlobalMenu />
            <Layout>
                <Content>
                    {prop.children}
                </Content>
            </Layout>
            <Footer id='global-footer'>数据来源 weibo@樊振东球迷会-天际樊星 转载请注明出处</Footer>
        </Layout>
    )
}

export default GlobalLayout;