import React, { useState } from 'react';

import './App.css';

import FormCreateContact from './components/FormCreateContact/FormCreateContact';
import ContactsTable from './components/ContactsTable/ContactsTable';

import contacts from './contacts.json';

const App = () => {
  const [contactsList, setContactsList] = useState(contacts.slice(0, 5));

  const handleCreateContact = (newContact) => {
    setContactsList([...contactsList, newContact]);
  }

  return (
    <div className="app">

      <h1>IronContacts</h1>

      <FormCreateContact createContact={handleCreateContact} />

      <ContactsTable contacts={contactsList} />

    </div>
  );
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       contactsList: contacts.slice(0, 5),
//       name: '',
//       pictureUrl: '',
//       popularity: 0,
//     };
//   }

//   handleCreateContact = (event) => {
//     event.preventDefault();

//     console.log("THIS -->", this);

//     const newContact = {
//       id: new Date().getTime(),
//       name: this.state.name,
//       pictureUrl: this.state.pictureUrl,
//       popularity: this.state.popularity,
//     };

//     this.setState({ contactsList: [...this.state.contactsList, newContact] });
//     this.setState({ name: '', pictureUrl: '', popularity: 0 });
//   }

//   render() {
//     return (
//       <div className="app">
  
//         <h1>IronContacts</h1>

//         <form onSubmit={this.handleCreateContact} className="create-contact-container">
//           <div>
//             <input
//               type="text"
//               name="name"
//               placeholder="Contact Name"
//               value={this.state.name}
//               onChange={(event) => this.setState({ name: event.target.value })}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="pictureUrl"
//               placeholder="Picture URL"
//               value={this.state.pictureUrl}
//               onChange={(event) => this.setState({ pictureUrl: event.target.value })}
//             />
//           </div>
//           <div>
//             <input
//               type="number"
//               step="0.01"
//               name="popularity"
//               placeholder="Popularity"
//               value={this.state.popularity}
//               onChange={(event) => this.setState({ popularity: event.target.value })}
//             />
//           </div>
//           <div>
//             <button type="submit">Create new Contact</button>
//           </div>
//         </form>
  
//         <ContactsTable contacts={this.state.contactsList} />
  
//       </div>
//     );
//   }
// }

export default App;
