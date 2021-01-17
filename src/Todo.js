import React, { Component } from 'react';

class Todo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            id: null,
            heading: 'DailySchedule',
            mockData: [{
                id: '1',
                title: 'Buy Milk.',
                done: false,
                date: new Date()
            }, {
                id: '2',
                title: 'Meeting with Ali.',
                done: false,
                date: new Date()
            }, {
                id: '3',
                title: 'Tea break.',
                done: false,
                date: new Date()
            }, {
                id: '4',
                title: 'Go for a run.',
                done: false,
                date: new Date()
            }]
        }
    }

    onSubmitHandle(event) {
        event.preventDefault();

        this.setState({
            mockData: [...this.state.mockData, {
                id: Date.now(),
                title: event.target.item.value,
                done: false,
                date: new Date()
            }]
        });

        event.target.item.value = '';
    }

    onDeleteHandle() {
        let id = arguments[0];

        this.setState({
            mockData: this.state.mockData.filter(item => {
                if (item.id !== id) {
                    return item;
                }
            })
        });
    }

    onEditHandle(event) {
        this.setState({
            edit: true,
            id: arguments[0],
            title: arguments[1]
        });
    }

    onUpdateHandle(event) {
        event.preventDefault();

        this.setState({
            mockData: this.state.mockData.map(item => {
                if (item.id === this.state.id) {
                    item['title'] = event.target.updatedItem.value;
                    return item;
                }

                return item;
            })
        });

        this.setState({
            edit: false
        });
    }

    onCompleteHandle() {
        let id = arguments[0];

        this.setState({
            mockData: this.state.mockData.map(item => {
                if (item.id === id) {
                    item['done'] = true;
                    return item;
                }

                return item;
            })
        });
    }

    renderEditForm() {
        if (this.state.edit) {
            return <form onSubmit={this.onUpdateHandle.bind(this)}>
                <div className="align d-flex px-4 pt-3">
                    Update
                    <div className="ml-auto d-flex w-50" id="cars">
                        <input type="text" name="updatedItem" className="item w-100" defaultValue={this.state.title} />
                        <button className="update-add-item">Update</button>
                    </div>
                </div>
            </form>
        }
    }

    render() {
        return (
            <div>
                <h1>Todo Application</h1>
                <div className="box2">
                    {this.renderEditForm()}
                    <form onSubmit={this.onSubmitHandle.bind(this)}>
                      
                    
                        <div className="align d-flex px-4 py-3">
                            Add Item
                        <div className="ml-auto d-flex w-50" id="cars">
                                <input type="text" name="item" className="item w-100"></input>
                                <button className="btn-add-item">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="box">
                    <h5 className="align d-flex px-4 py-3">
Bucket List
                     <select className="ml-auto w-50" id="cars">
                            <option value="Daily Schedule">Daily Schedule</option>
                            <option value="saab">List of complete items</option>
                            <option value="mercedes">Add more todos</option>
                            <option value="audi">List of more todos</option>
                        </select> 
                    </h5>
                    
                    <ul className="m-0 p-0">
                        {this.state.mockData.map(item => (

                            <li key={item.id} className="d-flex px-4 pb-3 align-items-center">

                                {item.title}

                                <div className="ml-auto d-flex">

                                    <button onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button>
                                    <button onClick={this.onEditHandle.bind(this, item.id, item.title)}>Edit</button>
                                    {/* <button onClick={this.onCompleteHandle.bind(this, item.id)}>Complete</button> */}
                                    <input type="checkbox" className="checkbox"></input>

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        );
    }
}

export default Todo;