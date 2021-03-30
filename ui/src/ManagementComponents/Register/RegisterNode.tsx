import React, { Component } from 'react';
import Select from 'react-select';
import {
	sensorListElem,
	sensorOptionsElem,
	sinkListElem,
	sinkOptionsElem,
	locationElem,
} from '../../ElemInterface/ElementsInterface';
import { NODE_URL, SINK_URL, SENSOR_URL } from '../../defineUrl';
import LarLngPicker from '../LatLngPicker';
// react-select : https://github.com/JedWatson/react-select

interface RegisterNodeState {
	sensorList: Array<sensorListElem>;
	sinkList: Array<sinkListElem>;

	node_name: string;
	kind: string;
	location: locationElem;
	sink_id: number;
	sensors: Array<sensorOptionsElem>;
	nameValid: boolean;
	kindValid: boolean;
	sensorValid: boolean;
	sinkValid: boolean;
}

interface nodeOptionsElem {
	label: string;
	value: string;
}

/*
RegisterNode
- Show modal to register node
*/

class RegisterNode extends Component<{}, RegisterNodeState> {
	state: RegisterNodeState = {
		sensorList: [],
		sinkList: [],

		node_name: '',
		kind: '',
		location: {
			lng: 0,
			lat: 0,
		},
		sink_id: 0,
		sensors: [],

		nameValid: false,
		kindValid: false,
		sensorValid: false,
		sinkValid: false,
	};
	componentDidMount() {
		this.getsensorList();
		this.getsinkList();
	}

