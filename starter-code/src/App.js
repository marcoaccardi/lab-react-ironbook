import React from "react";
import "./App.css";
import users from "./users";

class App extends React.Component {
  state = {
    users: users,
    search: "",
    student: true,
    teacher: true,
    campus: ""
  };
  onHandleSearch = e => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value
      },
      () => console.log(this.state.search)
    );
  };
  onHandleCheckBoxChange = e => {
    const { name, checked } = e.target;
    this.setState(
      {
        [name]: checked
      },
      () => console.log(this.state.checked)
    );
  };
  onHandleSelectChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="App">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          id="search"
          value={this.state.search}
          onChange={this.onHandleSearch}
        />
        <label htmlFor="student">Student</label>
        <input
          type="checkbox"
          name="student"
          id="student"
          checked={this.state.student}
          onChange={this.onHandleCheckBoxChange}
        />
        <label htmlFor="teacher">Teacher</label>
        <input
          type="checkbox"
          name="teacher"
          id="teacher"
          checked={this.state.teacher}
          onChange={this.onHandleCheckBoxChange}
        />
        <label htmlFor="campus">Campus</label>
        <select name="campus" id="campus" onChange={this.onHandleSelectChange}>
          {users
            .map(user => user.campus)
            .filter((user, index, users) => users.indexOf(user) === index)
            .map(campus => {
              return (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              );
            })}
        </select>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
            {users
              .filter(user =>
                user.firstName
                  .toLowerCase()
                  .startsWith(this.state.search.toLowerCase())
              )
              .filter(
                user =>
                  (user.role === "student" && this.state.student) ||
                  (user.role === "teacher" && this.state.teacher)
              )
              .filter(user => {
                return user.campus.includes(this.state.campus);
              })
              .map(user => {
                return (
                  <tr key={user.firstName + user.lastName}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.campus}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.linkedin && <a href={user.linkedin}>LinkdIn</a>}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
