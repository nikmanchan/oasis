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
          <option>vegetarian</option>
          <option>vegan</option>
        </select>
        <select>
        <option value="" disabled selected>friendliness rating</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <select>
          <option value="" disabled selected>costliness rating</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <input placeholder="comments"></input>
        <input type="submit"></input>
    </form>
  </div>
);

export default AddRestaurant;