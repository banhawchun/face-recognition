import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

const particleParams = {
  particles: {
    number: {
        value: 55,
        density: {
          enable: true,
          value_area: 700
        }
    },
    shape: {
      type: 'star',
      polygon: {
        nb_sides: 5
      }
    },
    size:{
      value: 3,
      random: true
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    // Get bouding box data from clarifai
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // Get image and image width and height
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width, // left_col, top_row... from clarifai face_detect API
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://smartbotfr-server.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://smartbotfr-server.herokuapp.com/image', {
            method:'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(resp => resp.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(err => console.log(err));
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (routeName) => {
    if(routeName === 'signout') {
      this.setState(initialState)
    } else if (routeName === 'home') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: routeName})
  }

  render(){
    const { isSignedIn, imageUrl, box, route, user} = this.state;
    return (
      <div className='App'>
        <Particles
          className='particles'
          params={particleParams}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={ isSignedIn } />
        {
          route === 'home'
            ? <div>
                <Logo />
                <Rank name={user.name} entries={user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
                <FaceRecognition imageUrl={ imageUrl } box={ box }/>
            </div>
            : (
                route === 'register'
                ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
        }
      </div>
    );
  }
}

export default App;
