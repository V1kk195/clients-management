import { SearchInput } from '../../shared/components';

type Props = {
    onSearch: (value: string) => void;
};

export const SearchClients = ({ onSearch }: Props) => {
    const handleSearch = (value: string): void => {
        onSearch(value);
    };

    return (
        <SearchInput
            onSearch={handleSearch}
            placeholder={'Search clients...'}
        />
    );
};
