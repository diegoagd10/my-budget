import React from 'react';

export function TypeField({ formData, onChange }) {
  return (
    <div className="field">
      <label className="label primary-text-color">Type:</label>
      <div className="control">
        <label className="radio">
          <input
            type="radio"
            name="type"
            id="typeExpense"
            value="expense"
            checked={formData.type === "expense"}
            onChange={onChange} /> Expense
        </label>
        <label className="radio">
          <input
            type="radio"
            name="type"
            id="typeIncome"
            value="income"
            checked={formData.type === "income"}
            onChange={onChange} /> Income
        </label>
      </div>
    </div>
  );
}
