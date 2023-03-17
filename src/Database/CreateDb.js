import Databases from "./Databases";

function getCategories() {
  return [
    { _id: "1", name: "Food", type: "expense" },
    { _id: "2", name: "Rent", type: "expense" },
    { _id: "3", name: "Internet", type: "expense" },
    { _id: "4", name: "Mobile", type: "expense" },
    { _id: "5", name: "Loan", type: "expense" },
    { _id: "6", name: "Utilities", type: "expense" },
    { _id: "7", name: "Insurance", type: "expense" },
    { _id: "8", name: "Health", type: "expense" },
    { _id: "9", name: "Restaurants", type: "expense" },
    { _id: "10", name: "Entertainment", type: "expense" },
    { _id: "11", name: "Donations", type: "expense" },
    { _id: "12", name: "Credit Card", type: "expense" },
    { _id: "13", name: "Relatives", type: "expense" },
    { _id: "14", name: "Mexico", type: "expense" },
    { _id: "15", name: "Salary", type: "income" },
    { _id: "16", name: "Savings", type: "income" },
    { _id: "17", name: "Loan", type: "income" },
    { _id: "18", name: "Tax Refund", type: "income" },
    { _id: "19", name: "Return", type: "income" },
    { _id: "20", name: "School", type: "expense" },
    { _id: "21", name: "Other", type: "expense" },
    { _id: "22", name: "Other", type: "income" },
  ];
}

async function existCategories(db) {
  const firstCategoryId = "1";
  try {
    await db.get(firstCategoryId);
    return true;
  } catch (err) {
    if (err.status === 404)
      return false;
    throw Error(err);
  }
}

async function createCategories(db) {
  if (await existCategories(db) === false) {
    for (const category of getCategories())
      await db.put(category);
  }
}

async function CreateDb() {
  createCategories(Databases.categories)
    .catch(error => console.error(error));
}

export default CreateDb;