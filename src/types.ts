export interface ContractDTO {
    contractId: number;
    owner: string;
    tenant: string;
    ownerAccount: number;
    ownerDue: number;
    tenantAccount: number;
    tenantDue: number;
  }

 export type TransactionType = "EXPENDITURE" | "INCOME" | "TRANSFER"; 

export interface TransactionDTO {
  description: string;
  cropId: number;
  paidBy: string;
  contract_id: number;
  amount: number;
  sharingPercent: number;
  transactionType: TransactionType;
  timeCreated: number;
  timeModified: number;
}
