import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index'
class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state= {
            id: '',
            name: '',
            status: false
        }
    };
    componentWillMount(){
        if(this.props.itemEditing && this.props.itemEditing.id !== null){
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status,
            })
        }else{
            this.onClear();
        }
    };
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps: ', nextProps)
        if(nextProps && nextProps.itemEditing){
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status,
            })
        }else{
            this.onClear()
        }
    };
    onChange= (events)=>{
        var target = events.target;
        var name = target.name;
        var value = target.type === 'checkbox'? target.checked : target.value;
        this.setState({
            [name] : value
        })
    }
    // click vao span-> truyen du lieu ra ngoai App
    onCloseForm1 = ()=>{
        this.props.onCloseForm(); // lay tu store cua action closeFOm
    }
    handleSubmit = (event)=>{
        console.log("hanle:",this.state)
        event.preventDefault();
        // this.props.onSubmit(this.state);
        // submit xong thi close form 
        this.props.onSaveTask(this.state) // -> reducer
        this.onClear();
        this.onCloseForm1();
    }
    onClear = ()=>{
        this.setState({
            name : '',
            status: false
        });
    }
    render() {
        // var {id} = this.state
        console.log('thistatus dau tien',this.state)
        if(!this.props.isDisplayForm) return null;
		return(
			<div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{!this.state.id? 'Thêm Công Việc' : 'cập nhật công việc'}</h3>
                    <i 
                        className="fa fa-times-circle text-right"
                        aria-hidden="true"
                        onClick = {this.onCloseForm1}
                        >
                      huy  
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
                            <button type="button" onClick={this.onClear} className="btn btn-danger">Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
                    
		)
	}
}
const mapStateToProps = (state)=>{
    return {
        isDisplayForm : state.isDisplayForm, // co props la isDisplayForm
        itemEditing : state.itemEditing // tao itemEditing tu reducer->index
    }
};
const mapDispatchToProps = (dispatch, props)=>{
    return {
        onSaveTask : (task)=>{
            dispatch(actions.saveTask(task))
        },
		onCloseForm : ()=>{ // ap se co prop onCloseForm
			dispatch(actions.closeForm())
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);