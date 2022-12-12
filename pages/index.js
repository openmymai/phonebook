import React, { useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';

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
            <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <Form.Label>First name: </Form.Label>
                    <Form.Control
                        className="userFirstname"
                        name="userFirstname"
                        type="text"
                        value={userState.userFirstname}
                        onChange={handleUserChange}
                    />

                    <Form.Label>Last name: </Form.Label>
                    <Form.Control
                        className="userLastname"
                        name="userLastname"
                        type="text"
                        value={userState.userLastname}
                        onChange={handleUserChange}
                    />
                    <Form.Label>Phone: </Form.Label>
                    <Form.Control
                        className="userPhone"
                        name="userPhone"
                        type="text"
                        value={userState.userPhone}
                        onChange={handleUserChange}
                    />
                    <br />
                    <Button
                        className="submitButton"
                        type="submit"
                    >Add User</Button>
                    <br />
                </div>
            </Form>
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
                <Table className="zui-table zui-table-rounded">
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>{display}</tbody>
                </Table>
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
        <Container>
            <section>
                <PhoneBookForm addUser={addUser} />
                <InformationTable users={users} />
            </section>
        </Container>
    );
}

export default Application;