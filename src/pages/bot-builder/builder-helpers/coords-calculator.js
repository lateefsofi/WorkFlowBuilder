export const  getCubicBezairCoords = (svgContainer, lineStartCoords, lineEndCoords, isEndAsLeft) => {
  let cx1, cx2, cy1, cy2;
    if(isEndAsLeft) {
      cx1 = svgContainer.width/2;
      cy1 = lineStartCoords.y;
      cx2 = svgContainer.width/2
      cy2 = lineEndCoords.y
    } else {
      cx1 = lineStartCoords.x;
      cy1 = svgContainer.height/2;
      cx2 = lineEndCoords.x;
      cy2 = svgContainer.height/2;
    }
    return {
      cx1,
      cx2,
      cy1,
      cy2
    }
}