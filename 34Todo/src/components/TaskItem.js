import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index'
class TaskItem extends Component {
    onUpdateStatusTask = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id) // dispatch (action.deleteIem)
        this.props.onCloseForm();
    }
    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task)
    }
    render() {
        var { task, index } = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        className={task.status === true ? 'label label-danger' : 'label label-success'}
                        onClick={this.onUpdateStatusTask}
                    >
                        {task.status === true ? 'Active' : 'Hiden'}
                    </span>
                </td>
                <td className="text-center">
                    <button
                        onClick={this.onEditTask}
                        type="button"
                        className="btn btn-warning"
                    >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}
const mapStateToProps = () => {
    return {};
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatusTaskList(id))
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm: () => { // ap se co prop onCloseForm
            dispatch(actions.closeForm())
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);