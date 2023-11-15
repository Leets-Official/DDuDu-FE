import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyMenu = () => {

    const [isSubMenuVisible, setSubMenuVisible] = useState(false);
    const navigate = useNavigate();
    const showSubMenu = () => {
        setSubMenuVisible(!isSubMenuVisible);
    };

    const handleOutsideClick = (event) => {
        if (isSubMenuVisible && !event.target.closest('.MyMenu')) {
            setSubMenuVisible(false)
        }
    };
    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isSubMenuVisible]);

    const handleLogOut = () => {
        console.log("@@")
        localStorage.removeItem('name');
        navigate('/login');
    }

    return (
        <div className='MyMenu'>
            {isSubMenuVisible && (
                <>
                    <button>마이페이지</button>
                    <button onClick={handleLogOut}>로그아웃</button>
                </>
            )}
            <img onClick={showSubMenu} className='MenuImage' src={process.env.PUBLIC_URL + '/assets/icons8-메뉴-50.png'} />
        </div>
    );
};

export default MyMenu;