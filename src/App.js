import React, {useEffect} from 'react'
import {Route, Link, Switch} from "react-router-dom"
import Display from './Display'
import Form from './Form'
import './App.css';

function App() {

  ////////////////////////
  // Constants
  ////////////////////////

  //URL
  const url = "http://localhost:4500"

  //Places state
  const [places, setPlaces] = React.useState({
    status: 0,
    data: []
  })

  //Selected Places state

  const emptyPlace = {
    name: "",
    img: "",
    description: ""
}

const [selectedPlace, setSelectedPlace] = React.useState(emptyPlace)


  ///////////////////////
  // Functions
  ///////////////////////

  const getPlaces = () => {
    fetch(url + '/place/')
    .then((response) => response.json())
    .then((data) => {
      setPlaces(data)
    })
  }

  React.useEffect(() => {
    getPlaces()
  }, [])

  //function to specify whoch place gets updated
  const selectPlace = (place) => {
    setSelectedPlace(place)
  }

  const handleCreate = (newPlace) => {
    fetch(url + "/place/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlace)
    })
    .then(() => getPlaces())
  }

  const handleUpdate = (place) => {
    fetch(url + "/place/" + place._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(place)
    })
    .then(() => getPlaces())
  }

  //function to delete individual dogs
  const deletePlace = (place) => {
    fetch(url + "/place/" + place._id, {
      method: "delete"
    })
    .then(() => {
      getPlaces()
    })
  }




  ////////////////////////
  // Render
  ////////////////////////


  return (
    <div className="App">
      <h1>Add your favorite places!</h1>
      <hr />
      <Link to='/create'>
        <button>Add Place</button>
      </Link>
      <main>
        <Switch>
          <Route 
            exact path="/" 
            render={(rp) => <Display 
              {...rp}
              places={places}
              selectPlace={selectPlace}
              deletePlace={deletePlace}
            />} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" place={emptyPlace} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" place={selectedPlace} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>

      </main>
    </div>
  );
}

export default App;
