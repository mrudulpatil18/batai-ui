import { useNavigate } from "react-router-dom";
import { ContractDTO } from "../types";
import { useAuth } from "../context/AuthContext";

interface ContractCardProps {
    contract: ContractDTO;
}

export const ContractCard = ({ contract }: ContractCardProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const isOwner = user?.username === contract.owner;

    // Determine the relevant due and balance information
    const balance = isOwner ? contract.ownerAccount : contract.tenantAccount;
    const due = isOwner ? contract.ownerDue : contract.tenantDue;

    // Determine whether you owe or they owe
    const owesYou = due < 0; // Negative due means the other party owes you
    const youOwe = due > 0; // Positive due means you owe the other party

    const otherParty = isOwner ? contract.tenant : contract.owner;

    return (
        <div
            onClick={() => navigate(`/contracts/${contract.contractId}`)}
            className="cursor-pointer p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-all bg-white"
        >
            {/* Contract ID */}
            <div className="text-lg font-semibold text-green-700">#{contract.contractId}</div>

            {/* Contract Details */}
            <div className="mt-2">
                <h3 className="text-gray-700 text-sm font-medium">Contract Details</h3>
                <div className="mt-1 flex justify-between items-center">
                    <span className="font-medium text-gray-500">Owner:</span>
                    <span className="text-gray-800">{contract.owner}</span>
                </div>
                <div className="mt-1 flex justify-between items-center">
                    <span className="font-medium text-gray-500">Tenant:</span>
                    <span className="text-gray-800">{contract.tenant}</span>
                </div>
            </div>

            {/* Your Account */}
            <div className="mt-4 border-t pt-4">
                <h4 className="text-green-700 font-medium">Your Account</h4>
                <div className="mt-2 flex justify-between items-center">
                    <span className="font-medium">Margin:</span>
                    <span className={balance < 0 ? "text-red-500" : "text-green-500"}>
                        ${balance.toLocaleString()}
                    </span>
                </div>
                {youOwe && (
                    <div className="mt-2 flex justify-between items-center text-sm">
                        <span className="font-medium">You owe {otherParty}:</span>
                        <span className="text-red-500">${Math.abs(due).toLocaleString()}</span>
                    </div>
                )}
                {owesYou && (
                    <div className="mt-2 flex justify-between items-center text-sm">
                        <span className="font-medium">{otherParty} owes you:</span>
                        <span className="text-green-500">${Math.abs(due).toLocaleString()}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
