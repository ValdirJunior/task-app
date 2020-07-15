import React, { Component } from "react";
import TaskDataService from "../services/task.service";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import RLDD from 'react-list-drag-and-drop/lib/RLDD';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const required = value => {
    if(!value) {
        return (
            // <div className="alert alert-danger" role="alert">
            //     Este campo é obrigatório!
            // </div>
            <div className="invalid-feedback">
                Este campo é obrigatório!
            </div>
        )
    }
};

export default class TasksList extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.handleRLDDChange = this.handleRLDDChange.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.saveTask = this.saveTask.bind(this);

        this.state = {
            name: "",
            description: "",
            priority: 0,
            tasks: [],
            priorities: [],
        }
    }

    componentDidMount() {
        this.getTasks()
    }

    handleRLDDChange(newTasks) {
        this.setState({
            tasks: newTasks,
        });

        newTasks.forEach(function(task, index){
            task.priority = index
        });

        console.log(newTasks);
        TaskDataService.updatePriority(newTasks).then(
            response => {
                this.getTasks();
                console.log(response);
            },
            error => {

                console.log(error.response.data);
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    message: resMessage,
                    loading: false,
                });
            }
        );
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        });
    }

    getTasks() {
        TaskDataService.get()
        .then(response => {
            
            var ps = [];
            response.data.data.forEach(function(task, index) {
                ps.push(index);
            });
            ps.push(ps.length)

            this.setState({
                tasks: response.data.data,
                priorities: ps,
            });
        })
        .catch(e => {
            console.log(e);
        })
    }
 
    saveTask(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        var data = {
            name: this.state.name,
            description: this.state.description,
            priority: this.state.priority,
        };

        console.log(data);

        TaskDataService.create(data).then(
            () => {
                this.getTasks();
                this.state.loading = false;
            },
            error => {

                console.log(error);
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    message: resMessage,
                    loading: false,
                });
            }
        );
    }

    taskRenderer(task, index) {
        task.priority = index;
        return (
            <li key={index} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{task.name}</h5>
                    <small>Prioridade {task.priority}</small>
                </div>
                <p className="mb-1">{task.description}</p>
            </li>

        );
    }

    render() {
        const { tasks, priorities } = this.state;
        return (
            <div className="col-md-10 offset-md-1 col-sm-12 col-xs-12" id="card-task">

                <Form
                    onSubmit={this.saveTask}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    <div className="form-row align-items-center">
                        <div className="col-sm-3 my-1">
                            <label className="sr-only" htmlFor="name">Tarefa</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Tarefa"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                validations={[required]}
                                required
                            ></Input>
                        </div>

                        <div className="col-sm-3 my-1">
                            <label className="sr-only" htmlFor="description">Descrição</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                placeholder="Descrição"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                validations={[required]}
                            >
                            </Input>
                        </div>

                        <div className="col-sm-3 my-1">
                            <label className="sr-only" htmlFor="priority">Prioridade</label>
                            <select 
                                className="form-control" 
                                id="priority"
                                name="priority"
                                onChange={this.onChangePriority}
                            >
                                {/* <option value="1">1</option>

                                <option value="2">2</option>

                                <option value="3">3</option> */}
                                {priorities &&
                                priorities.map((priority, index) => (
                                    <option key={index} value={priority}>{priority}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-auto my-1">
                            {/* <button type="submit" className="btn btn-primary">Incluir</button> */}
                            <button
                                    className="btn btn-primary"
                                    disabled={this.state.loading}
                                >
                                    <span>Incluir</span>
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                </button>
                        </div>
                    </div>
                </Form>
                    
                    <ul className="list-group list-group-flush">
                    <RLDD
                        items={tasks}
                        itemRenderer={this.taskRenderer}
                        onChange={this.handleRLDDChange}
                    />  
                    </ul>
            </div>
        )
    }
}