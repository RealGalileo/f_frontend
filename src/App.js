import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { ColumnsType } from 'antd/es/table';
import {Space, Table, Layout, Col} from "antd";
import {Header, Footer, Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Row from "antd/es/descriptions/Row";

let datacloumns;
datacloumns = [
    {
        title: '周期',
        dataIndex: 'm_period',
        key: 'm_period',
    },
    {
        title: '比赛名称',
        dataIndex: 'm_name',
        key: 'm_name',
    },
    {
        title: '赛事级别',
        dataIndex: 'm_level',
        key: 'm_level',
    },
    {
        title: '比赛时间',
        dataIndex: 'm_date',
        key: 'm_date',
    },
    {
        title: '比赛场次',
        dataIndex: 'm_event',
        key: 'm_event',
    },
    {
        title: '赛果',
        dataIndex: 'm_result',
        key: 'm_result',
    },
    {
        title: '大比分',
        dataIndex: 'm_score_b',
        key: 'm_score_b',
    },
    {
        title: '小比分',
        dataIndex: 'm_score_s',
        key: 'm_score_s',
    },
];

function req() {
    return fetch('http://127.0.0.1:5000/show_all').then(res => {
        return res.json()
    })
}

function App() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(!loading && !data){
            setLoading(true);
            req().then(
                (matchInfo) => {
                    setData(matchInfo);
                    setLoading(false);
                }
            );
        }
    });
    return (
        <Layout>
            <Header id="main-header">
                <div className="logo" />
                <div>⭐️樊振东战绩查询系统⭐️</div>
            </Header>
            <Layout>
                <Sider></Sider>
                <Content>
                    <div className="main-table">
                        <Table columns={datacloumns} dataSource={data} />
                    </div>
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <Table columns={datacloumns} dataSource={data} />*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Content>
            </Layout>
            <Footer>foot</Footer>
        </Layout>
    );
}

export default App;
