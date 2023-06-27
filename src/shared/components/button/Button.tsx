import cx from 'classnames';
import React, { ReactComponentElement } from 'react';

type Props = {
    caption?: string;
    classname?: string;
    onClick?: () => void;
    icon?: ReactComponentElement<any>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
    caption = '',
    classname,
    onClick,
    icon,
    ...props
}: Props) => {
    return (
        <button
            type="button"
            className={cx('btn btn-primary', classname)}
            onClick={onClick}
            {...props}
        >
            <>
                {icon ? icon : ''}
                {caption}
            </>
        </button>
    );
};
