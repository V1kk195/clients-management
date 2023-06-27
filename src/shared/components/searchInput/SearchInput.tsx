import React, { useState } from 'react';

type Props = {
    onSearch: (value: string) => void;
    placeholder?: string;
};

export const SearchInput = ({ onSearch, placeholder = 'Search' }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="input-group input-group-sm">
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
                className="form-control"
            />
        </div>
    );
};
