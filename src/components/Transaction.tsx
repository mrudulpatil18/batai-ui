import React from 'react';
import { useAuth } from "../context/AuthContext";
import { ContractDTO, TransactionDTO } from "../types";
import { Calendar, User, Percent } from 'lucide-react';

interface TransactionProps {
  transaction: TransactionDTO;
  contract: ContractDTO;
}

const calculateUtils = (transaction: TransactionDTO, contract: ContractDTO) =>{
    const { user } = useAuth();
    const amount = transaction.amount;
    const isOwner = user?.username === contract.owner;
    let balanceImpact = isOwner ? ((transaction.sharingPercent / 100.0 ) * amount) : (((100- transaction.sharingPercent) / 100.0 ) * amount); 
    if(transaction.transactionType == "EXPENDITURE"){
        balanceImpact *= -1;
    } 

    if(transaction.transactionType == "TRANSFER"){
        balanceImpact = 0;
    }
    
    return {balanceImpact, isOwner};
}

const Transaction: React.FC<TransactionProps> = ({ transaction, contract }) => {
  
  const {isOwner, balanceImpact} = calculateUtils(transaction, contract);
  
  const badgeClass = transaction.transactionType === "EXPENDITURE" 
    ? "bg-red-100 text-red-600"
    : transaction.transactionType === "INCOME" 
    ? "bg-green-100 text-green-600"
    : "bg-blue-100 text-blue-600";
  
  const textClass = transaction.transactionType === "EXPENDITURE" 
    ? "text-red-600"
    : transaction.transactionType === "INCOME" 
    ? "text-green-600"
    : "text-blue-600";

  const balanceClass = balanceImpact >= 0 
    ? "text-green-600"
    : "text-red-600";

  return (
    <div className="flex items-center justify-between p-2 bg-white hover:bg-gray-50 border-b">
      {/* Left section with badge and description */}
      <div className="flex items-center space-x-3 w-1/3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${badgeClass}`}>
          {transaction.transactionType?.charAt(0)}
        </div>
        <span className="font-medium text-gray-900 truncate">
          {transaction.description}
        </span>
      </div>

      {/* Middle section with amount */}
      <div className="flex items-center justify-end w-20">
        <span className={`font-semibold ${textClass}`}>
          ${transaction.amount?.toLocaleString()}
        </span>
      </div>

      {/* Right section with metadata and balance impact */}
      <div className="flex items-center space-x-4 flex-shrink-0">
        <div className="flex items-center text-sm text-gray-500">
          <User size={14} className="mr-1" />
          {transaction.paidBy}
        </div>
        <div className="flex items-center text-sm text-gray-500">
        {isOwner ? transaction.sharingPercent : 100 - transaction.sharingPercent}
          <Percent size={14} className="mr-1" />
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={14} className="mr-1" />
          {new Date().toLocaleDateString()}
        </div>
        <div className={`w-24 text-right font-medium ${balanceClass}`}>
          {balanceImpact > 0 ? "+" : ""}{balanceImpact!=0 && balanceImpact.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Transaction;