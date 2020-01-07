import React from 'react'



class Welcome extends React.Component {


  constructor(props) {
    super(props);


fetch('http://192.168.99.100/api/oBackEnd/webresources/generic'    , {method: "PUT"}).then(function(response) {
        alert("test=" +JSON.stringify(response));
});

    this.state = {
      value: null,
    };
  }

 render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Welcome;
