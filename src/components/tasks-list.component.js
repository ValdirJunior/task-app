import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import RLDD from 'react-list-drag-and-drop/lib/RLDD';

export default class TasksList extends Component {
    constructor(props) {
        super(props);
        this.handleRLDDChange = this.handleRLDDChange.bind(this);
        this.getTasks = this.getTasks.bind(this);

        this.state = {
            tasks: [],
        }
    }

    componentDidMount() {
        this.getTasks()
    }

    handleRLDDChange(newTasks) {
        this.setState({
            tasks: newTasks,
        });
    }

    getTasks() {
        TaskDataService.get()
        .then(response => {
            this.setState({
                tasks: response.data.data
            });
            console.log(response.data.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    taskRenderer(task, index) {
        return (
            <div className="card task" key={index}>
                <div className="card-body">
                    <h4 className="card-title">{task.name}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Prioridade: {task.priority}</h6>
                    <p className="card-text">{task.description}</p>
                </div>
            </div>
        );
    }

    render() {
        const { tasks } = this.state;
        return (
            <div className="col-md-10 offset-md-1 col-sm-12 col-xs-12">
                <div className="card card-container">
                    <h2>Tarefas</h2>
                    

                    <RLDD
                        items={tasks}
                        itemRenderer={this.taskRenderer}
                        onChange={this.handleRLDDChange}
                    />  
                            
                </div>
            </div>
        )
    }
}