import React from 'react';

const AddRestaurant = () => (
  <div>
    <h2>
      Add Restaurant
    </h2>

    <form>
        <input placeholder="name"></input>
        <input placeholder="street address"></input>
        <select placeholder="restriction">
        <option value="" disabled selected>restriction</option>
          <option value="vegetarian">vegetarian</option>
          <option value="vegan">vegan</option>
        </select>
        <select>
          <option value="" disabled selected>friendliness rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select>
          <option value="" disabled selected>costliness rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input placeholder="comments"></input>
        <input type="submit"></input>
    </form>
  </div>
);

export default AddRestaurant;