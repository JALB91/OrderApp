import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Slider,
  Switch,
  rgb,
  Image
} from 'react-native';
import Img from './components/Img/Img'

var convert = require('xml-js');

async function logResponse() {
  var myUrl = "https://www.lcpro.it/lcpro/appl/mybar_01/web_services/ws1.asmx";
  var requestType = "Prodotti";
  var actionType = "get_lista_" + requestType.toLowerCase();

  var myHeaders = new Headers();
  myHeaders.append('Host', 'www.lcpro.it');
  myHeaders.append('Content-Type', 'text/xml; charset=utf-8');
  myHeaders.append('SOAPAction', 'http://lcpro.it/' + actionType);
  
  var myBody = {
    "_declaration": {
      "_attributes": {
        "version": "1.0",
        "encoding": "utf-8"
      }
    },
    "soap:Envelope": {
      "_attributes": {
        "xmlns:xsi":  "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:xsd":  "http://www.w3.org/2001/XMLSchema",
        "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
      },
      "soap:Body": {
        [actionType]: {
          "_attributes": {
            "xmlns": "http://lcpro.it/"
          },
          "c_token": {
            "_text": "eT.dfaR34lkfdopiAswriozx:dsjhkj.\\39878\\deoiuoi"
          }
        }
      }
    }
  };

  var options = {ignoreComment: true, spaces: 4, compact: true};
  var xmlBody = convert.js2xml(myBody, options);

  myHeaders.append('Content-Length', xmlBody.length);
  
  try {
    var res = await fetch(myUrl, {
      method: 'POST',
      headers: myHeaders,
      body: xmlBody
    });

    var result = JSON.parse(convert.xml2json(res._bodyText, {compact: true, spaces: 4}));
    result = result["soap:Envelope"]["soap:Body"][actionType + "Response"][actionType + "Result"][requestType];

    return result;

  } catch (error) {
    console.error(error);
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUri: ""
    };
    this.toggleSwitch1(false);
  }

  toggleSwitch1 = (value) => {
    var res = logResponse().then(
      function(val) {
        this.setState({imgUri: "data:" + val[0]["C_IMAGE_TYPE"]["_text"] + ";base64," + val[0]["N_BYTEARRAY_IMAGE"]["_text"]})
      }
      .bind(this))
      .catch(
      function(reason) {
        console.log(reason);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Img imgUri={this.state.imgUri} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
