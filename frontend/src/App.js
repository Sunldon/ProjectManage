import React, { Component } from 'react';
import Modal from "./components/Modal";
import axios from "axios";
import FlipMove from 'react-flip-move';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        startDate: "",
        endDate: "",
        completed: false,
        projectManager: ''
      },
      todoList: []
    };
    this.priority = 0;
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos")
      .then(res => this.setState({ todoList: res.data.sort((a, b) => (a.priority - b.priority)) }))
      .catch(err => console.log(err));
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  handleChange = e => {
    if (e.keyCode == 13) {
      console.log('回车事件')
      let password = e.target.value;
      console.log('password', password)
      this.displayUpDown = password === "sssssss!"
      return this.setState({ displayUpDown: this.displayUpDown })
    }
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
        <input
          type="text"
          name="title"
          onKeyUp={this.handleChange}
          placeholder="Enter password"
        />
      </div>
    );
  };

  renderItems = () => {
    console.log('renderItems');
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    const { displayUpDown } = this.state;
    console.log('displayUpDown', displayUpDown)
    newItems.sort((a, b) => (a.priority - b.priority));
    console.log('newItems', newItems)
    return (
      <FlipMove>
        {
          // className="list-group-item d-flex justify-content-between align-items-center"
          newItems.map((item, index) => (
            <table key={item.id} border="1" className={'tb-tr'}>
              { index == 0 &&
                <thead>
                  <tr>
                    <th className={'text-description'}>任务描述</th>
                    <th className={'text-Date'}>开始日期</th>
                    <th className={'text-Date'}>结束日期</th>
                    <th className={'text-Date'}>项目经理</th>
                    <th className={'btn-description'}></th>
                  </tr>
                </thead>
              }
              <tr
                className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
                title={item.description}
              >
                <td className={'text-description'}>
                  {item.title}
                </td>
                <td className={'text-Date'}>
                  {item.startDate}
                </td>
                <td className={'text-Date'}>
                  {item.endDate}
                </td>
                <td className={'text-Date'}>
                  {item.projectManager}
                </td>

                <td className={'btn-description'}>
                  {displayUpDown &&
                    <button onClick={() => this.editItem(item)}
                      className="btn btn-secondary mr-2">
                      {" "}
                    Edit{" "}
                    </button>
                  }
                  {displayUpDown &&
                    <button onClick={() => this.handleDelete(item)}
                      className="btn btn-danger">
                      Delete
                  </button>
                  }
                  <div className='btn-group'>
                    {displayUpDown && index > 0 ? <button className='btn btn-primary' onClick={() => this.sortUp(index)}>UP</button> : null}
                    {displayUpDown && index < newItems.length - 1 ? <button className='btn btn-dark' onClick={() => this.sortDown(index)}>Down</button> : null}
                  </div>
                </td>
              </tr>
            </table>
          )
          )
        }
      </FlipMove>
    );
  }

  sortUp(index) {
    this.resort(index, -1);
  }
  sortDown(index) {
    this.resort(index, 1);
  }
  resort(index, diff) {
    const { viewCompleted } = this.state;
    var newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    var item = newItems[index];
    newItems.splice(index, 1);
    newItems.splice(index + diff, 0, item);
    newItems.map((item, index) => (item.priority = index))
    newItems.map((item) => (axios
      .put(`http://localhost:8000/api/todos/${item.id}/`, item)
      // .then(this.refreshList)
    ))
    this.setState({ todoList: newItems });
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    console.log(item)
    if (item.id) {
      console.log(item)
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    item.priority = this.state.todoList.length;
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList());
  };

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: true });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: true });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            {/* <div className="card p-3"> */}
            <div className="">
              <button onClick={this.createItem} className="btn btn-primary">
                Add task
                </button>
            </div>
            {this.renderTabList()}
            <ul className="list-group list-group-flush">
              {this.renderItems()}
            </ul>
            {/* </div> */}
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }

}

export default App;
