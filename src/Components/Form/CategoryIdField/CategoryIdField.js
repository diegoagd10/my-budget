import React from 'react';

export function CategoryIdField({ formData, onChange, categories }) {
  const options = categories.map(({ _id, name }) => (<option value={_id} key={_id}>{name}</option>));
  return (
    <div className="field">
      <label className="label primary-text-color">Category:</label>
      <div className="control">
        <span className="select is-fullwidth">
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={onChange}>
            {options}
          </select>
        </span>
      </div>
    </div>
  );
}
