import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import {
    createBrowserRouter, Router,
    RouterProvider,
} from "react-router-dom"
import 'antd/dist/antd.css';
import { ColumnsType } from 'antd/es/table';
import {Space, Table, Layout, Col, Menu, DatePicker} from "antd";
import {Header, Footer, Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Row from "antd/es/descriptions/Row";
import {apiBaseUrl} from "./config";

const { RangePicker } = DatePicker;

const menuItems = [{
        label: '战绩查询',
        key: 'record',
    },
    {
        label: '数据统计',
        key: 'statistics'
    },
    {
        label: '意见反馈',
        key: 'comment'
    },
];

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
            title: '比赛属性',
            dataIndex: 'm_cate_',
            key: 'm_cate_',
            filters: filters['category'],
            filterSearch: true,
            onFilter: (value, record) => record['m_cate_'] === value,
        },
        {
            title: '搭档',
            dataIndex: 'partner',
            key: 'partner',
            filters: filters['partner'],
            filterSearch: true,
            onFilter: (value, record) => record['partner'] === value,
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
            title: '对手国籍',
            dataIndex: 'oppo_nation',
            key: 'oppo_nation',
            filters: filters['oppo_nation'],
            filterSearch: true,
            onFilter: (value, record) => record['oppo_nation'] === value,
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
    const [current, setCurrent] = useState('record');
    const [matchInfo_, setMatchInfo_] = useState();
    useEffect(() => {
        if(!loading && !data){
            setLoading(true);
            req().then(
                (matchInfo) => {
                    setData(matchInfo);
                    setMatchInfo_(matchInfo);
                    setDataColumns(createDataColumns({
                        'period': newFilter(matchInfo, 'm_period'),
                        'level': newFilter(matchInfo, 'm_level'),
                        'opponent': newFilter(matchInfo, 'oppo_name_cn'),
                        'category': newFilter(matchInfo, 'm_cate_'),
                        'oppo_nation': newFilter(matchInfo, 'oppo_nation'),
                        'partner': newFilter(matchInfo, 'partner'),
                    }));
                    setLoading(false);
                }
            );
        }
    });
    return (
        <Layout>
            <Header id="main-header">
                {/*<div>⭐️樊振东战绩查询系统⭐️</div>*/}
                <Menu theme={'dark'} selectedKeys={[current]} mode={"horizontal"} items={menuItems}/>
            </Header>
            <Layout>
                <Content>
                    <div className="main-table">
                        <p className="timepicker">
                            通过日期筛选：
                            <RangePicker onChange={event => {
                                if (event) {
                                    const start = event[0]['_d'];
                                    const end = event[1]['_d'];
                                    let newMatchInfo = [];
                                    for (let i of matchInfo_) {
                                        //console.log(i.m_date);
                                        //console.log(dateRange.s);
                                        if (i.m_date_timestamp != null && i.m_date_timestamp >= start.getTime()/1000 && i.m_date_timestamp <= end.getTime()/1000) {
                                            newMatchInfo.push(i);
                                        }
                                    }
                                    setData(newMatchInfo);
                                } else {
                                    setData(matchInfo_);
                                }
                            }}/>
                        </p>
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
