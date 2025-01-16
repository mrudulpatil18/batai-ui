const API_URL = 'http://localhost:8080';

export const login = async (username: string, password: string): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            const errorData = await response.json().catch(() => null); // Safely parse JSON
            const errorMessage = errorData?.message || 'Failed to login';
            throw new Error(errorMessage);
        }

        // Parse and return the JSON response
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Login failed: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};


export const register = async (username: string, password: string): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            const errorData = await response.json().catch(() => null); // Safely parse JSON
            const errorMessage = errorData?.message || 'Failed to register';
            throw new Error(errorMessage);
        }

        // Parse and return the JSON response
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Registration failed: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
