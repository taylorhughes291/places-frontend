import React from "react";

const Display = (props) => {
  const {places} = props
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {places.data.map((item, index) => (
        <article key={item._id}>
          <img src={item.img} />
          <h1>{item.name}</h1>
          <h3>{item.description}</h3>
          <button 
            onClick={() => {
              props.selectPlace(item)
              props.history.push("/edit")
            }}
          >Edit</button>
          <button
            onClick={() => {
              props.deletePlace(item)
            }}
          >Delete</button>
        </article>
      ))}
    </div>
  )

  const loading = () => {
    return (
      <h1>Loading...</h1>
    )
  }

  return places.data.length > 0 ? loaded() : loading()

};

export default Display;
