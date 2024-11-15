import { useEffect, useState, useRef } from 'react';

import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import HeadlessTippy from '@tippyjs/react/headless';
import AcountItem from '~/Components/AcountItem';
import { Wrapper as PopperWrapper } from '~/Components/popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setsearchResult] = useState([]);
    const [showResult, setshowresult] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!searchValue.trim()) {
            setsearchResult([]);
            return;
        }

        setLoading(true);

        fetch(
            `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
                searchValue,
            )}&type=less`,
        )
            .then((res) => res.json())
            .then((res) => {
                setsearchResult(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setshowresult(false);
    };

    const inputRef = useRef();

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Acounts</h4>
                        {searchResult.map((result) => (
                            <AcountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm kiếm..."
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setshowresult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && (
                    <FontAwesomeIcon
                        className={cx('loading')}
                        icon={faSpinner}
                    />
                )}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
