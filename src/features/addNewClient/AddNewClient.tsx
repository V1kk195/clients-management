import { Button } from '../../shared/components/button';
import { useAddClientMutation } from '../../shared/api/clientsApi';

export const AddNewClient = () => {
    const [addClient, { isLoading }] = useAddClientMutation();

    const handleClick = async () => {
        await addClient({ id: Math.random(), name: 'Samsung' });
    };

    return <Button caption={'New Client'} onClick={handleClick} />;
};
