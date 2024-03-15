import GlobalMenu from "./globalMenu";
import Layout, {Header, Footer, Content} from "antd/es/layout/layout";
import cover from "./cover.JPG";
import "./globalLayout.css";
import {useRef, useState} from "react";

function GlobalLayout(prop) {
    const globalLayoutElement = useRef(null);
    const [imgHeight, setImgHeight] = useState(-1);
    const [titleOpacity, setTitleOpacity] = useState(0);
    const minHeight = 128;
    return (
        <div ref={globalLayoutElement} className={"global-layout"} onScroll={(e)=>{
            let screenHeight = globalLayoutElement.current.clientHeight;
            let height = screenHeight - globalLayoutElement.current.scrollTop;
            setImgHeight(Math.max(height, minHeight));
            setTitleOpacity((screenHeight - height) / (screenHeight - minHeight));
            console.log(globalLayoutElement.current.scrollTop);
        }}>
            <div className={"cover-container"} style={{height: imgHeight < 0 ? "100vh" : imgHeight}}>
                <img src={cover} style={{ width: "100vw", height: imgHeight < 0 ? "100vh" : imgHeight, objectFit: "cover"}}/>
                <p id={"cover-title"} style={{opacity: titleOpacity}}>樊振东职业生涯战绩查询系统</p>
            </div>
            <Layout style={{ minHeight: "100vh", position: "absolute", top: 0, background: "transparent"}}>
                {/*<Header id='main-header'>⭐ 樊振东职业生涯战绩查询系统 ⭐</Header>*/}
                <div style={{height: "100vh"}}/>
                <div style={{position: "sticky", top: minHeight + "px", zIndex: 10}}>
                    <GlobalMenu />
                </div>
                <Layout style={{width: "100vw", overflowX: "auto"}} id={"global-layout-content-container"}>
                    <Content>
                        {prop.children}
                    </Content>
                </Layout>
                <Footer id='global-footer'>数据来源 weibo@樊振东球迷会-天际樊星 转载请注明出处</Footer>
            </Layout>
        </div>
    )
}

export default GlobalLayout;