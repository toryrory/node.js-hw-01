const contactsOperations = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const data = await contactsOperations.listContacts();
      console.table(data);
      break;

    case "get":
      const contactById = await contactsOperations.getContactById(id);
      console.table(contactById);
      break;

    case "add":
      const newContactsList = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.table(newContactsList);
      break;

    case "remove":
      const newContacts = await contactsOperations.removeContact(id);
      console.table(newContacts);
      break;

    default:
      console.warn("Unknown action type!");
  }
};

module.exports = {
  invokeAction,
};
