export interface ContractDTO {
    contractId: number;
    owner: string;
    tenant: string;
    ownerAccount: number;
    ownerDue: number;
    tenantAccount: number;
    tenantDue: number;
  }

  export type TransactionType = "PAYMENT" | "ADVANCE" | "SETTLEMENT" | "OTHER"; // Add more types as needed

export interface TransactionDTO {
  description: string;
  cropId: number;
  paidBy: string;
  contract_id: number;
  amount: number;
  sharingPercent: number;
  transactionType: TransactionType;
  timeCreated: number; // Timestamp in milliseconds
  timeModified: number; // Timestamp in milliseconds
}
