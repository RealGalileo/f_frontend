import {Header} from "antd/es/layout/layout";
import {useEffect, useState} from "react";
import {Menu} from "antd";
import {useNavigate, useLocation} from "react-router-dom";

const menuItems = [{
    label: '战绩查询',
    key: 'records',
    },
    {
        label: '数据统计',
        key: 'statistics'
    },
    {
        label: '意见反馈',
        key: 'suggestions'
    },
];

function GlobalMenu() {
    const [current, setCurrent] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        let currentPath = location.pathname.substr(1);
        console.log(currentPath);
        if (currentPath) {
            setCurrent(currentPath);
        } else {
            setCurrent('records');
        }
    });
    return <Menu selectedKeys={[current]} mode={"horizontal"} items={menuItems} onClick={item => {
        setCurrent(item.key);
        if (item.key === 'records') {
            navigate('/')
        }
        else {
            console.log(item.key);
            navigate('/' + item.key);
        }
    }
    }/>;

}

export default GlobalMenu;
