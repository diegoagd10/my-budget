import React from 'react';

export function DateField({ formData, onChange }) {
  return (
    <div className="field">
      <label className="label primary-text-color">Date:</label>
      <div className="control">
        <input
          id="date"
          name="date"
          className="input is-danger"
          type="date"
          value={formData.date}
          onChange={onChange} />
      </div>
    </div>
  );
}
