import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', { userId, password });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error details:', error); // 에러 로그 출력
            if (error.response) {
                setMessage(error.response.data.message);
            } else if (error.request) {
                setMessage('서버에 연결할 수 없습니다.');
            } else {
                setMessage('오류가 발생했습니다: ' + error.message);
            }
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="사용자 ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">로그인</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
