import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(
    (
        {
            src,
            alt,
            className,
            fallBack: customFallBack = images.noImage,
            ...props
        },
        ref,
    ) => {
        const [fallBack, setFallBack] = useState('');

        const HandleError = () => {
            setFallBack(customFallBack);
        };
        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallBack || src}
                alt={alt}
                {...props}
                onError={HandleError}
            />
        );
    },
);

export default Image;
