import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import './App.css';
import _ from 'lodash'
import demo from "./trainning/demo"

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			tasks: [],// id: unique, name, status,
			isDisPlayForm:  false, // default is Hiden
			taskEditing : null,
			filter: {
				name: '',
				status: -1,
			},
			keyword: '',
			sortBy: 'name',
			sortValue: 1

		}
	}
	//lifeCicle duoc goi khi component cua ban gans vaof, khi F5 -> goi ham nay-> goi duy nhat 1 lan
	componentWillMount(){
		if(localStorage && localStorage.getItem('tasks')){ // kiem tra khac null moi lai
			var tasks = JSON.parse(localStorage.getItem('tasks'));
			this.setState({
				tasks: tasks
			})
		}
	}
	onToggleForm = () => { // Them task
		if(this.state.isDisPlayForm && this.state.taskEditing !==null){
			this.setState({
				isDisPlayForm : true,
				taskEditing : null
			})	
		}else{
			this.setState({
				isDisPlayForm : !this.state.isDisPlayForm,
				taskEditing : null
			})	
		}
	}
	onCloseForm = ()=>{
		this.setState({
			isDisPlayForm : false,
			
		})
	}
	onShowForm = ()=>{
		this.setState({
			isDisPlayForm : true
		})
	}
	s4(){
		return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1)
	}
	generateID(){
		return this.s4()+this.s4()+'-'+this.s4()+ '-' +this.s4() + '-' +this.s4()+this.s4()+'-'+this.s4()+ '-' +this.s4();
	};

	onUpdateStatus = (id)=>{
		var {tasks} = this.state;
		var index = this.findIndex(id);
		if(index !== -1){
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks: tasks
			});
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
		
	};
	onDeleteStatus = (id)=>{
		var {tasks} = this.state;
		var index = this.findIndex(id);
		if(index !== -1){
			tasks.splice(index,1);
			this.setState({
				tasks: tasks
			});
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
		this.onCloseForm();
	}
	onUpdate = (id)=>{
		var {tasks} = this.state;
		// var index = this.findIndex(id);
		var index = _.findIndex(tasks, function(task) { return task.id === id; });
		var taskEditing = tasks[index];
		console.log(tasks[index])
		this.setState({
			taskEditing: taskEditing,
		});
		this.onShowForm();
	}
	findIndex = (id)=>{
		var {tasks}=this.state;
		// console.log(tasks)
		var result = -1;
		tasks.forEach((task, index)=>{
			if(task.id === id){
				result =  index;
			}
		})
		return result;
		
	}
	handleSubmit = (data) =>{
		var {tasks} = this.state;
		if(data.id === ''){
			data.id = this.generateID();
			tasks.push(data);// dua push vao data
		}else{
			var index = this.findIndex(data.id);
			tasks[index] = data;
		}
		this.setState({
			tasks: tasks,
			taskEditing: null
		});// dua vao state roi -> dua vao localStorage
		localStorage.setItem('tasks', JSON.stringify(tasks));
		console.log( tasks)
	}
	onFilter = (filterName, filterStatus) =>{
		filterStatus = parseInt(filterStatus,10);
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: filterStatus
			}
		})

	}
	onSearch = (keyword)=>{
		this.setState({
			keyword: keyword
		})
	}
	onSort = (sortBy, sortValue)=>{
		this.setState({
			sortBy: sortBy,
			sortValue: sortValue
		})

	}
    render() {
		var {
			tasks,
			isDisPlayForm,
			taskEditing,
			filter,
			keyword,
			sortBy,
			sortValue
			} = this.state; // var tasks = this.state.tasks
		if(filter){
			if(filter.name){
				tasks = tasks.filter((task)=>{
					return task.name.toLowerCase().indexOf(filter.name) !== -1
				})
			}
			 //(A) : !==null,!==undefine, !==-1
			tasks = tasks.filter((task)=>{
				if(filter.status === -1){
					return task;
				}else{
					return task.status === (filter.status===1 ? true : false) 
				}
				
			})
		}
		if(keyword){
			tasks = tasks.filter((task)=>{
				return task.name.toLowerCase().indexOf(keyword) !== -1;
			});
		}
		var elmTaskForm = isDisPlayForm // truyen 1 cai props moi truyen du lieu ra ngoai dc
			? <TaskForm 
				onSubmit={this.handleSubmit} 
				onCloseForm= {this.onCloseForm} 
				task ={taskEditing}
			  ></TaskForm> // nhu nay-> staskForm da co props onSubmit
			: '';
		if(sortBy === 'name'){
			tasks.sort((a, b)=>{
				if(a.name > b.name) return sortValue;
				else if(a.name < b.name) return sortValue;
				else return sortValue;
			})
		}else{
			tasks.sort((a, b)=>{
				if(a.status > b.status) return sortValue;
				else if(a.status < b.status) return sortValue;
				else return sortValue;
			})

		}
		return(
			<div className="container">
					<div className="text-center">
						<h1>Quản Lý Công Việc</h1>
						<hr/>
					</div>
					<div className="row">
						<div className={isDisPlayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
							{elmTaskForm}
						</div>
						<div className={isDisPlayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
							<button 
								type="button" 
								className="btn btn-primary"
								onClick = { this.onToggleForm }
								>
								<span className="fa fa-plus mr-5"></span>Thêm Công Việc
							</button>
							
							<TaskControl
								onSearchControl ={this.onSearch}
								onSortTaskControl = {this.onSort}
								sortBy={sortBy}
								sortValue={sortValue}
							/>
							<div className="row mt-15">
								<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<TaskList 
										tasks = {tasks} 
										onUpdateStatusTaskList={this.onUpdateStatus}
										onDeleteTaskList = {this.onDeleteStatus}
										onUpdateTaskList = {this.onUpdate}
										onFilterTaskList = {this.onFilter}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
}

export default App;