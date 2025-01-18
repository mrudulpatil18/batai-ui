import { useState, useEffect } from 'react';
import { Container } from '../components/Container';
import { ContractCard } from '../components/ContractCard';
import ContractForm from '../components/ContractForm';
import { useAuth } from '../context/AuthContext';
import { ContractDTO } from '../types';
import { getContracts } from '../api/data_api';
import { Plus } from 'lucide-react';

export default function Profile() {
    const { user, logout, token } = useAuth();
    const [contracts, setContracts] = useState<ContractDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const fetchContracts = async () => {
        try {
            setLoading(true);
            const response = await getContracts(token || '');
            console.log(response);
            if (response.contracts) {
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

    useEffect(() => {
        if (token) {
            fetchContracts();
        }
    }, [token]);

    const handleContractCreated = () => {
        fetchContracts(); // Refresh the contracts list
    };

    return (
        <Container>
            {showCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="w-full">
                        <ContractForm
                            token={token || ''}
                            onClose={() => setShowCreateForm(false)}
                            onSuccess={() => {
                                handleContractCreated();
                                setShowCreateForm(false);
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)] p-6 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-[#111827] text-2xl font-bold mb-2">
                            Welcome, {user?.username}!
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            Contract
                        </button>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-[#10B981] text-white rounded-md hover:bg-[#059669] transition-colors"
                        >
                            Logout
                        </button>
                    </div>
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
                    <ContractCard key={contract.contractId} contract={contract} setUsers={()=>{}}/>
                ))}
            </div>
        </Container>
    );
}