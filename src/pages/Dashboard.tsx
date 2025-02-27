import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, LogOut } from 'lucide-react';
import useStore from '../lib/store';

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, logout, getTransactionsForUser } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const transactions = currentUser ? getTransactionsForUser(currentUser.userId) : [];

  return (
    <div className="min-h-screen bg-custom-gradient">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img 
                src="https://raw.githubusercontent.com/dljs2001/Images/refs/heads/main/logo.png" 
                alt="Dhani Finance" 
                className="h-10" 
              />
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6 text-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Account Name</p>
                <p className="text-lg font-medium">{currentUser?.accountName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="text-lg font-medium">{currentUser?.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Type</p>
                <p className="text-lg font-medium">{currentUser?.accountType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-lg font-medium">₹ {currentUser?.balance?.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">{currentUser?.bankName || "CANARA"} Bank Account</p>
              <p className="text-lg font-medium mb-2">{currentUser?.bankAccount || "Not Set"}</p>
              <button className="w-full py-2 px-4 rounded-md btn-gradient">
                Withdraw To Your {currentUser?.bankName || "CANARA"} Bank Account
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b last:border-0"
                  >
                    <span className="text-gray-900">{transaction.description}</span>
                    <span className={`font-medium ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {transaction.amount > 0 ? '+ ' : ''}₹ {transaction.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;