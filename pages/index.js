import React, { useState } from 'react';

const PhoneBookForm = (props) => {
    const initContact = {
        id: null,
        userFirstname: "Coder",
        userLastname: "Byte",
        userPhone: "8885559999",
    };
    
    const [userState, setUserState] = useState(initContact);

    const handleUserChange = (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userState.userFirstname || !userState.userLastname || !userState.userPhone) return;
        props.addUser(userState);
        setUserState(initContact);
    };

    return (
      <div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First name: </label>
            <input
                className="form-control"
                name="userFirstname"
                type="text"
                value={userState.userFirstname}
                onChange={handleUserChange}
            />

            <label className="form-label">Last name: </label>
            <input
                className="form-control"
                name="userLastname"
                type="text"
                value={userState.userLastname}
                onChange={handleUserChange}
            />
            <label className="form-label">Phone: </label>
            <input
                className="form-control"
                name="userPhone"
                type="text"
                value={userState.userPhone}
                onChange={handleUserChange}
            />
            <br />
            <button
                className="btn btn-primary"
                type="submit"
            >Add User</button>
            <br />
          </div>
        </form>
      </div>
    );
}

const InformationTable = (props) => {
    const sortedContacts = props.users.sort((a, b) => a.userLastname.localeCompare(b.userLastname));

    const display =
        sortedContacts.length > 0 ? (
          sortedContacts.map((user, index) => (
            <tr key={index}>
              <td>{user.userFirstname}</td>
              <td>{user.userLastname}</td>
              <td>{user.userPhone}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
        );

        return (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>{display}</tbody>
            </table>
          </div>
        );
}

const Application = (props) => {
    const userObj = [];

    const [users, setUsers] = useState(userObj);

    const addUser = (user) => {
        user.id = users.length + 1;
        setUsers([...users, user]);
    };

    return (
      <div className="container">
        <section>
          <PhoneBookForm addUser={addUser} />
          <InformationTable users={users} />
        </section>
      </div>
    );
}

export default Application;