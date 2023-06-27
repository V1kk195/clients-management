import cx from 'classnames';
import React from 'react';

type Props = {
    caption: string;
    classname?: string;
    onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ caption, classname, onClick, ...props }: Props) => {
    return (
        <button
            type="button"
            className={cx('btn btn-primary', classname)}
            onClick={onClick}
            {...props}
        >
            {caption}
        </button>
    );
};
