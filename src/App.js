import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const[users, setUsers] = useState([]);

  useEffect( () => {
    fetch('http://localhost:5000/users')
    .then( res => res.json())
    .then( data => setUsers(data))
  }, [])


  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email =form.email.value;
    const user = {name, email};
    console.log(user);
    form.reset();
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then( res => res.json())
    .then( data => {
      console.log(data);
      const newUsers = [...users, data];
      setUsers(newUsers);
    })
    .catch( error => console.log(error))
  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='Name' />
        <br />
        <input type="email" name="email" placeholder='Email' />
        <br />
        <button type="submit">Add User</button>
      </form>

      <h1>Total Users:{users.length}</h1>
      <div>
        {
          users.map( user => <p key={user._id}>{user.name} {user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
