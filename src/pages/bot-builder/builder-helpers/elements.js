
const lineColor = '#BCBCBC'; //"#32d296"
const lineWidth = '3px';

/**
 * Create an SVG element
 * @param {*} type 
 */
export const createSvgElement= type => document.createElementNS("http://www.w3.org/2000/svg", type);

export const getSvgContainer = function (svgContainer, leftNavWidth){
  this.setAttribute('width', svgContainer.width.toString());
  this.setAttribute('height', svgContainer.height.toString());
  this.style.left= `${svgContainer.left-leftNavWidth}px`;
  this.style.top= `${svgContainer.top}px`;
  this.style.position= 'absolute';
}

export const setPathAttributes= function (){
  this.style.stroke = lineColor; //Set stroke colour
  this.style.strokeWidth = lineWidth; //Set stroke width
  this.style.fill = "none"; //Set stroke width
}

export const setMarkerAttributes = function(arrowHeadId) {
  this.setAttribute("id", "arrow-head"+arrowHeadId)
  this.setAttribute("orient", "auto")
  this.setAttribute("markerWidth", "2")
  this.setAttribute("markerHeight", "4")
  this.setAttribute("refX", "0.1")
  this.setAttribute("refY", "2")
}

export const setArrowAttributes = function() {
  this.setAttribute("d", "M0,0 V4 L2,2 Z"); // Arrow
  // this.setAttribute("d","M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0")
  this.setAttribute("fill", lineColor);
}

//ADD A DELETE BUTTON ON LINE LOGIC
// const lineMid = pathElement.getPointAtLength(65);
    // const btnCoords = {
    //   x: lineMid.x + svgContainer.left-10,
    //   y: lineMid.y + svgContainer.top,
    // }
    // const delButton = document.createElement('button');
    // delButton.setAttribute("id", "del-button"+arrowHeadId);
    // delButton.innerHTML="<span>del<span>"
    // delButton.style.position = "absolute";
    // delButton.style.zIndex = "3";
    // delButton.style.left = `${btnCoords.x}px`;
    // delButton.style.top = `${btnCoords.y}px`;
    // delButton.style.display="none";
    // document.getElementById('bot-builder-container').appendChild(delButton);
    // this.delButtons.push(delButton);
    // pathElement.addEventListener("mouseover", ()=>{
    //   delButton.style.display="inline-block";
    // })
    // delButton.addEventListener("mouseover", ()=>{
    //   delButton.style.display="inline-block";
    // })
    // pathElement.addEventListener("mouseout", ()=>{
    //   delButton.style.display="none";
    // })