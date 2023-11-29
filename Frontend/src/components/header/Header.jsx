import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Search from '../search/Search';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const onLogoContainerClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const onSignUpClick = useCallback(() => {
        navigate("/register");
    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage hoặc Context/Redux khi trang được tải
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true); // Đã đăng nhập thành công
        } else {
          // Chưa có người dùng nào đăng nhập, hiển thị các nút đăng ký và đăng nhập
          setIsLoggedIn(false);
        }
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
        setUser(null); // Xóa thông tin người dùng khỏi state
        setIsLoggedIn(false); // Đánh dấu là đã logout
        navigate("/"); // Chuyển hướng về trang đăng nhập sau khi logout
    };
    
    return (
        <div className="header">
            <div className="header-item" />
            <div className="logo" onClick={onLogoContainerClick}>
                <div className="kidtube1">
                    Kidtube
                </div>
                <img className="group-icon" alt="" src="/group-2441.svg" />
            </div>
            < Search />
            {isLoggedIn ? (
                <>
                    <div className="user-info">{user.username}</div>
                    <button className="logout" onClick={handleLogout}>
                        <div className="button1">Logout</div>
                    </button>
                </>
            ) : (
                <>
                    <button className="sign-up" onClick={onSignUpClick}>
                        <div className="button1">Sign up</div>
                    </button>
                    <button className="login" onClick={onLoginClick}>
                        <div className="buttonlogin">Sign in</div>
                    </button>
                </>
            )}
        </div>
    )
}

export default Header