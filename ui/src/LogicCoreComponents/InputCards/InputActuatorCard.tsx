import { type } from 'jquery';
import React, { Component } from 'react';
import Select from 'react-select';
import { actuatorListElem, actuatorOptionsElem } from '../../ElemInterface/ElementsInterface';
import { control, logicElem } from '../../ElemInterface/LcElementsInterface';
import '../LogicCore.css';

interface InputActionCardProps {
	actuatorList: Array<actuatorListElem>;
	handleInputActionCardChange: (value: logicElem) => void;
}

interface InputActionCardState {
	elem: string;
	arg: {
		aid: number;
		values: Array<control>;
	};
}

/*
InputActionCard
- Get input of action element
*/
class InputActionCard extends Component<
	InputActionCardProps,
	InputActionCardState
> {
	state: InputActionCardState = {
		elem: 'actuator',
		arg: {
			   aid: 0, 
               values:[{ value: 0, sleep: 0 }], 
            },
	};

	// Handle action change (select alarm or email)
	handleActionChange = async (e: any) => {
		// Change this state and then..
		await this.setState({
			arg: { aid: e.id, values: this.state.arg.values },
		});
		console.log(e.id + '  this is actuator aid')
		this.props.handleInputActionCardChange(this.state);
	};

	handleControlChange = (idx: number) => async (e:any) => {
		const new_values_elem = this.state.arg.values.map(
			(valuesElem: control, sidx: number) => {
				if (idx !== sidx) return valuesElem;
				if (e.target.id === 'actuator_value') 
					return { ...valuesElem, value: parseInt(e.target.value) };
                return { ...valuesElem, sleep: parseInt(e.target.value) };
                
			}
		);
		
		await this.setState({
			arg: { 
				aid: this.state.arg.aid,
				values: new_values_elem	
			}
		});

		console.log(this.state.arg.values + 'InputActuatorCard');

		this.props.handleInputActionCardChange(this.state);
	};
	
	/*
	handleAddClick = async () => {
		await this.setState({
			arg: {
				aid: this.state.arg.aid,
				values: [...this.state.arg.values, {value: 0, sleep: 0}],
			},
		});
		this.props.handleInputActionCardChange(this.state);
	};

	handleRemoveClick = (idx: number) => async () => {
		await this.setState({
			arg: {
				aid: this.state.arg.aid,
				values: this.state.arg.values.filter(
					(s: any, sidx: number) => idx !== sidx
				),
			},
		});
		this.props.handleInputActionCardChange(this.state)
	};
	*/

	render() {		
		let actuatorOptios: Array<actuatorOptionsElem>;
		actuatorOptios = this.props.actuatorList.map((val: actuatorListElem) => {
			return {
				label: val.name,
				value: val.name,
				id: val.id,
			}
		})

		return (
			<div>
				<Select
					options={actuatorOptios}
					name="action"
					classNamePrefix="select"
					onChange={this.handleActionChange}         
				/>
				{/*
				<div className="col">
					<button
						type="button"
						className="btn float-right"
						style={{ background: 'pink' }}
						onClick={this.handleAddClick}
					>
						Add scope
					</button>
				</div>
				*/}
				{this.state.arg.values.map((Control: control, idx: number) => (
					<div className="input-group mb-2">
						<span>value</span>
						<input
							type="number"
							className="form-control"
							id="actuator_value"
							value={Control.value}
							placeholder="Enter "
							onChange={this.handleControlChange(idx)}
						/>
						<div className="col-1"></div>
						<span>sleep </span>
						<input
							type="number"
							className="form-control"
							id="actuator_sleep"
							value={Control.sleep}
							placeholder="Enter "
							onChange={this.handleControlChange(idx)}
						/>
						{/*
						<button
							className="btn btn-sm"
							type="button"
							id="button-addon2"
							onClick={this.handleRemoveClick(idx)}
						>
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								className="bi bi-trash-fill"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
								/>
							</svg>
						</button>
						*/}
					</div>
				))}		
				</div>						                                     								
		);
	}
}

export default InputActionCard;
