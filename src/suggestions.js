import TextArea from "antd/es/input/TextArea";
import GlobalLayout from "./globalLayout";
import './App.css'
import {Button} from "antd";
import {useState} from "react";
import axios from "axios";
import {apiBaseUrl} from "./config";

function Suggestions() {
    const [suggestion, setSuggestion] = useState('');
    function handleInput(e) {
        setSuggestion(e.currentTarget.value);
    }
    function handleClick() {
        if (suggestion) {
            axios.post(apiBaseUrl + '/handle_suggestion', {
                content: suggestion,
            }).then(response=>{
                if(response.status === 200) {
                    alert('发送成功！\n感谢您的意见与建议⭐');
                    setSuggestion('');
                }
                console.log(response.status);
            });
        } else {
            alert('请不要发送空白内容🤧');
        }
    }
    return(
        <GlobalLayout>
            <div className='input'>
                <p className='input-comment'>在此输入建议：</p>
                <TextArea allowClear={true} autoSize={{minRows: 8, maxRows: 24}} value={suggestion} onChange={handleInput}/>
                <Button className='align-left' type="primary" onClick={handleClick}>提交</Button>
            </div>
        </GlobalLayout>
    )
}

export default Suggestions;