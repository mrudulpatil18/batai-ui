import { ContractDTO } from "./types";

export const sampleContracts: ContractDTO[] = [
    {
        contractId: 1,
        owner: "John Doe",
        tenant: "abcd2", // Logged-in user as tenant
        ownerAccount: 5000,
        ownerDue: -200, // Owner owes $200 to tenant
        tenantAccount: 3000,
        tenantDue: 200 // Tenant is owed $200 by owner
    },
    {
        contractId: 2,
        owner: "abcd2", // Logged-in user as owner
        tenant: "Sarah Williams",
        ownerAccount: 8000,
        ownerDue: -800, // Owner is owed $800 by tenant
        tenantAccount: 2500,
        tenantDue: 800 // Tenant owes $800 to owner
    },
];
