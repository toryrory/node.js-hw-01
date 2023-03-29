const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await JSON.parse(await fs.readFile(contactsPath, "utf8"));
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = await contacts.find(({ id }) => id === contactId);
    return contactById ? contactById : null;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactToDelete = await getContactById(contactId);
    if (!contactToDelete) {
      console.log(`Contact with id "${contactId}" do not exist!`);
      return;
    }
    const newContacts = await contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(
      `Contact with id "${contactId}" successfully deleted! Here is new deleted contact`
    );
    return contactToDelete;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uid(21),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`New contact "${newContact.name}" successfully added!`);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
