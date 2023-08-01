import React, { useState } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import HogTile from "./HogTile";
import hogsData from "../porkers_data";

const HogList = () => {
  const [showGreased, setShowGreased] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [hogs, setHogs] = useState(hogsData);
  const [newHog, setNewHog] = useState({
    name: "",
    specialty: "",
    greased: false,
    weight: 0,
    "highest medal achieved": "",
    image: "",
  });

  const toggleGreasedFilter = () => {
    setShowGreased(!showGreased);
  };

  const toggleSortBy = () => {
    setSortBy(sortBy === "name" ? "weight" : "name");
  };

  const handleAddHog = () => {
    setHogs([...hogs, newHog]);
    // Reset the form after adding the new hog
    setNewHog({
      name: "",
      specialty: "",
      greased: false,
      weight: 0,
      "highest medal achieved": "",
      image: "",
    });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewHog((prevHog) => ({
      ...prevHog,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const filteredHogs = showGreased ? hogs.filter((hog) => hog.greased) : hogs;

  const sortedHogs = filteredHogs.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "weight") {
      return a.weight - b.weight;
    }
    return 0;
  });

  return (
    <div className="hog-list">
      <button onClick={toggleGreasedFilter}>
        {showGreased ? "Show All Hogs" : "Show Greased Hogs Only"}
      </button>
      <button onClick={toggleSortBy}>
        Sort By: {sortBy === "name" ? "Name" : "Weight"}
      </button>
      <div>
        <h2>Add New Hog</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newHog.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Specialty:
            <input
              type="text"
              name="specialty"
              value={newHog.specialty}
              onChange={handleChange}
            />
          </label>
          <label>
            Greased:
            <input
              type="checkbox"
              name="greased"
              checked={newHog.greased}
              onChange={handleChange}
            />
          </label>
          <label>
            Weight:
            <input
              type="number"
              name="weight"
              value={newHog.weight}
              onChange={handleChange}
            />
          </label>
          <label>
            Highest Medal Achieved:
            <input
              type="text"
              name="highest medal achieved"
              value={newHog["highest medal achieved"]}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={newHog.image}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={handleAddHog}>
            Add Hog
          </button>
        </form>
      </div>
      {/* Use Semantic UI React's Grid component for columns */}
      <Grid container>
        <Grid.Row>
          {sortedHogs.map((hog) => (
            <Grid.Column key={hog.name} width={8}> {/* Use width={8} for two columns */}
              <HogTile hog={hog} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default HogList;