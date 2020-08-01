import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state= {
            id: '',
            name: '',
            status: false,
        }
    };
    componentWillMount(){
        console.log('willmount')
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            })
            console.log(this.state)
        }
    };
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps')
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            })
        }else if(nextProps && nextProps.task === null){
            this.setState({
                id: '',
                name: '',
                status: false,
            })
        }
    };
    onChange= (events)=>{
        var target = events.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name] : value
        })
    }
    // click vao span-> truyen du lieu ra ngoai App
    onCloseForm1 = ()=>{
        this.props.onCloseForm(); // lay tu ngoai App.

    }
    handleSubmit = (event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        // submit xong thi close form 
        this.onClear();
        this.onCloseForm1();
    }
    onClear = ()=>{
        this.setState({
            name : '',
            status: false
        })
    }
    render() {
        var {id} = this.state
		return(
			<div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{id!=='' ? 'cập nhật công việc': 'Thêm Công Việc'}</h3>
                    <i 
                        className="fa fa-times-circle text-right"
                        aria-hidden="true"
                        onClick = {this.onCloseForm1}
                        >
                        
                    </i>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name"
                                value = {this.state.name}
                                onChange = {this.onChange}   
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                            className="form-control" 
                            required="required"
                            name = "status"
                            value = {this.state.status}
                            onChange = {this.onChange}    
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                            <button onClick={this.onClear} className="btn btn-danger">Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
                    
		)
	}
}

export default TaskForm;