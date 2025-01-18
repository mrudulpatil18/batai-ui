import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContractCard } from './ContractCard';
import { Container } from './Container';
import { useAuth } from '../context/AuthContext';
import { getContractById, getTransactionsByContract } from '../api/data_api';
import { ContractDTO, TransactionDTO, User } from '../types';
import { PlusCircle } from 'lucide-react';
import Transaction from './Transaction';
import TransactionForm from './TransactionForm';

export const ContractPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const contractId = parseInt(id || '', 10);

    const [contract, setContract] = useState<ContractDTO | null>(null);
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
    const [owner, setOwner] = useState<User>();
    const [tenant, setTenant] = useState<User>();

    useEffect(() => {
        const fetchContractData = async () => {
            try {
                setLoading(true);
                const [contractRes, transactionsRes] = await Promise.all([
                    getContractById(contractId, token || ''),
                    getTransactionsByContract(contractId, token || '')
                ]);

                if (contractRes.contract) {
                    setContract(contractRes.contract);
                }
                if (transactionsRes.transactions) {
                    setTransactions(transactionsRes.transactions);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchContractData();
        }
    }, [contractId, token]);

    if (loading) {
        return (
            <Container>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-pulse text-gray-600">Loading contract details...</div>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    <p>{error}</p>
                </div>
            </Container>
        );
    }

    if (!contract) {
        return (
            <Container>
                <div className="text-center py-8">
                    <h2 className="text-2xl font-semibold text-gray-700">Contract not found</h2>
                    <p className="text-gray-500 mt-2">The requested contract could not be found.</p>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            {/* Contract Card */}
            <ContractCard contract={contract} setUsers={(owner, tenant) => {
                setOwner(owner);
                setTenant(tenant);
            }}/>

            {/* Transactions Section */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Transactions</h2>
                    <button
                        onClick={() => setShowNewTransactionForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors"
                    >
                        <PlusCircle size={20} />
                        <span>New Transaction</span>
                    </button>
                </div>

                {transactions.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No transactions found for this contract.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {transactions.map((transaction, index) => (
                            <Transaction transaction={transaction} key={transaction.description || index} contract={contract} owner={owner} tenant={tenant} />
                        ))}
                    </div>
                )}
            </div>

            {/* Add your TransactionForm component here */}
            {showNewTransactionForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <TransactionForm
                        contractId={contractId}
                        token={token || ''}
                        onClose={() => setShowNewTransactionForm(false)}
                        onSuccess={() => {
                            // Refresh transactions list
                            if (token) {
                                getTransactionsByContract(contractId, token)
                                    .then(res => {
                                        if (res.transactions) {
                                            setTransactions(res.transactions);
                                        }
                                    })
                                    .catch(console.error);

                                getContractById(contractId, token)
                                    .then(res => {
                                        if(res.contract){
                                            setContract(res.contract);
                                        }
                                    })
                                    .catch(console.error);
                            }
                        }}
                    />
                </div>
            )}
        </Container>
    );
};

export default ContractPage;