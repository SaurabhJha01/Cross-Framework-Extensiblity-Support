import React from 'react';
import ReactDOM from 'react-dom';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import * as olProj from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import PropTypes from 'prop-types';
import reactToWebComponent from "react-to-webcomponent";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { weboutput: '' };
    this.buttonRef = React.createRef();
    this.addVectorLayer = this.addVectorLayer.bind(this);
  }

  componentDidMount() {
   /**
     * Whenever we want to pass input to web component, getitng the dom of web component and attaching the input directly is the
     * perfect solution. It will cater all types of inputs from strings to objects and would not require JSON.stringify and parse to
     * pass object inputs
     */
    this.buttonRef.current.obj = {
      vectorSource:  this.getVectorSource(),
      map: this.props.objInput.map,
      store: this.props.objInput.store
    };
    this.buttonRef.current.addEventListener('clickhandler', ($event) => {
      /**
       *Scenario when vector source is passed as as payload to angular web component. Let angulat web component creates the layer from it
       * and pass it back to react web component to add it to map
       */   
      this.props.objInput.map.addLayer($event.detail.layer);


      this.state.weboutput = $event.detail.key1;
      this.setState({});

      const svcInstanceFromWebComponent = $event.detail.svcInstance;
      /**
       * Usage of singleton service
       * But we can't use methods of service as we can pass data only after stringifying and receive via JSON.parse which removes the methods
       * and only retains the data  members */
      svcInstanceFromWebComponent.framework = "Change Angular Web component SVC memeber from React extension";
      alert("Angular host value passed to React extension :  " + $event.detail.key1); 
    }
    );

    this.buttonRef.current.addEventListener('storeAction1handler', ($event) => {     
         alert("Store state read inside React extension as part of store.select paradigm : " + $event.detail.vectorLayers.length);  
      }
      );
  }

  componentWillUnmount() {
    this.buttonRef.current.removeEventListener('clickhandler');
  }


  render() {
    const reactVersion = require('./package.json').dependencies['react'];
    const jsonInputToAngular = JSON.stringify({
      vectorSource:  this.getVectorSource()
    });


    return ([
      <h1>
        React Micro Frontend
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="30"></img>
      </h1>,
      <p>
        React Version: {reactVersion}
      </p>,
      <web-map  ref={this.buttonRef}></web-map>,
      <button onClick={this.addVectorLayer}> React Web Component Button(Add Vector Layer)</button>,
      <h1>{this.state.weboutput}</h1>

    ])
  }
 /**
  * Create vector source and layer from inside the react extension and add it t0 map
  */
  addVectorLayer() {
    const vectorSource = this.getVectorSource();
    const layer = new VectorLayer({
      source: vectorSource
    });
    this.props.objInput.map.addLayer(layer);
  }


  getVectorSource() {
    const feature1 = new Feature({
      geometry: new Point(olProj.fromLonLat([4.35247, 50.84673]))
    });
    const feature2 = new Feature({
      geometry: new Point(olProj.fromLonLat([9.35247, 55.84673]))
    });
    const feature3 = new Feature({
      geometry: new Point(olProj.fromLonLat([14.35247, 60.84673]))
    });
    const feature4 = new Feature({
      geometry: new Point(olProj.fromLonLat([4.35247, 55.84673]))
    });
    const feature5 = new Feature({
      geometry: new Point(olProj.fromLonLat([9.35247, 60.84673]))
    });
    const feature6 = new Feature({
      geometry: new Point(olProj.fromLonLat([14.35247, 65.84673]))
    });
    const feature7 = new Feature({
      geometry: new Point(olProj.fromLonLat([19.35247, 50.84673]))
    });
    const feature8 = new Feature({
      geometry: new Point(olProj.fromLonLat([24.35247, 55.84673]))
    });
    const feature9 = new Feature({
      geometry: new Point(olProj.fromLonLat([29.35247, 60.84673]))
    });

    const featuresList = [feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9];
    return new VectorSource({
      features: featuresList
    });
  }

}


/**
 * The inputs that can be passed to this React Web component
 */
App.propTypes = {
  objInput: PropTypes.any,
}

customElements.define('mfe4-element', reactToWebComponent(App, React, ReactDOM));