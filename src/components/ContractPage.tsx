import React from 'react';
import { useParams } from 'react-router-dom';
import { sampleContracts } from '../sampleContracts'; // Adjust the path as needed
import { ContractCard } from './ContractCard';
import { sampleTransactions } from '../sampleTransactions'; // Sample transactions

export const ContractPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Access the 'id' parameter
    const contractId = parseInt(id || '', 10); // Convert the string id to a number

    // Find the contract using the contractId
    const contract = sampleContracts.find(c => c.contractId === contractId);

    // Filter transactions related to the contract
    const transactions = sampleTransactions.filter(
        transaction => transaction.contract_id === contractId
    );

    if (!contract) {
        return <div>Contract not found</div>;
    }

    return (
        <div className="p-4">
            {/* Contract Card */}
            <ContractCard contract={contract} />

            {/* Transactions Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Transactions</h2>
                {transactions.length === 0 ? (
                    <p className="text-gray-500">No transactions found for this contract.</p>
                ) : (
                    <div className="space-y-4">
                        {transactions.map((transaction, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all"
                            >
                                {/* Transaction Type */}
                                <div className="flex-shrink-0 w-24 h-12 bg-gray-200 rounded-lg flex justify-center items-center">
                                    <span className="text-sm font-semibold text-gray-700">{transaction.transactionType}</span>
                                </div>

                                {/* Description */}
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Description:</span> {transaction.description}
                                    </p>
                                </div>

                                {/* Amount */}
                                <div className="ml-4">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Amount:</span> ${transaction.amount.toLocaleString()}
                                    </p>
                                </div>

                                {/* Paid By */}
                                <div className="ml-4">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Paid By:</span> {transaction.paidBy}
                                    </p>
                                </div>

                                {/* Sharing Percent */}
                                <div className="ml-4">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Sharing Percent:</span> {transaction.sharingPercent}%
                                    </p>
                                </div>

                                {/* Time Created */}
                                <div className="ml-4">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Created At:</span> {new Date(transaction.timeCreated).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
