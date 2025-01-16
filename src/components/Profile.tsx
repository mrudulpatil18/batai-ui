import { Container } from '../components/Container';
import { ContractCard } from '../components/ContractCard';
import { sampleContracts } from '../sampleContracts';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, logout } = useAuth();

    return (
        <Container>
            <div className="bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)] p-6 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-[#111827] text-2xl font-bold mb-2">Welcome, {user?.username}!</h1>
                    </div>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-[#10B981] text-white rounded-md hover:bg-[#059669] transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Updated Layout: Vertical Stack */}
            <div className="flex flex-col gap-4">
                {sampleContracts.map((contract) => (
                    <ContractCard key={contract.contractId} contract={contract} />
                ))}
            </div>
        </Container>
    );
}
