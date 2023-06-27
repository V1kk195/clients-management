import { Button } from '../../shared/components';
import { ReactComponent as Icon } from '../../shared/assests/x-lg.svg';
import styles from './RemoveItem.module.scss';

type Props = {
    onRemove: () => void;
    isLoading: boolean;
};

export const RemoveItem = ({ onRemove, isLoading = false }: Props) => {
    const handleRemove = () => {
        onRemove();
    };

    return (
        <Button
            icon={<Icon />}
            onClick={handleRemove}
            className={styles.removeButton}
            disabled={isLoading}
        />
    );
};
