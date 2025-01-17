import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContractCard } from './ContractCard';
import { Container } from './Container';
import { useAuth } from '../context/AuthContext';
import { getContractById, getTransactionsByContract, createTransaction } from '../api/data_api';
import { ContractDTO, TransactionDTO } from '../types';
import { PlusCircle } from 'lucide-react';

export const ContractPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const contractId = parseInt(id || '', 10);

    const [contract, setContract] = useState<ContractDTO | null>(null);
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);

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
            <ContractCard contract={contract} />

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
                            <div
                                key={String(transaction) || index}
                                className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    {/* Left section: Type and Description */}
                                    <div className="flex items-center gap-3 min-w-[200px] max-w-[300px]">
                                        <div className="h-8 w-8 rounded-full bg-[#10B981] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-[#10B981] text-sm font-medium">
                                                {transaction.transactionType?.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {transaction.transactionType}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {transaction.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Middle section: Amount and Paid By */}
                                    <div className="flex items-center gap-6 flex-grow">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">
                                                ${transaction.amount?.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-gray-500">by</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {transaction.paidBy}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-gray-500">share:</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {transaction.sharingPercent}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right section: Date */}
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xs text-gray-500">
                                            {new Date(transaction.timeCreated || '').toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add your TransactionForm component here */}
            {showNewTransactionForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">New Transaction</h3>
                        {/* Add your transaction form component here */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowNewTransactionForm(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Add form submission logic
                                    setShowNewTransactionForm(false);
                                }}
                                className="px-4 py-2 bg-[#10B981] text-white rounded-md hover:bg-[#059669]"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ContractPage;