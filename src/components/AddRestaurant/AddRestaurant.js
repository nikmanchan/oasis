import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AddRestaurant = () => (
  <div>
    <h2>
      Add Restaurant
    </h2>

    <form>
        <input placeholder="name"></input>
        <input placeholder="street address"></input>
        <select placeholder="restriction">restriction
        <option>restriction</option>
        </select>
        <select><option>friendliness rating</option></select>
        <select><option>
        costliness rating
            </option>costliness rating</select>
        <input placeholder="comments"></input>
        <input type="submit"></input>
    </form>
  </div>
);

export default AddRestaurant;