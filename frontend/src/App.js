import React from 'react';
import Login from './Login';
import Register from './Register';

const App = () => {
    return (
        <div>
            <h1>로그인 앱</h1>
            <Login />

            <h1>회원가입 페이지</h1>
            <Register />
        </div>
    );
};

export default App;
