import { useState, useEffect } from 'react';
import { Container } from '../components/Container';
import { ContractCard } from '../components/ContractCard';
import { useAuth } from '../context/AuthContext';
import { ContractDTO } from '../types';
import { getContracts } from '../api/data_api';

export default function Profile() {
    const { user, logout, token } = useAuth();
    const [contracts, setContracts] = useState<ContractDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                setLoading(true);

                // Use the getContracts API to fetch all contracts
                const response = await getContracts(token || '');
                console.log(response);

                if (response.contracts) {
                    // Assuming the contracts key contains the list of ContractDTOs
                    setContracts(response.contracts);
                    setError(null);
                } else {
                    throw new Error(response.message || 'No contracts found');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch contracts');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchContracts();
            console.log(contracts)
        }
    }, [token]);


    return (
        <Container>
            <div className="bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)] p-6 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-[#111827] text-2xl font-bold mb-2">
                            Welcome, {user?.username}!
                        </h1>
                    </div>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-[#10B981] text-white rounded-md hover:bg-[#059669] transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {loading && (
                <div className="text-center py-4">
                    <p className="text-gray-600">Loading contracts...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && contracts.length === 0 && (
                <div className="text-center py-4">
                    <p className="text-gray-600">No contracts found</p>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {contracts.map((contract) => (
                    <ContractCard key={contract.contractId} contract={contract} />
                ))}

            </div>
        </Container>
    );
}