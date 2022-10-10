import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

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
                    console.log(matchInfo);
                    setData(matchInfo);
                    setLoading(false);
                }
            );
        }
    });
    const row = [];
    if(data){
        for (const d of data) {
            row.push(
                <tr key={d.id.toString()}>

                    {/*m_period, m_name, m_level, m_date_s, m_date_e, m_event, m_rank, m_cate, m_date, m_progress, oppo_nation, oppo_name_en, oppo_name_cn, oppo_name_cn_f, m_result, m_score_b, m_score_s*/}

                    <td key="m_period">{d.m_period}</td>
                    <td key="m_name">{d.m_name}</td>
                    <td key="m_level">{d.m_level}</td>
                    <td key="m_date">{d.m_date}</td>
                    <td key="m_event">{d.m_event}</td>
                    <td key="m_result">{d.m_result ? '胜' : '负'}</td>
                    <td key="m_score_b">{d.m_score_b}</td>
                    <td key="m_score_s">{d.m_score_s}</td>
                </tr>
            );
        }
    }

    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th key="m_period">周期</th>
                        <th key="m_name">比赛名称</th>
                        <th key="m_level">赛事级别</th>
                        <th key="m_date">比赛时间</th>
                        <th key="m_event">比赛场次</th>
                        <th key="m_result">赛果</th>
                        <th key="m_score_b">大比分</th>
                        <th key="m_score_s">小比分</th>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </table>
        </div>
    );
}

export default App;
