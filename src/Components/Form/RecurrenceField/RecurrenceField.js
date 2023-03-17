import React from 'react';

export function RecurrenceField({ formData, onChange }) {
  return (
    <div className="field">
      <label className="label primary-text-color">Recurrence:</label>
      <div className="control">
        <span className="select is-fullwidth">
          <select
            id="recurrence"
            name="recurrence"
            value={formData.recurrence}
            onChange={onChange}>
            <option value="one-time">One time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="montly">Montly</option>
          </select>
        </span>
      </div>
    </div>
  );
}
