import _ from "lodash";
import React from 'react';
import './AddTransactionForm.css';
import { AmountField } from "../Form/AmountField/AmountField";
import { CategoryIdField } from "../Form/CategoryIdField/CategoryIdField";
import { DateField } from "../Form/DateField/DateField";
import { DescriptionField } from "../Form/DescriptionField/DescriptionField";
import { RecurrenceField } from "../Form/RecurrenceField/RecurrenceField";
import { TypeField } from "../Form/TypeField/TypeField";

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

  isFormInvalid() {
    const {
      description,
      amount,
      date
    } = this.state.formData;
    const fields = [description, amount, date];
    for (const field of fields) {
      if (field === null || field === "")
        return true;
    }
    return false;
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
                  disabled={this.isFormInvalid()}
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
