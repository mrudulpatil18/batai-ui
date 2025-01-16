import { TransactionDTO } from "./types";

export const sampleTransactions: TransactionDTO[] = [
  {
    description: "Payment for crop sale",
    cropId: 101,
    paidBy: "John Doe",
    contract_id: 1,
    amount: 2000,
    sharingPercent: 50,
    transactionType: "PAYMENT",
    timeCreated: new Date("2025-01-01T10:00:00Z").getTime(),
    timeModified: new Date("2025-01-01T12:00:00Z").getTime(),
  },
  {
    description: "Advance payment",
    cropId: 102,
    paidBy: "abcd2",
    contract_id: 1,
    amount: 1500,
    sharingPercent: 60,
    transactionType: "ADVANCE",
    timeCreated: new Date("2025-01-05T14:00:00Z").getTime(),
    timeModified: new Date("2025-01-05T16:00:00Z").getTime(),
  },
  {
    description: "Final settlement",
    cropId: 103,
    paidBy: "Sarah Williams",
    contract_id: 2,
    amount: 800,
    sharingPercent: 70,
    transactionType: "SETTLEMENT",
    timeCreated: new Date("2025-01-10T09:00:00Z").getTime(),
    timeModified: new Date("2025-01-10T11:00:00Z").getTime(),
  },
];
