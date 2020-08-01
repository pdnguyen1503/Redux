import React, { Component } from 'react';
import '../App.css'
import { connect } from 'react-redux'
import * as actions from '../actions/index'

class TaskSearchControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    };
    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        name="keyword"
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                        value={this.keyword}
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
                        <button
                            id="width-30"
                            className="btn btn-primary"
                            type="button"
                            onClick={this.onSearch}
                        >
                            <span className="fa fa-search mr-5"></span>
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => { // ap se co prop ontogleForms
            dispatch(actions.searchTask(keyword))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskSearchControl);