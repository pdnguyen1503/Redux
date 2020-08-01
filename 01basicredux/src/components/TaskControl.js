import React, { Component } from 'react';
import TaskSearchControl from './TaskSearchControl'
import TaskSortControl from './TaskSortControl'
class TaskControl extends Component {

    render(){
        return (
			<div className="row mt-15">
				<TaskSearchControl
					onSearchSearch = {this.props.onSearchControl}
				/>
				<TaskSortControl
					onSortTaskSortControl = {this.props.onSortTaskControl}
					sortBy ={this.props.sortBy}
					sortValue ={this.props.sortValue}
				/>
			</div>
			
		);
    }
}

export default TaskControl;