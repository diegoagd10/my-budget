import React from 'react';

const handleChange = (e, onChageEvent) => {
  const { value } = e.target;
  const isValid = /^[ a-zA-Z]*$/.test(value);
  if (isValid) {
    onChageEvent(e);
  }
};

export function DescriptionField({ formData, onChange }) {
  return (
    <div className="field">
      <label className="label primary-text-color">Description:</label>
      <div className="control">
        <input
          id="description"
          name="description"
          className="input is-danger"
          type="text"
          placeholder="e.g. Rent"
          pattern="[a-zA-Z]+"
          maxLength="25"
          value={formData.description}
          onChange={(e) => handleChange(e, onChange)} />
      </div>
    </div>
  );
}
