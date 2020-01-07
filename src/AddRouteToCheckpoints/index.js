import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './../App.css'
import $ from "jquery";
import { Fetch } from 'react-data-fetching'
const uniqid = require('uniqid');

const axios = require('axios');


export default class AddRouteToCheckpoints extends React.Component {

	constructor(props) {

		super(props);

		this.routeRef = React.createRef();
		this.checkpointRef = React.createRef();
		this.checkpointRef1 = React.createRef();
		axios.get('api/oBackEnd/webresources/generic', {
			params: {
				ID: 12345
			}
		}).then(function (response) {

		}
		)

		this.state = {
			brand: 'test',
			routes: [],
			checkpoint: [],
			selected: '-1'
		};
	}

	componentDidMount() {

	}

	saveData(e) {

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "api/oBackEnd/webresources/details",
			"method": "PUT",
			"headers": {
				"Content-Type": "application/json",
				"cache-control": "no-cache",
				"Postman-Token": "1ce1ca17-d91f-40ad-836f-520d0e589b2e"
			},
			"processData": false,
			"data": "{\"checkpointid\" : " + this.checkpointRef.current.value + ",\"routeID\" :" + this.routeRef.current.value + "}"
		}

		$.ajax(settings).done(function (response) {
			alert('sends data forward=' + response)
		});



	}

	deleteData(e) {
	
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "api/oBackEnd/webresources/details",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json",
				"cache-control": "no-cache",
				"Postman-Token": "1ce1ca17-d91f-40ad-836f-520d0e589b2e"
			},
			"processData": false,
			"data": "{\"checkpointid\" : " + this.checkpointRef1.current.value + ",\"routeID\" :" + this.routeRef.current.value + "}"
		}

		$.ajax(settings).done(function (response) {
			alert('sends data delete=' + response)
		});



	}

	changeRoute(e) {

		this.setState({ selected: this.routeRef.current.value })


	}
	render() {



		return (
			<div>

				< div class="row" >
					<div class="col-sm-3">
						<h3> Modify page </h3>
						<h3> Select route </h3>
						<select class="browser-default custom-select" onChange={this.changeRoute.bind(this)} ref={this.routeRef}>
						<option selected>Select route</option>
							<Fetch
								loader={<p>loading </p>} // Replace this with your lovely handcrafted loader
								url="api/oBackEnd/webresources/generic"
								timeout={5000}
							>
								{({ data }) => data.map(route =>
									<option value={route.id}>{route.name}</option>

								)}
							</Fetch>

						</select>
					</div>
				</div >

				<h3>Add checkpoint</h3>
				<div class="row">
					<div class="col-sm-3">
						<select class="browser-default custom-select" ref={this.checkpointRef}>
							<option selected>Select checkpoint from route</option>

							<Fetch 
								key={uniqid()}
								loader={<p>loading</p>} // Replace this with your lovely handcrafted loader
								url="api/oBackEnd/webresources/checkpoint"
								timeout={5000}
							>

								{
									({ data }) => data.map(checkpoint =>
										<option value={checkpoint.id}>{checkpoint.name} </option>

									)

								}
							</Fetch>
						</select>

						<Button 
							onClick={this.saveData.bind(this)}
							variant="primary" 
							type="submit"	
						>Add checkpoint to route</Button>
						<h3>Remove checkpoint from route</h3>
						<select 
							class="browser-default custom-select" 
							ref={this.checkpointRef1}
						>
							<option selected>Select checkpoint from route</option>
							<Fetch key={uniqid()}
								loader={<p>loading</p>}
								url={"api/oBackEnd/webresources/details/" + this.state.selected + "/"}
								timeout={5000}
							>
								{({ data }) => data.map(checkpoint =>
									<option value={checkpoint[1]}>{checkpoint[6]} </option>

								)}
							</Fetch>
						</select>
						<Button 
							onClick={this.deleteData.bind(this)} 
							variant="primary" 
							type="submit"
						>
						Delete checkpoint to route
					    </Button>
					</div>
				</div>
			</div>

		);
	}
}
