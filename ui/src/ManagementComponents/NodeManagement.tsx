import React, { Component } from 'react';
import RegisterNode from './Register/RegisterNode';
import NodeTable from './Table/NodeTable';
import {
	sinkListElem,
	nodeHealthCheckElem,
} from '../ElemInterface/ElementsInterface';
import { HEALTHCHECK_URL, SINK_URL } from '../defineUrl';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import NodeMap from './NodeMap';
import { clear } from 'console';

const client = new W3CWebSocket(HEALTHCHECK_URL);

interface NodeManagementState {
	sinkList: Array<sinkListElem>;
	nodeState: Array<nodeHealthCheckElem>;
	healthMap: Map<number, number>;
	batteryMap: Map<number, number>;

	showAllValid: boolean;
}
/*
NodeManagement
- Manage node table, register node
*/

class NodeManagement extends Component<{}, NodeManagementState> {
	state: NodeManagementState = {
		sinkList: [],
		nodeState: [],
		healthMap: new Map(),
		batteryMap: new Map(),

		showAllValid: true,
	};

	componentWillMount() {
		client.onopen = () => {
	 		console.log('WebSocket Client for Health Check Connected');
	 	};
	 	client.onmessage = (message: any) => {
			console.log(message);
	 		this.setState({
				 nodeState: JSON.parse(message.data),
			});
			this.getHealthStateMap();
			this.getBatteryStateMap();
		};
	}

	componentDidMount() {
		this.getsinkList();
	}

	// Get sink list from backend
	getsinkList() {
		var url = SINK_URL;

		fetch(url)
			.then((res) => res.json())
			.then((data) => this.setState({ sinkList: data }))
			.catch((error) => console.error('Error:', error));
	}

	getHealthStateMap() {
		let map = this.state.healthMap;
		this.state.nodeState.map((val: nodeHealthCheckElem) => {
			if(map.has(val.nid) === false) map.set(val.nid, val.state);
			if(map.get(val.nid) !== val.state) map.set(val.nid, val.state);
		})

		this.setState({
			healthMap: map,
		})
	}

	getBatteryStateMap() {
		let map = this.state.batteryMap;
		this.state.nodeState.map((val: nodeHealthCheckElem) => {
			if(map.has(val.nid) === false) map.set(val.nid, val.battery);
			if(map.get(val.nid) !== val.state) map.set(val.nid, val.battery);
		})

		this.setState({
			batteryMap: map,
		})
	}

	// node state fetch해오는 코드 없음 ????

	handleAllClick = () => {
		this.setState({
			showAllValid: true,
		});
	}
	handleMapClick = () => {
		this.setState({
			showAllValid: false,
		});
	}

	render() {
		return (
			<div>
				<div style={{ float: 'right' }}>
					<button
						type="button"
						className="btn btn-success my-2 my-sm-0"
						data-toggle="modal"
						data-target="#register-node-modal"
						style={{ background: 'light' }}
					>
						register node
					</button>
					<RegisterNode></RegisterNode>
				</div>
				<div>
					<h3>Node</h3>
					<hr />
					<div style={{ float: 'right' }}>
						<span style={{ color: 'gray' }}>● : don't know </span>
						<span style={{ color: '#32CD32' }}>● : stable </span>
						<span style={{ color: '#FACC2E' }}>● : unstable </span>
						<span style={{ color: 'red' }}>● : disconnect </span>
					</div>
					<span >Viewer type </span>
					<button
						type="button"
						className="btn btn-success my-2 my-sm-0"
						style={{ background: 'light' }}
						onClick={this.handleAllClick}
					>
						All
					</button>
					<span> </span>
					<button
						type="button"
						className="btn btn-success my-2 my-sm-0"
						style={{ background: 'light' }}
						onClick={this.handleMapClick}
					>
						Map
					</button>
					<hr/>
					{(this.state.showAllValid)?(
						<div>
						{this.state.sinkList.map((sink: sinkListElem, idx: number) => (
							<div>
								<span style={{ fontSize: '18pt', fontWeight: 500 }}>
									{(sink.name === ' Gwangnaru Hangang River' || sink.name === ' Ttukseom Hangang River' || sink.name === ' Jamwon Hangang River' || sink.name === ' Gangseo Hangang River') ? (
										sink.name.split(' ')[1]
									) : sink.name.split(' ')[0]
									}	
									
								</span>
								<button
									className="btn dropdown-toggle"
									type="button"
									data-toggle="collapse"
									data-target={'#sink' + sink.id.toString()}
									aria-controls={sink.id.toString()}
									style={{ color: 'black' }}
								></button>
								<div
									id={'sink' + sink.id.toString()}
									className="collapse"
								>
									<NodeTable
										sink_id={sink.id}                       // 해당 싱크의 노드들을 가져오기 위해 sink_id 받음
										healthState={this.state.healthMap}
										batteryState={this.state.batteryMap}
									></NodeTable>
								</div>
							</div>
						))}
					</div>
					):(
						<NodeMap 
						healthState={this.state.healthMap}
						batteryState={this.state.batteryMap}
					></NodeMap>
					)}	
				</div>
			</div>
		);
	};
};


export default NodeManagement;
