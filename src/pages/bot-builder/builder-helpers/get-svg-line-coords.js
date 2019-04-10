
export const getSvgLineCoords = (startCoords, endCoords, topOccupiedSpace) => {
  const finalCoords = {
    svgContainer: {
      width: Math.abs(endCoords.x - startCoords.x),
      height: Math.abs(endCoords.y - startCoords.y),
      left: 0,
      top: 0
    },
    lineStartCoords: {x: 0, y: 0},
    lineEndCoords: {x: 0, y: 0}

  }
  //x line coords of start and end point,
  if(startCoords.x < endCoords.x){
    //Draw line to the right
    finalCoords.lineStartCoords.x = 0;
    finalCoords.lineEndCoords.x = endCoords.x - startCoords.x;
    finalCoords.svgContainer.left = startCoords.x;
  } else {
    // Draw line to the left
    finalCoords.lineStartCoords.x = startCoords.x - endCoords.x;
    finalCoords.lineEndCoords.x = 0;
    finalCoords.svgContainer.left = endCoords.x;
  }

  // Y line coords of start and end point
  if(startCoords.y < endCoords.y) {
    //Draw line below the start point
    finalCoords.lineStartCoords.y= 0;
    finalCoords.lineEndCoords.y = endCoords.y - startCoords.y;
    finalCoords.svgContainer.top = startCoords.y - topOccupiedSpace;
  } else {
    // Draw line above the start point
    finalCoords.lineStartCoords.y= startCoords.y - endCoords.y;
    finalCoords.lineEndCoords.y = 0;
    finalCoords.svgContainer.top = endCoords.y - topOccupiedSpace;
  }
  return finalCoords;
}

export default getSvgLineCoords;