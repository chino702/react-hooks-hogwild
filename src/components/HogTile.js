import React, { useState } from "react";
import { Card, Image, Button } from "semantic-ui-react";

const HogTile = ({ hog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleHide = () => {
    setIsHidden(!isHidden);
  };

  if (isHidden) {
    return null; // Don't render the HogTile if it's hidden
  }

  return (
    <Card onClick={toggleExpand}>
      <Image src={hog.image} wrapped ui={false} alt={hog.name} />
      <Card.Content>
        <Card.Header>{hog.name}</Card.Header>
        {isExpanded && (
          <Card.Description>
            <p>Specialty: {hog.specialty}</p>
            <p>Weight: {hog.weight}</p>
            <p>Greased: {hog.greased ? "Yes" : "No"}</p>
            <p>Highest Medal Achieved: {hog["highest medal achieved"]}</p>
          </Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <Button onClick={toggleHide}>
          {isHidden ? "Show Hog" : "Hide Hog"}
        </Button>
      </Card.Content>
    </Card>
  );
};

export default HogTile;