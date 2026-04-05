import React from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceChart from '../components/dashboard/BalanceChart';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import TransactionList from '../components/dashboard/TransactionList';
import Insights from '../components/dashboard/Insights';

const Intelligence: React.FC = () => {
  return (
    <>
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        <div className="lg:col-span-1">
          <ExpenseChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <TransactionList />
        </div>
        <div className="lg:col-span-1">
          <Insights />
        </div>
      </div>
    </>
  );
};

export default Intelligence;
