import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { ColumnsType } from 'antd/es/table';
import {Space, Table, Layout, Col} from "antd";
import {Header, Footer, Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Row from "antd/es/descriptions/Row";
import {apiBaseUrl} from "./config";

function createDataColumns(filters) {
    return [
        {
            title: '周期',
            dataIndex: 'm_period',
            key: 'm_period',
            filters: filters['period'],
            filterSearch: true,
            onFilter: (value, record) => record['m_period'] === value,
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
            filters: filters['level'],
            filterSearch: true,
            onFilter: (value, record) => record['m_level'] === value,
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
            title: '对手',
            dataIndex: 'oppo_name_cn',
            key: 'oppo_name_cn',
            filters: filters['opponent'],
            filterSearch: true,
            onFilter: (value, record) => record['oppo_name_cn'] === value,
        },
        {
            title: '赛果',
            dataIndex: 'm_result',
            key: 'm_result',
            render: (data) => data ? '胜' : '负',
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
}

function newFilter(data, name) {
    let filter = new Set();
    for (let i of data) {
        filter.add(i[name]);
    }
    return Array.from(filter.values(), v => {
        return {
            text: v,
            value: v,
        }
    });
}

function req() {
    return fetch(`${apiBaseUrl}/show_all`).then(res => {
        return res.json()
    })
}

function App() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [dataColumns, setDataColumns] = useState(createDataColumns({}));
    useEffect(() => {
        if(!loading && !data){
            setLoading(true);
            req().then(
                (matchInfo) => {
                    setData(matchInfo);
                    setDataColumns(createDataColumns({
                        'period': newFilter(matchInfo, 'm_period'),
                        'level': newFilter(matchInfo, 'm_level'),
                        'opponent': newFilter(matchInfo, 'oppo_name_cn'),
                    }));
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
                <Sider collapsible={true}></Sider>
                <Content>
                    <div className="main-table">
                        <Table columns={dataColumns} dataSource={data} rowKey={'id'} />
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
