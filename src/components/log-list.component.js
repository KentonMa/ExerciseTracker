import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditLog from './edit-log.component';
import AddLog from './add-log.component';
import { getLogs, deleteLog } from '../actions/logActions';
import PropTypes from 'prop-types';

const Log = props => (
    <ListGroupItem>
        <p>{ props.log.description }</p>
        <p className="log-date">{ props.log.date }</p>
        <EditLog
            className="position-absolute my-auto log-edit-btn"
            log={props.log} />
        <Button 
            color="danger" 
            className="position-absolute my-auto log-delete-btn"
            onClick={() => props.onDeleteClick(props.log._id)}>
            <FontAwesomeIcon icon="trash-alt" />
        </Button>
    </ListGroupItem>
)

class LogList extends Component {
    componentDidMount() {
        this.props.getLogs();
    }

    logList() {
        const { logs } = this.props.log;

        return logs.map(log => {
            return <Log log={log} key={log._id} onDeleteClick={this.props.deleteLog} />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="mt-3 mb-2 clearfix">
                    <h3 className="float-left">Logs</h3>
                    <AddLog className="float-right" />
                </div>
                <ListGroup>
                { this.logList() }
                </ListGroup>
            </div>
        );
    }
}

LogList.propType = {
    getLogs: PropTypes.func.isRequired,
    deleteLog: PropTypes.func.isRequired,
    log: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    log: state.log
});

export default connect(
    mapStateToProps,
    { getLogs, deleteLog }
)(LogList);
