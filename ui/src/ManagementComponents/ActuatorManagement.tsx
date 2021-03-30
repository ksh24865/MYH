import React, { Component } from 'react';
import RegisterActuator from './Register/RegisterActuator';
import ActuatorTable from './Table/ActuatorTable';

/*
SensorManagement
- Manage sensor table, register sensor
*/
class ActuatorManagement extends Component {
	render() {
		return (
			<>
				<div style={{ float: 'right' }}>
					<button
						type="button"
						className="btn btn-success my-2 my-sm-0" 
						data-toggle="modal"
						data-target="#register-actuator-modal"
						style={{ background: 'light' }}
					>
						register actuator
					</button>
					<RegisterActuator></RegisterActuator>
				</div>
				<div>
					<h3>Actuator</h3>
					<ActuatorTable></ActuatorTable>
				</div>
			</>
		);
	}
}

export default ActuatorManagement;
