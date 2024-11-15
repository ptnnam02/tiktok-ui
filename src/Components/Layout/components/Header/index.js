import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/Components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Search from '../Search';

import Menu from '~/Components/popper/Menu';
import { UploadIcon, UploadIconMess } from '~/Components/icons';
import Image from '~/Components/image';
const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'Language':
                //Handle change language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@kvy0011',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/Settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>

                <div>
                    <Search />
                </div>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy
                                delay={[0, 200]}
                                content="Tải lên"
                                placement="bottom"
                            >
                                <button className={cx('action-btn')}>
                                    <UploadIcon className={cx('action-icon')} />
                                    <span className={cx('action-upload')}>
                                        Tải lên
                                    </span>
                                </button>
                            </Tippy>
                            <Tippy
                                delay={[0, 200]}
                                content="Hộp thư"
                                placement="bottom"
                            >
                                <button className={cx('action-mess')}>
                                    <UploadIconMess />
                                    <sup className={cx('action-notice')}>
                                        19
                                    </sup>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onClick={handleMenuChange}
                    >
                        {currentUser ? (
                            <Image
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/9abc8dedb6fbacbf5041978aa3fc9077.jpeg?lk3s=30310797&nonce=804&refresh_token=e215703d9271582c3dc699c6dcb28c89&x-expires=1731549600&x-signature=49ImFM%2FDFr2RwyDzEnDkMxYZOTM%3D&shp=30310797&shcp=-"
                                className={cx('user-avatar')}
                                alt="Phạm Tuấn Nam"
                                fallBack="https://p9-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/9abc8dedb6fbacbf5041978aa3fc9077.jpeg?lk3s=30310797&nonce=14937&refresh_token=780247ced2cba4e85efc043866fa97e4&x-expires=1731654000&x-signature=DYC5aQBmcRxlMxAQbPpuru5bYFE%3D&shp=30310797&shcp=-"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
