import React, { useState } from 'react';
import { createContract } from '../api/data_api';
import { AlertCircle } from 'lucide-react';

interface ContractFormProps {
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

const ContractForm: React.FC<ContractFormProps> = ({
  token,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    tenant: '',
    owner: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      const contract: any = {
        ...formData,
      };

      await createContract(contract, token);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create contract');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-300">
        <div className="text-lg font-semibold text-green-700">New Contract</div>
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 p-4 space-y-4">
          {/* Basic Details Section */}

            <div>
              <label className="text-gray-500 text-sm font-medium">Tenant Name</label>
              <input
                type="text"
                name="tenant"
                value={formData.tenant}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
                required
              />
            </div>

            <div>
              <label className="text-gray-500 text-sm font-medium">Owner Name</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
                required
              />
            </div>

            
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
            {loading ? 'Creating...' : 'Create Contract'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContractForm;