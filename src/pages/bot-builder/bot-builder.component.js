import React, { Component } from 'react';
import Draggable from 'react-draggable';

import endPoints from '../../shared/constants/endPoints.constants';
import './bot-builder.component.scss';

// HELPERS
import getSvgLineCoords from './builder-helpers/get-svg-line-coords';

const HEADER_HEIGHT = 64;
const ARROW_DIMS = 8;
const ELEMENT_PROPS = {
  width: 200,
  headerSpace: 50,
  optionHeight: 20
};

class BotBuilder extends Component {
  constructor (props){
    super(props);
    this.isConnectionNeeded = false;
    this.handleStop = this.handleStop.bind(this);
    this.handleConnectorMouseDown = this.handleConnectorMouseDown.bind(this);
    this.handlerConnectorMouseUp = this.handlerConnectorMouseUp.bind(this);
    this.handlerMouseOverOnElement = this.handlerMouseOverOnElement.bind(this);
    this.handlerMouseOutOnElement = this.handlerMouseOutOnElement.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.svg = null;
    this.pathElement = null;
    this.selectedDropElement = null;
    this.lineStartCoords = {};
    this.connectors = [];
    this.delButtons = [];
  }
  handleStop(param) {
    console.log("oaram: ", param);
  }
  handleConnectorMouseDown(e, elementKey, optionIndex) {
    this.lineStartCoords = {
      x: e.pageX,
      y: e.pageY // 64 is the header height
    }
    this.isConnectionNeeded = true;
    this.startOfNewLine = {
      elementKey,
      optionIndex
    }
  }
  handlerConnectorMouseUp(e) {
    this.lineStartCoords = {}
    if(this.isConnectionNeeded && this.selectedDropElement) {
      this.isConnectionNeeded = false;
      if(this.startOfNewLine.elementKey === this.selectedDropElement) {
        //Same as starting elements clear old reference
        BotBuilderData[this.startOfNewLine.elementKey].options[this.startOfNewLine.optionIndex].next = null;
      } else {
        BotBuilderData[this.startOfNewLine.elementKey].options[this.startOfNewLine.optionIndex].next = this.selectedDropElement;
      }      
      this.removeLines(this.connectors);
      this.connectors = [];
      this.removeLines(this.delButtons);
      this.delButtons = [];
      this.drawConnectors(BotBuilderData)
    }
    if(this.tempSvg) {
      this.tempSvg.remove();
    }
  }
  handlerMouseOverOnElement(e, dropElement) {
    this.selectedDropElement = dropElement;
  }
  handlerMouseOutOnElement(e) {

    this.selectedDropElement = null;
  }

  handleMouseMove(e) {
    if(this.isConnectionNeeded) {
      this.drawTempLine({...this.lineStartCoords}, {
        x: e.pageX,
        y: e.pageY
      }, HEADER_HEIGHT)
    }
  }
  handleDrag(e, draggableData, itemId) {
    BotBuilderData[itemId].pos = {
      x: draggableData.x,
      y: draggableData.y
    }
    //remove Lines
    this.removeLines(this.connectors);
    this.connectors = [];
    this.removeLines(this.delButtons);
    this.delButtons = [];
    //Draw new lines
    this.drawConnectors(BotBuilderData)
  }

  removeLines(list) {
    list.forEach(svgLine=>{
      svgLine.remove();
    })
  }

  drawTempLine(startCoords, endCoords, preOccupiedSpace) {
    const {svgContainer, lineStartCoords, lineEndCoords} = getSvgLineCoords(startCoords, endCoords, preOccupiedSpace);
    if(!this.tempSvg) {
    this.tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    }
    this.tempSvg.setAttribute('width', svgContainer.width.toString());
    this.tempSvg.setAttribute('height', svgContainer.height.toString());
    this.tempSvg.style.left= `${svgContainer.left}px`;
    this.tempSvg.style.top= `${svgContainer.top}px`;
    this.tempSvg.style.position= 'absolute';
    //DRAW PATH
    if(!this.tempPathElement) {
      this.tempPathElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    }
    //Calculate cubic bezair
    if(svgContainer.width > svgContainer.height) {
      this.cx1 = svgContainer.width/2;
      this.cy1 = lineStartCoords.y;
      this.cx2 = svgContainer.width/2
      this.cy2 = lineEndCoords.y
    } else {
      this.cx1 = lineStartCoords.x;
      this.cy1 = svgContainer.height/2;
      this.cx2 = lineEndCoords.x;
      this.cy2 = svgContainer.height/2;
    }
    var data = `M${lineStartCoords.x} ${lineStartCoords.y} C${this.cx1} ${this.cy1} ${this.cx2} ${this.cy2} ${lineEndCoords.x} ${lineEndCoords.y}`;
    this.tempPathElement.setAttribute("d", data); 
    this.tempPathElement.style.stroke = "#32d296"; //Set stroke colour
    this.tempPathElement.style.strokeWidth = "4px"; //Set stroke width
    this.tempPathElement.style.fill = "none"; //Set stroke width
    if(!this.arrowPath) {
      this.tempArrowPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      this.tempDefs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');
      this.tempMarker = document.createElementNS("http://www.w3.org/2000/svg", 'marker');
    }
    // const arrowData = `M${lineEndCoords.x-8} ${lineEndCoords.y} L${lineEndCoords.x} ${lineEndCoords.y-10} L${lineEndCoords.x+8} ${lineEndCoords.y} z`;
    // this.arrow.setAttribute("d", arrowData)
    // this.arrow.style.stroke = "none";
    // this.arrow.style.fill = "#32d296";
    // this.arrow.setAttribute("d", arrowData)
    this.tempMarker.setAttribute("id", "temp-arrow-head")
    this.tempMarker.setAttribute("orient", "auto")
    this.tempMarker.setAttribute("markerWidth", "2")
    this.tempMarker.setAttribute("markerHeight", "4")
    this.tempMarker.setAttribute("refX", "0.1")
    this.tempMarker.setAttribute("refY", "2")
    this.tempArrowPath.setAttribute("d", "M0,0 V4 L2,2 Z");
    this.tempArrowPath.setAttribute("fill", "#32d296");
    this.tempMarker.append(this.tempArrowPath);
    this.tempDefs.append(this.tempMarker);
    this.tempSvg.append(this.tempDefs);
    this.tempPathElement.setAttribute("marker-end", `url(#temp-arrow-head)`)
    
    this.tempSvg.appendChild(this.tempPathElement);
    // this.tempSvg.appendChild(this.arrow);
    this.tempSvg.style.zIndex="3";
    document.getElementById('bot-builder-container').appendChild(this.tempSvg);
    // this.connectors.push(this.tempSvg);
  }
  drawLine(startCoords, endCoords, preOccupiedSpace, arrowHeadId, isEndAsLeft) {
    const {svgContainer, lineStartCoords, lineEndCoords} = getSvgLineCoords(startCoords, endCoords, preOccupiedSpace);
    // if(!this.tempSvg) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // }
    svg.setAttribute('width', svgContainer.width.toString());
    svg.setAttribute('height', svgContainer.height.toString());
    svg.style.left= `${svgContainer.left}px`;
    svg.style.top= `${svgContainer.top}px`;
    svg.style.position= 'absolute';
    //DRAW PATH
    // if(!this.pathElement) {
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    // }
    //Calculate cubic bezair
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
    var data = `M${lineStartCoords.x} ${lineStartCoords.y} C${cx1} ${cy1} ${cx2} ${cy2} ${lineEndCoords.x - ARROW_DIMS} ${lineEndCoords.y - ARROW_DIMS}`;
    pathElement.setAttribute("d", data); 
    pathElement.style.stroke = "#32d296"; //Set stroke colour
    pathElement.style.strokeWidth = "4px"; //Set stroke width
    pathElement.style.fill = "none"; //Set stroke width
    //Arrow TEST start
    const defs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');
    const marker = document.createElementNS("http://www.w3.org/2000/svg", 'marker');
    
    marker.setAttribute("id", "arrow-head"+arrowHeadId)
    marker.setAttribute("orient", "auto")
    marker.setAttribute("markerWidth", "2")
    marker.setAttribute("markerHeight", "4")
    marker.setAttribute("refX", "0.1")
    marker.setAttribute("refY", "2")
      //   .append("path")
      //     .setAttribute("d", "M0,0 V4 L2,2 Z")
      //     .setAttribute("fill", "red");
    const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    arrowPath.setAttribute("d", "M0,0 V4 L2,2 Z");
    arrowPath.setAttribute("fill", "#32d296");
    marker.append(arrowPath);
    defs.append(marker);
    svg.append(defs);
    pathElement.setAttribute("marker-end", `url(#arrow-head${arrowHeadId})`)
    //ARROW TEST END
    //Draw arrow
    // const arrow = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    // const arrowData = `M${lineEndCoords.x-ARROW_DIMS} ${lineEndCoords.y-ARROW_DIMS-20} L${lineEndCoords.x} ${lineEndCoords.y} L${lineEndCoords.x-ARROW_DIMS} ${lineEndCoords.y+ARROW_DIMS} z`;
    // arrow.setAttribute("d", arrowData)
    // arrow.style.stroke = "none";
    // arrow.style.fill = "#32d296";
    // arrow.setAttribute("d", arrowData)
    svg.appendChild(pathElement);
    // svg.appendChild(arrow);
    document.getElementById('bot-builder-container').appendChild(svg);
    this.connectors.push(svg);
    const lineMid = pathElement.getPointAtLength(65);
    const btnCoords = {
      x: lineMid.x + svgContainer.left-10,
      y: lineMid.y + svgContainer.top,
    }
    debugger
    const delButton = document.createElement('button');
    delButton.setAttribute("id", "del-button"+arrowHeadId);
    delButton.innerHTML="<span>del<span>"
    delButton.style.position = "absolute";
    delButton.style.zIndex = "3";
    delButton.style.left = `${btnCoords.x}px`;
    delButton.style.top = `${btnCoords.y}px`;
    delButton.style.display="none";
    document.getElementById('bot-builder-container').appendChild(delButton);
    this.delButtons.push(delButton);
    pathElement.addEventListener("mouseover", ()=>{
      delButton.style.display="inline-block";
    })
    delButton.addEventListener("mouseover", ()=>{
      delButton.style.display="inline-block";
    })
    pathElement.addEventListener("mouseout", ()=>{
      delButton.style.display="none";
    })
  }
  
  componentDidMount() {
    // this.drawLine();
    this.drawConnectors(BotBuilderData)
  }

  //Get line start
  getLineStart(startCoords, svgCoords){
    if(startCoords.y>svgCoords.y) {
      return {
        y: startCoords.y - svgCoords.y,
        x: 0
      }
    }
    return {
      x: 0,
      y: 0
    }
  }
  //get line end
  getLineEnd(startCoords, svgCoords){
    if(startCoords.y<svgCoords.y) {
      return {
        x: Math.abs(svgCoords.x - startCoords.x),
        y: Math.abs(svgCoords.y - startCoords.y)
      }
    }
    return {
      x: Math.abs(svgCoords.x - startCoords.x),
      y: 0
    }
  }

  /**
   * Setup the controls of bot builder based on JSON data
   */
  getBotBuilderView(data) {
    return Object.keys(data)
      .map((item, itemIndex)=>(
        <Draggable
          key={itemIndex}
          axis="both"
          handle=".handle"
          defaultPosition={data[item].pos}
          position={null}
          grid={[1, 1]}
          scale={1}
          onStart={this.handleStart}
          onDrag={(e, draggableData)=>this.handleDrag(e, draggableData, item)}
          onStop={this.handleStop}>
          <div 
            id={'chat-element-'+item} 
            className="element-container"
            onMouseOver={e=>this.handlerMouseOverOnElement(e, item)}>
            <div className="drag-area handle"></div>
            <div className="handle heading">{data[item].heading}</div>
            {
              data[item].options.map((option, optionIndex)=>(
                <div className="options" key={itemIndex+'option'+optionIndex}>
                  {option.value}
                  <span id={'chat-element-'+item+'-option-'+optionIndex} onMouseDown={e=>this.handleConnectorMouseDown(e, item, optionIndex)}  className="connector"></span>
                  {/* <span className="remove">x</span> */}
                </div>
              ))
            }
          </div>
        </Draggable>
      ))
  }

  drawConnectors(elementsData) {
    Object.keys(elementsData).forEach(key => {
      for(let i=0; i<elementsData[key].options.length; i++){
        if(elementsData[key].options[i].next) {
          //START POINT
          const startDomElement = document.getElementById(`chat-element-${key}`);
          // const optionId = document.getElementById(`chat-element-${key}-option-${i}`);
          const startY = elementsData[key].pos.y + 64+20+(i*48-10); // optionId.offsetTop + optionId.parentElement.offsetTop +  optionId.parentElement.parentElement.offsetTop;
          const startX = elementsData[key].pos.x + 258;// optionId.parentElement.parentElement.offsetLeft + optionId.parentElement.parentElement.clientWidth;  
          
          // END POINT
          const nextElement = elementsData[elementsData[key].options[i].next];
          const nextElementInDom = document.getElementById(`chat-element-${elementsData[key].options[i].next}`);
          let endX, endY, isLeftEndPoint= false;
          if(startY < nextElement.pos.y && nextElement.pos.x - startX<10) {
            endX = nextElement.pos.x + nextElementInDom.offsetWidth/2;
            endY = nextElement.pos.y;
          } else if(startY > nextElement.pos.y && nextElement.pos.x - startX<10) {
            endX = nextElement.pos.x + nextElementInDom.offsetWidth/2;
            endY = nextElement.pos.y + nextElementInDom.offsetHeight+16;
          }
           else {
            isLeftEndPoint = true;
            endX = nextElement.pos.x;// nextElement.offsetLeft;
            endY = nextElement.pos.y + nextElementInDom.offsetHeight/2; // nextElement.offsetTop + nextElement.clientHeight/2;
          }
          this.drawLine({x: startX, y: startY}, {
            x: endX,
            y: endY
          }, 0, i, isLeftEndPoint)
        }
      }
    });
  }
  render() {
    return(
      <div onMouseMove={this.handleMouseMove} onMouseUp={this.handlerConnectorMouseUp} className="bot-builder-container" id="bot-builder-container">
        {this.getBotBuilderView(BotBuilderData)}
        {/* {this.drawConnectors(BotBuilderData)} */}
      </div>
    );
  }
}

export default BotBuilder;




const BotBuilderData = {
  "fdafds54541": {
    id: "fdafds54541",
    heading: "Please select your hobby?",
    options: [
      {value: "Cricket", next: "fdafds54542"},
      {value: "FootBall", next: null},
      {value: "Volleyball", next: "fdafds54543"}
    ],
    pos: {
      x: 100,
      y: 200
    }
  },
  "fdafds54542": {
    id: "fdafds54542",
    heading: "Please select favrite language?",
    options: [
      {value: "C", next: null},
      {value: "C++", next: null},
      {value: "JAVA", next: null}
    ],
    pos: {
      x: 500,
      y: 100
    }
  },
  "fdafds54543": {
    id: "fdafds54543",
    heading: "Please select favourite city?",
    options: [
      {value: "Srinagar", next: null},
      {value: "Bangaluru", next: null},
      {value: "Mumbai", next: null}
    ],
    pos: {  
      x: 500,
      y: 350
    }
  }
}