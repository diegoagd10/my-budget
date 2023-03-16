import _ from "lodash";
import React from 'react';
import './AddTransactionForm.css';

//TODO: Moves fields to other files
//TODO: Disable Create button if required fields are empty
function DescriptionField({ formData, onChange }) {
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
          value={formData.description}
          onChange={onChange} />
      </div>
    </div>
  );
}

function AmountField({ formData, onChange }) {
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
          onChange={onChange} />
      </div>
    </div>
  );
}

function CategoryIdField({ formData, onChange, categories }) {
  const options = categories.map(({ _id, name }) =>
    (<option value={_id} key={_id}>{name}</option>));
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

function TypeField({ formData, onChange }) {
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

function DateField({ formData, onChange }) {
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

function RecurrenceField({ formData, onChange }) {
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

class AddTransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      formData: _.cloneDeep(props.transaction),
      allCategories: props.categories,
      categories: this.getCategories(props.categories, props.transaction.type)
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    const prevFormData = this.state.formData;
    const newFormData = { ...prevFormData, [name]: value };
    if (name === "type") {
      const selectedType = value;
      const defaultCategoryId = selectedType === "expense" ? 1 : 15;
      this.setState({
        categories: this.getCategories(this.state.allCategories, selectedType)
      });
      newFormData.categoryId = defaultCategoryId;
    }
    this.setFormData(newFormData);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit(this.state.formData);
  }

  getCategories(categories, transactionType) {
    return categories.filter(({ type }) => type === transactionType);
  }

  setFormData(param) {
    if (typeof param === "function") {
      const updateFunc = param;
      const newFormData = updateFunc(this.state.formData);
      this.setState({ formData: newFormData });
    } else {
      this.setState({ formData: param });
    }
  }

  updateCategories(selectedType) {
    const defaultCategoryId = selectedType === "expense" ? 1 : 15;
    const categories = this.state.allCategories
      .filter(({ type }) => type === selectedType);
    this.setState({ categories: categories });
    this.setFormData((prevFormData) => ({ ...prevFormData, categoryId: defaultCategoryId }));
  }

  render() {
    const formData = this.state.formData;
    const categories = this.state.categories;
    return (
      <section className="AddTransactionForm-main">
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <DescriptionField formData={formData} onChange={this.handleChange} />
            <AmountField formData={formData} onChange={this.handleChange} />
            <TypeField formData={formData} onChange={this.handleChange} />
            <CategoryIdField
              categories={categories}
              formData={formData}
              onChange={this.handleChange} />
            <DateField formData={formData} onChange={this.handleChange} />
            <RecurrenceField formData={formData} onChange={this.handleChange} />
            {/* Buttons */}
            <div className="columns">
              <div className="column">
                <button
                  className="button is-light is-fullwidth"
                  type="button"
                  onClick={this.props.onFormCancel}>Cancel</button>
              </div>
              <div className="column">
                <button
                  className="button is-primary is-fullwidth"
                  type="submit">Create</button>
              </div>
            </div>
          </div> {/* <div className="container"> */}
        </form>
      </section>
    );
  }
}

export default AddTransactionForm;
