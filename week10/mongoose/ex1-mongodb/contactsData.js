import contactModel from './api/contacts/contactModel';

const contacts = [{
    'name': 'Contact 1',
    'address': '123 Test St',
    'phone_number': '132-3212',
  },
  {
    'name': 'Contact 2',
    'address': '23 Main St',
    'phone_number': '934-4329',
  },
  {
    'name': 'Contact 3',
    'address': '4 Lower St',
    'phone_number': '432-5832',
  },
  {
    'name': 'Contact 4',
    'address': '49 Upper Street',
    'phone_number': '934-4290',
  },
];

export default async function loadContacts() {
  try {
    await contactModel.deleteMany();
    await contactModel.collection.insertMany(contacts);
    console.info(`${contacts.length} contacts were successfully stored.`);
  } catch (err) { 
    console.error(`failed to Load Contact Data: ${err}`);
  }
}