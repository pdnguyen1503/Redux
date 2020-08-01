import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/index'

class TaskSortControl extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)

    };
    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            By: sortBy,
            value: sortValue
        })
    }

    render() {
        console.log(this.props.sort)
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a
                                role="button"
                                href="!#"
                                className={
                                    (this.props.sort.By === 'name' && this.props.sort.value === 1)
                                        ? 'sort_selected'
                                        : ''
                                }
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a
                                role="button" href="!#"
                                className={
                                    (this.props.sort.By === 'name' && this.props.sort.value === -1)
                                        ? 'sort_selected'
                                        : ''
                                }
                            >
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li>
                            <a
                                role="button"
                                href="!#"
                                onClick={() => this.onClick('status', 1)}
                                className={
                                    (this.props.sort.By === 'status' && this.props.sort.value === 1)
                                        ? 'sort_selected'
                                        : ''
                                }
                            >Trạng Thái Kích Hoạt</a>
                        </li>
                        <li>
                            <a
                                role="button"
                                href="!#"
                                onClick={() => this.onClick('status', -1)}
                                className={
                                    (this.props.sort.By === 'status' && this.props.sort.value === -1)
                                        ? 'sort_selected'
                                        : ''
                                }
                            >
                                Trạng Thái Ẩn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sort: state.sort // lay tu action->index
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => { // sort.By sort.value
            dispatch(actions.sortTask(sort))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskSortControl);