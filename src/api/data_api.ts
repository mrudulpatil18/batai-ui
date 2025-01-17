import { ContractDTO, TransactionDTO } from "../types";

const API_URL = 'http://localhost:8080';



interface ApiResponse<T> {
    message: string;
    contract?: T;
    transaction?: T;
    transactions?: T[];
}

// Contract-related functions
export const getContractById = async (contractId: number, token: string): Promise<ApiResponse<ContractDTO>> => {
    try {
        const response = await fetch(`${API_URL}/contracts/${contractId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || 'Failed to fetch contract';
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch contract: ${error.message}`);
        }
        throw new Error('An unknown error occurred');
    }
};

export const getContracts = async (token: string): Promise<{ message: string; contracts: ContractDTO[] }> => {
    try {
        const response = await fetch(`${API_URL}/contracts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || 'Failed to fetch contracts';
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch contracts: ${error.message}`);
        }
        throw new Error('An unknown error occurred');
    }
};


export const createContract = async (contract: ContractDTO, token: string): Promise<ApiResponse<ContractDTO>> => {
    try {
        const response = await fetch(`${API_URL}/contracts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contract),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || 'Failed to create contract';
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to create contract: ${error.message}`);
        }
        throw new Error('An unknown error occurred');
    }
};

// Transaction-related functions
export const getTransactionsByContract = async (contractId: number, token: string): Promise<ApiResponse<TransactionDTO>> => {
    try {
        const response = await fetch(`${API_URL}/transactions/${contractId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || 'Failed to fetch transactions';
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch transactions: ${error.message}`);
        }
        throw new Error('An unknown error occurred');
    }
};

export const createTransaction = async (
    transaction: TransactionDTO, 
    contractId: number, 
    token: string
): Promise<ApiResponse<TransactionDTO>> => {
    try {
        const response = await fetch(`${API_URL}/transactions/${contractId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || 'Failed to create transaction';
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to create transaction: ${error.message}`);
        }
        throw new Error('An unknown error occurred');
    }
};