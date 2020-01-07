import React from 'react'
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './../App.css'
import { Fetch } from 'react-data-fetching'

class DeleteRoute extends React.Component {

	constructor(props) {
		super(props);

		this.textInput = React.createRef();
		this.deleteUusi = React.createRef();
		this.city1 = React.createRef();
		this.map2 = React.createRef();

		this.state = {
			value: null,
			routes: [],
			maps1: [],
			cities: []
		};
		this.getCities();
		this.filterRoutesMap();

	}

	componentDidMount() {
	}

	getMaps() {
		var settings = {
			"crossDomain": true,
			"url": "api/oBackEnd/webresources/generic/Maps",
			"method": "GET",
			"headers": {
				"Content-Type": "application/json",
				"Accept": "*/*"
			}
		}

		var t = this;

		$.ajax(settings).done(function (response) {

			let maps = [];
			response.map(term => maps.push(<option value={term} key="1" >{term}</option>))
			t.setState({ maps1: maps });

		});
	}

	getCities() {
		var settings = {
			"crossDomain": true,
			"url": "api/oBackEnd/webresources/generic/cities",
			"method": "GET",
			"headers": {
				"Content-Type": "application/json",
				"Accept": "*/*"
			}
		}

		var t = this;

		$.ajax(settings).done(function (response) {
			let citiesName = [];
			response.map(term => citiesName.push(<option value={term} key="1" >{term}</option>))
			t.setState({ cities: citiesName });
		});

	}
	filterRoutesMap(e) {
		alert("filled")
		var settings = {
			"crossDomain": true,
			"url": "api/oBackEnd/webresources/generic",
			"method": "GET",
			"headers": {
				"Content-Type": "application/json",
				"Accept": "*/*"
			}
		}

		var t = this;

		$.ajax(settings).done(function (response) {
/*			alert('jeejee3=' + response)

			let result = response.filter(route => route.city === t.city1.current.value);*/
			let routesArray = [<option value="" selected disabled hidden>Select route</option>];
			response.filter(route => route.city === t.city1.current.value).map(route => {
			
					routesArray.push(<option value={route.id} key="1" >{route.name}</option>)
	
				return 1;
			}

			)
			t.setState({ routes: routesArray });
		});



	}

	filterRoutesCity(e) {
		alert("poistetaan3=")
		this.setState({ routes: [] });
		var settings = {
			"crossDomain": true,
			"url": "api/oBackEnd/webresources/generic",
			"method": "GET",
			"headers": {
				"Content-Type": "application/json",
				"Accept": "*/*"
			}
		}

		var t = this;

		$.ajax(settings).done(function (response) {
			let result = response.filter(route => route.city === t.city1.current.value);
			let routesArray = [<option value="" selected disabled hidden>Select map</option>];
			let check = [];

			result.map(route => {
				if (check.indexOf(route.map) < 0)
					routesArray.push(<option value={route.map} key="1" >{route.map}</option>)
				check.push(route.map)
				return 1;
			}

			)
			t.setState({ maps1: routesArray });
		});
	}


	deleteRoute1() {

	
		var data = JSON.stringify({ "id": this.deleteUusi.current.value});
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				alert("Route deleted" + this.responseText);
			}
		});

		xhr.open("DELETE", "api/oBackEnd/webresources/generic");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(data);

	}
	render() {

		return (
			<div class="row">

				<div class="col-sm-4">
				
				</div>

				<div class="col-sm-4">

					<p>Filter Route by </p>

					<select onChange={this.filterRoutesCity.bind(this)} ref={this.city1} class="browser-default custom-select">
						<option value="" selected disabled hidden>Select City</option>
						<Fetch
							loader={<p>lataa tietoja</p>} // Replace this with your lovely handcrafted loader
							url="api/oBackEnd/webresources/generic/cities"
							timeout={5000}
						>
							{({ data }) => Object.values(data).map(route =>
								<option value={route}>{route}</option>

							)}
						</Fetch>
					</select>

					<select 
					ref={this.map2} 
					onChange={this.filterRoutesMap.bind(this)} 
					class="browser-default custom-select">
						<option value="" selected disabled hidden>Select Map</option>
						<Fetch
							loader={<p>lataa tietoja</p>} // Replace this with your lovely handcrafted loader
							url="api/oBackEnd/webresources/generic/Maps"
							timeout={5000}
						>
							{({ data }) => Object.values(data).map(route =>
								<option value={route}>{route}</option>

							)}
						</Fetch>
					</select>

					<select 
					class="browser-default custom-select" 
					ref={this.deleteUusi} >
						<option value="" selected disabled hidden>Route</option>
						{this.state.routes}

					</select>

					<Button 
						variant="danger" 
						onClick={this.deleteRoute1.bind(this)} 
						type="submit">
						Delete route
  	 				 </Button>

			

				</div>

			</div>


		)
	}
}
export default DeleteRoute;
