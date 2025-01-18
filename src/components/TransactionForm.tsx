import React, { useState } from 'react';
import { createTransaction } from '../api/data_api';
import { AlertCircle } from 'lucide-react';

interface TransactionFormProps {
  contractId: number;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  contractId,
  token,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    description: '',
    cropId: '',
    paidBy: '',
    transactionType: '',
    amount: '',
    sharingPercent: '50',
    timeCreated: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const transaction: any = {
        ...formData,
        contract_id: contractId,
        amount: parseFloat(formData.amount),
        cropId: parseInt(formData.cropId, 10),
        sharingPercent: parseInt(formData.sharingPercent, 10),
        timeCreated: new Date(formData.timeCreated).toISOString(),
        timeModified: new Date().toISOString()
      };

      await createTransaction(transaction, contractId, token);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-300">
        <div className="text-lg font-semibold text-green-700">New Transaction</div>
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Transaction Details Section */}
          <div>
            <div className="space-y-1">
              <div>
                <label className="text-gray-500 text-sm font-medium">Transaction Date</label>
                <input
                  type="date"
                  name="timeCreated"
                  value={formData.timeCreated}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="text-gray-500 text-sm font-medium">Transaction Type</label>
                <select
                  name="transactionType"
                  value={formData.transactionType}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
                  required
                >
                  <option value="">Select type</option>
                  <option value="INCOME">Income</option>
                  <option value="EXPENDITURE">Expenditure</option>
                  <option value="TRANSFER">Transfer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Fields Section */}
          {formData.transactionType && (
            <div className="border-t pt-4">
              <div className="space-y-1">
                <div>
                  <label className="text-gray-500 text-sm font-medium">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-500 text-sm font-medium">Crop ID</label>
                  <input
                    type="number"
                    name="cropId"
                    value={formData.cropId}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-500 text-sm font-medium">
                    {formData.transactionType === 'TRANSFER' ? 'Transfer from' :
                      formData.transactionType === 'INCOME' ? 'Received By' : 'Paid By'}
                  </label>
                  <input
                    type="text"
                    name="paidBy"
                    value={formData.paidBy}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-500 text-sm font-medium">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
                    required
                  />
                </div>

                {formData.transactionType !== 'TRANSFER' && (
                  <div>
                    <label className="text-gray-500 text-sm font-medium">Sharing Percentage</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-800">{formData.sharingPercent}%</span>
                        <input
                          type="range"
                          name="sharingPercent"
                          value={formData.sharingPercent}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          step="5"
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-800">{100 - parseInt(formData.sharingPercent)}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Owner</span>
                        <span>Tenant</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;