	// Get sensor list from backend
	getsensorList() {
		var url = SENSOR_URL;

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				this.setState({ sensorList: data });
			})
			.catch((error) => console.error('Error:', error));
	}

	// Get sink list from backend
	getsinkList() {
		var url = SINK_URL;

		fetch(url)
			.then((res) => res.json())
			.then((data) => this.setState({ sinkList: data }))
			.catch((error) => console.error('Error:', error));
	}

	// Handle node name change by typing
	handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// name valid check : user should enter node name
		if (e.target.value.length > 0) {
			this.setState({
				node_name: e.target.value,
				nameValid: true,
			});
		} else {
			this.setState({
				node_name: e.target.value,
				nameValid: false,
			});
		}
	};

	handleKindChange = (nodeKind: any) => {
		if (nodeKind !== null) {
			this.setState({
				kind: nodeKind.value,
				kindValid: true,
			});
		} else {
			this.setState({
				kind: nodeKind.value,
				kindValid: false,
			});
		}
	}

	// Handle LarLng change by pick lat, lng at map
	handleLarLngChange = (location: locationElem) => {
		this.setState({
			location,
		});
	};

	// Handle selected sensor change by selecting sensors
	handleSensorsChange = (sensors: any) => {
		// sensor valid check : user should select more than a sensor
		if (sensors !== null || sensors !== []) {
			this.setState({
				sensors,
				sensorValid: true,
			});
		} else {
			this.setState({
				sensors,
				sensorValid: false,
			});
		}
	};

	// Handle selected sink change by selecting sink
	handleSinkChange = (sink: any) => {
		// sink valid check : user should select sink
		if (sink !== null) {
			this.setState({
				sink_id: sink.id,
				sinkValid: true,
			});
		} else {
			this.setState({
				sink_id: sink.id,
				sinkValid: false,
			});
		}
	};

	// Handle submit button click event
	handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		var url = NODE_URL;
		var data = this.state;
		var sensor_id = data.sensors.map((val: sensorOptionsElem) => {
			return { id: val.id };
		});
		var name = this.state.kind + '-' + this.state.node_name;

		// Valid check (unvalid -> alert)
		if (!this.state.nameValid) {
			alert('Please enter node name.');
			return;
		}
		if (!this.state.kindValid) {
			alert('Please select more than a node kind.');
			return;
		}
		if (!this.state.sensorValid) {
			alert('Please select more than a sensor.');
			return;
		}
		if (!this.state.sinkValid) {
			alert('Please enter sink.');
			return;
		}

		// Check whether user really want to submit
		var submitValid: boolean;
		submitValid = window.confirm('Are you sure to register this node?');
		if (!submitValid) {
			return;
		}

		console.log(
			JSON.stringify({
				name: name,
				lat: data.location.lat,
				lng: data.location.lng,
				sensors: sensor_id,
			})
		);

		fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
				name: name,
				lat: data.location.lat,
				lng: data.location.lng,
				sink_id: data.sink_id,
				sensors: sensor_id,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((response) => console.log('Success:', JSON.stringify(response)))
			.catch((error) => console.error('Error:', error))
			.then(() => window.location.reload(false)); // nodeList will change so reload for reflecting change
	};

	render() {
		let sensorOptions: Array<sensorOptionsElem>;
		sensorOptions = this.state.sensorList.map((val: sensorListElem) => {
			return {
				label: val.name.split('-')[1],
				value: val.name.split('-')[1],
				id: val.id,
				sensor_values: val.sensor_values,
			};
		});
		let sinkOptions: Array<sinkOptionsElem>;
		sinkOptions = this.state.sinkList.map((val: sinkListElem) => {
			return { label: val.name, value: val.name, id: val.id };
		});

		let nodeOptions: Array<nodeOptionsElem> = [
			{ label: 'streetlemp', value: 'streetlemp'}, 
			{ label: 'arbor', value: 'arbor' }, 
			{ label: 'trashcan', value: 'trashcan' }, 
		];
		return (
			<>
				<div
					className="modal fade"
					id="register-node-modal"
					role="dialog"
					aria-labelledby="register-node-modal"
				>
					<div className="modal-dialog  modal-lg" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title" id="register-node-modal">
									Register node
								</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label>Node name</label>
										<input
											type="text"
											className="form-control"
											name="node_name"
											placeholder="name"
											value={this.state.node_name}
											onChange={this.handleNameChange}
										/>
									</div>
									<div>
										<label>location</label>
										<LarLngPicker
											handleLarLngChange={this.handleLarLngChange}
										/>
									</div>
									<div className="form-group">
										<label>Select Node</label>
										<Select
											options={nodeOptions}
											name="action"
											classNamePrefix="select"
											onChange={this.handleKindChange}
										/>
									</div>
									<div className="form-group">
										<label>Select sensors</label>
										<Select
											isMulti
											className="basic-multi-select"
											name="sensors"
											options={sensorOptions}
											classNamePrefix="select"
											value={this.state.sensors}
											onChange={this.handleSensorsChange}
										/>
									</div>
									<div className="form-group">
										<label>Select sink</label>
										<Select
											className="basic-select"
											name="sink"
											options={sinkOptions}
											classNamePrefix="select"
											onChange={this.handleSinkChange}
										/>
									</div>
									<div className="modal-footer">
										<button
											type="submit"
											className="btn btn-success my-2 my-sm-0" 
											onClick={this.handleSubmit}
											style={{ background: 'light' }}
										>
											Submit
										</button>
										<button
											type="reset"
											className="btn btn-default"
											data-dismiss="modal"
										>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default RegisterNode;

/*

import React, { Component } from 'react';
import Select from 'react-select';
import {
	sensorListElem,
	sensorOptionsElem,
	sinkListElem,
	sinkOptionsElem,
	locationElem,
} from '../../ElemInterface/ElementsInterface';
import { NODE_URL, SINK_URL, SENSOR_URL } from '../../defineUrl';
import LarLngPicker from '../LatLngPicker';
// react-select : https://github.com/JedWatson/react-select

interface RegisterNodeState {
	sensorList: Array<sensorListElem>;
	sinkList: Array<sinkListElem>;

	node_name: string;
	kind: string;
	location: locationElem;
	sink_id: number;
	sensors: Array<sensorOptionsElem>;
	streetlampsensors: Array<sensorOptionsElem>;
	trashcansensors: Array<sensorOptionsElem>;
	treesensors: Array<sensorOptionsElem>;
	nameValid: boolean;
	kindValid: boolean;
	sensorValid: boolean;
	sinkValid: boolean;
}

interface nodeOptionsElem {
	label: string;
	value: string;
}

/*
RegisterNode
- Show modal to register node


class RegisterNode extends Component<{}, RegisterNodeState> {
	state: RegisterNodeState = {
		sensorList: [],
		sinkList: [],

		node_name: '',
		kind: '',
		location: {
			lng: 0,
			lat: 0,
		},
		sink_id: 0,
		sensors: [],
		streetlampsensors: [],
		trashcansensors: [],
		treesensors: [],

		nameValid: false,
		kindValid: false,
		sensorValid: false,
		sinkValid: false,
	};
	componentDidMount() {
		this.getsensorList();
		this.getsinkList();
		//this.getsensorOption();
	}

	// Get sensor list from backend
	getsensorList() {
		var url = SENSOR_URL;

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				this.setState({ sensorList: data });
			})
			.catch((error) => console.error('Error:', error));
	}

	// Get sink list from backend
	getsinkList() {
		var url = SINK_URL;

		fetch(url)
			.then((res) => res.json())
			.then((data) => this.setState({ sinkList: data }))
			.catch((error) => console.error('Error:', error));
	}

	getsensorOption() {
		let sensorOptions: Array<sensorOptionsElem>;
		sensorOptions = this.state.sensorList.map((val: sensorListElem) => {
			return {
				label: val.name,
				value: val.name,
				id: val.id,
				sensor_values: val.sensor_values,
			};
		});

		sensorOptions.map((val: sensorOptionsElem) => {
			let name = val.label.split('-')[0]
			if (name === 'ultrafine dust' || name === 'fine dust' || name === 'temperature' || name === 'humidity' || name === 'infrared' || name === 'illuminance' ) {
				this.setState({
					streetlampsensors: [...this.state.streetlampsensors, val],
				})
			}
			if (name === 'ultrasound') {
				this.setState({
					trashcansensors: [...this.state.trashcansensors, val],
				})
			}
			if (name === 'soil moisture') {
				this.setState({
					treesensors: [...this.state.treesensors, val],
				})
			}
		});
		console.log('streelamp: ' + this.state.streetlampsensors[0]);
		console.log('trashcan: ' + this.state.trashcansensors[0]);
		console.log('tree: ' + this.state.treesensors[0]);
	}

	// Handle node name change by typing
	handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// name valid check : user should enter node name
		if (e.target.value.length > 0) {
			this.setState({
				node_name: e.target.value,
				nameValid: true,
			});
		} else {
			this.setState({
				node_name: e.target.value,
				nameValid: false,
			});
		}
		console.log('name' + this.state.node_name);
	};

	handleKindChange = (nodeKind: any) => {
		let sensorOptions: Array<sensorOptionsElem>;
		sensorOptions = this.state.sensorList.map((val: sensorListElem) => {
			return {
				label: val.name,
				value: val.name,
				id: val.id,
				sensor_values: val.sensor_values,
			};
		});

		let streetlamp : Array<sensorOptionsElem> = [];
		let trash: Array<sensorOptionsElem> = [];
		let tree: Array<sensorOptionsElem> = [];

		sensorOptions.map((val: sensorOptionsElem) => {
			let name = val.label.split('-')[0]
			if (name === 'ultrafine dust' || name === 'fine dust' || name === 'temperature' || name === 'humidity' || name === 'infrared' || name === 'illuminance' ) {
				streetlamp.push(val);
			}
			if (name === 'ultrasound') {
				trash.push(val);
			}
			if (name === 'soil moisture') {
				tree.push(val);
			}
		});

		this.setState({
			streetlampsensors: streetlamp,
			trashcansensors: trash,
			treesensors: tree,

		})
		console.log('streelamp: ' + this.state.streetlampsensors[0]);
		console.log('trashcan: ' + this.state.trashcansensors[0]);
		console.log('tree: ' + this.state.treesensors[0]);

		if (nodeKind !== null) {
			this.setState({
				kind: nodeKind.value,
				kindValid: true,
			});
		} else {
			this.setState({
				kind: nodeKind.value,
				kindValid: false,
			});
		}
		console.log(this.state.kind);

		//console.log('selectedSensorlist: ' + this.state.sensors[0]);
	}

	// Handle LarLng change by pick lat, lng at map
	handleLarLngChange = (location: locationElem) => {
		this.setState({
			location,
		});
	};

	// Handle selected sensor change by selecting sensors
	handleSensorsChange = (sensors: any) => {
		// sensor valid check : user should select more than a sensor
		if (sensors !== null || sensors !== []) {
			if (this.state.kind === 'streetlamp'){
				this.setState({
					sensors: this.state.streetlampsensors,
					sensorValid: true,
				});
			}
			else if (this.state.kind === 'trashcan'){
				this.setState({
					sensors: this.state.trashcansensors,
					sensorValid: true,
				});
			}
			else if (this.state.kind === 'arbor') {
				this.setState({
					sensors: this.state.treesensors,
					sensorValid: false,
				});
			}
		}
	};

	// Handle selected sink change by selecting sink
	handleSinkChange = (sink: any) => {
		// sink valid check : user should select sink
		if (sink !== null) {
			this.setState({
				sink_id: sink.id,
				sinkValid: true,
			});
		} else {
			this.setState({
				sink_id: sink.id,
				sinkValid: false,
			});
		}
	};

	// Handle submit button click event
	handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		var url = NODE_URL;
		var data = this.state;
		var name = this.state.kind + '-' + this.state.node_name;


		if (data.kind === 'streetlemp'){
			var sensor_id = data.streetlampsensors.map((val: sensorOptionsElem) => {
				return { id: val.id };
			});
		}
		else if (data.kind === 'trashcan'){
			var sensor_id = data.trashcansensors.map((val: sensorOptionsElem) => {
				return { id: val.id };
			});
		}
		else {
			var sensor_id = data.treesensors.map((val: sensorOptionsElem) => {
				return { id: val.id };
			});
		}

		console.log(sensor_id);
		//console.log('selectedSensorlist: ' + this.state.sensors[0]);

		// Valid check (unvalid -> alert)
		if (!this.state.nameValid) {
			alert('Please enter node name.');
			return;
		}
		if (!this.state.kindValid) {
			alert('Please select more than a node kind.');
			return;
		}
		//if (!this.state.sensorValid) {
		//	alert('Please select more than a sensor.');
		//	return;
		//}
		if (!this.state.sinkValid) {
			alert('Please enter sink.');
			return;
		}

		// Check whether user really want to submit
		var submitValid: boolean;
		submitValid = window.confirm('Are you sure to register this node?');
		if (!submitValid) {
			return;
		}

		console.log(
			JSON.stringify({
				name: name,
				lat: data.location.lat,
				lng: data.location.lng,
				sensors: sensor_id,
			})
		);

		fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
				name: name,
				lat: data.location.lat,
				lng: data.location.lng,
				sink_id: data.sink_id,
				sensors: sensor_id,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((response) => console.log('Success:', JSON.stringify(response)))
			.catch((error) => console.error('Error:', error))
			.then(() => window.location.reload(false)); // nodeList will change so reload for reflecting change
	};

	render() {
		let sensorOptions: Array<sensorOptionsElem>;
		sensorOptions = this.state.sensorList.map((val: sensorListElem) => {
			return {
				label: val.name,
				value: val.name,
				id: val.id,
				sensor_values: val.sensor_values,
			};
		});
		let sinkOptions: Array<sinkOptionsElem>;
		sinkOptions = this.state.sinkList.map((val: sinkListElem) => {
			return { label: val.name, value: val.name, id: val.id };
		});

		let nodeOptions: Array<nodeOptionsElem> = [
			{ label: 'streetlemp', value: 'streetlemp'}, 
			{ label: 'arbor', value: 'arbor' }, 
			{ label: 'trashcan', value: 'trashcan' }, 
		];
		return (
			<>
				<div
					className="modal fade"
					id="register-node-modal"
					role="dialog"
					aria-labelledby="register-node-modal"
				>
					<div className="modal-dialog  modal-lg" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title" id="register-node-modal">
									Register node
								</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label>Node name</label>
										<input
											type="text"
											className="form-control"
											name="node_name"
											placeholder="name"
											value={this.state.node_name}
											onChange={this.handleNameChange}
										/>
									</div>
									<div>
										<label>location</label>
										<LarLngPicker
											handleLarLngChange={this.handleLarLngChange}
										/>
									</div>
									<div className="form-group">
										<label>Select Node</label>
										<Select
											options={nodeOptions}
											name="action"
											classNamePrefix="select"
											onChange={this.handleKindChange}
										/>
									</div>
									{/*
									<div className="form-group">
									//	<label>Select sensors</label>
										<Select
											isMulti
											className="basic-multi-select"
											name="sensors"
											options={sensorOptions}
											classNamePrefix="select"
											value={this.state.sensors}
											onChange={this.handleSensorsChange}
										/>
									//</div>}
									<div className="form-group">
										<label>Select sink</label>
										<Select
											className="basic-select"
											name="sink"
											options={sinkOptions}
											classNamePrefix="select"
											onChange={this.handleSinkChange}
										/>
									</div>
									<div className="modal-footer">
										<button
											type="submit"
											className="btn btn-success my-2 my-sm-0" 
											onClick={this.handleSubmit}
											style={{ background: 'light' }}
										>
											Submit
										</button>
										<button
											type="reset"
											className="btn btn-default"
											data-dismiss="modal"
										>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default RegisterNode;
*/
