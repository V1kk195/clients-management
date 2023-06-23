import cx from 'classnames';

type Props = {
    caption: string;
    classname?: string;
    onClick?: () => void;
};

export const Button = ({ caption, classname, onClick }: Props) => {
    return (
        <button
            type="button"
            className={cx('btn btn-primary', classname)}
            onClick={onClick}
        >
            {caption}
        </button>
    );
};
