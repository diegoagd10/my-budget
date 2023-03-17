import React from 'react';

const handleChange = (e, onChageEvent) => {
  const { value } = e.target;
  const isValid = /^\d*\.?\d{0,2}$/.test(value);
  if (isValid) {
    onChageEvent(e);
  }
};

export function AmountField({ formData, onChange }) {
  return (
    <div className="field">
      <label className="label primary-text-color">Amount:</label>
      <div className="control">
        <input
          id="amount"
          name="amount"
          className="input is-danger"
          type="decimal"
          placeholder="e.g. 200"
          value={formData.amount}
          maxLength="10"
          onChange={(e) => handleChange(e, onChange)} />
      </div>
    </div>
  );
}
