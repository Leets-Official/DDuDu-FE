import React, { useState } from 'react';

const MyMenu = () => {

    const [isSubMenuVisible, setSubMenuVisible] = useState(false);

    const showSubMenu = () => {
        setSubMenuVisible(!isSubMenuVisible);
    };
    return (
        <div onClick={showSubMenu} className='MyMenu'>
            <img src={process.env.PUBLIC_URL + '/assets/icons8-메뉴-50.png'} />
            {isSubMenuVisible && (
                <div>
                    <button>마이페이지</button>
                    <button>로그아웃</button>
                </div>
            )}
        </div>
    );
};

export default MyMenu;