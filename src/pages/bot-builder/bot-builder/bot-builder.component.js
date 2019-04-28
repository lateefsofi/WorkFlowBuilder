import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { controlColors } from '../../../shared/constants';

import endPoints from '../../../shared/constants/endPoints.constants';
import './bot-builder.component.scss';

// HELPERS
import getSvgLineCoords from '../builder-helpers/get-svg-line-coords';
import { createSvgElement, getSvgContainer, setPathAttributes, setMarkerAttributes, setArrowAttributes } from '../builder-helpers/elements';
import { getCubicBezairCoords } from '../builder-helpers/coords-calculator';

const HEADER_HEIGHT = 50;
const ARROW_DIMS = 6;
const ELEMENT_HEADER = 66;
const ELEMENT_OPTION_HEIGHT = 47;
const ELEMENT_OPTION_MID = 10;
const ELEMENT_WIDTH = 264;
const LeftNavWidth = 56;
const boundaries = {
  left: 292,
  top: 0
}

export class BotBuilder extends Component {
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

    this.deleteElementHandler = this.deleteElementHandler.bind(this);
  }

  componentDidMount() {
    // this.drawLine();
    // this.setState({
    //   botBuilderData: this.props.botData
    // })
    if(this.props.botData) {
      this.drawConnectors(this.props.botData)
    }
  }
  componentDidUpdate() {
    if(this.props.botData) {
      this.drawConnectors(this.props.botData)
    }
  }

  handleStop(draggableData, key) {
    const updatedBotData = {...this.props.botData};
    updatedBotData[key].pos = {
      x: draggableData.x,
      y: draggableData.y
    }
    this.props.handleBotDataChange(updatedBotData);
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
        this.props.botData[this.startOfNewLine.elementKey].options[this.startOfNewLine.optionIndex].next = null;
      } else {
        this.props.botData[this.startOfNewLine.elementKey].options[this.startOfNewLine.optionIndex].next = this.selectedDropElement;
      }
      this.props.handleBotDataChange(this.props.botData);
      // document.getElementById('chat-element-'+this.startOfNewLine.elementKey+'-option-remove'+this.startOfNewLine.optionIndex).style.display="none"
      this.removeLines(this.connectors);
      this.connectors = [];
      this.drawConnectors(this.props.botData)
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
    this.props.botData[itemId].pos = {
      x: draggableData.x,
      y: draggableData.y
    }
    //remove Lines
    this.removeLines(this.connectors);
    this.connectors = [];
    //Draw new lines
    this.drawConnectors(this.props.botData)
  }

  removeLines(list) {
    // document.getElementsByClassName('remove').style.display="none";
    list.forEach(svgLine=>{
      svgLine.remove();
    })
  }

  drawTempLine(startCoords, endCoords, preOccupiedSpace) {
    const {svgContainer, lineStartCoords, lineEndCoords} = getSvgLineCoords(startCoords, endCoords, preOccupiedSpace);
    if(!this.tempSvg) {
    this.tempSvg = createSvgElement('svg');
    }
    getSvgContainer.call(this.tempSvg, svgContainer, LeftNavWidth);
    //DRAW PATH
    if(!this.tempPathElement) {
      this.tempPathElement =createSvgElement('path');
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
    setPathAttributes.call(this.tempPathElement);
    if(!this.arrowPath) {
      this.tempArrowPath = createSvgElement('path');
      this.tempDefs = createSvgElement('defs');
      this.tempMarker = createSvgElement('marker');
    }
    setMarkerAttributes.call(this.tempMarker, "-temp");
    setArrowAttributes.call(this.tempArrowPath);
    this.tempMarker.append(this.tempArrowPath);
    this.tempDefs.append(this.tempMarker);
    this.tempSvg.append(this.tempDefs);
    this.tempPathElement.setAttribute("marker-end", "url(#arrow-head-temp)")
    
    this.tempSvg.appendChild(this.tempPathElement);
    this.tempSvg.style.zIndex="3";
    document.getElementById('bot-builder-container').appendChild(this.tempSvg);
    // this.connectors.push(this.tempSvg);
  }
  drawLine(startCoords, endCoords, preOccupiedSpace, arrowHeadId, isEndAsLeft) {
    const {svgContainer, lineStartCoords, lineEndCoords} = getSvgLineCoords(startCoords, endCoords, preOccupiedSpace);
    let svg = createSvgElement("svg");
    getSvgContainer.call(svg, svgContainer, 0);

    //DRAW PATH
    const pathElement = createSvgElement('path');
    //Calculate cubic bezair
    const {cx1, cx2, cy1, cy2}=getCubicBezairCoords(svgContainer, lineStartCoords, lineEndCoords, isEndAsLeft)
    
    var data = `M${lineStartCoords.x} ${lineStartCoords.y} C${cx1} ${cy1} ${cx2} ${cy2} ${lineEndCoords.x - ARROW_DIMS} ${lineEndCoords.y - ARROW_DIMS}`;
    pathElement.setAttribute("d", data); 
    setPathAttributes.call(pathElement);
    
    //Arrow TEST start
    const defs = createSvgElement('defs');
    const marker = createSvgElement('marker');
    setMarkerAttributes.call(marker, arrowHeadId)
    const arrowPath = createSvgElement('path');
    setArrowAttributes.call(arrowPath);
    marker.append(arrowPath);
    defs.append(marker);
    svg.append(defs);
    pathElement.setAttribute("marker-end", `url(#arrow-head${arrowHeadId})`)
    
    svg.appendChild(pathElement);
    document.getElementById('bot-builder-container').appendChild(svg);
    this.connectors.push(svg);
    
  }
  
  drawConnectors(elementsData) {
    Object.keys(elementsData).forEach(key => {
      for(let i=0; i<elementsData[key].options.length; i++){
        if(elementsData[key].options[i].next) {
          //Show close icons
          // document.getElementById('chat-element-'+key+'-option-remove'+i).style.display="inline-block"
          //START POINT
          const startDomElement = document.getElementById(`chat-element-${key}`);
          // const optionId = document.getElementById(`chat-element-${key}-option-${i}`);
          const startY = elementsData[key].pos.y + HEADER_HEIGHT+ELEMENT_HEADER+(i*ELEMENT_OPTION_HEIGHT-ELEMENT_OPTION_MID);
          const startX = elementsData[key].pos.x + ELEMENT_WIDTH;
          
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

  deleteElementHandler(item) {
    this.removeLines(this.connectors);
    this.props.deleteElementHandler(item)
  }

  /**
   * Setup the controls of bot builder based on JSON data
   */
  getBotBuilderView(data) {
    return Object.keys(data)
      .map((item, itemIndex)=>{
        const backgroundColor = {'backgroundColor': controlColors[data[item].type]};
        const ligtBackgroundColor = {'backgroundColor': `${controlColors[data[item].type]}22`};
        const borderColor = {'borderColor': controlColors[data[item].type]};
        const color = {'color': controlColors[data[item].type]};
        return(
        <Draggable
          key={itemIndex}
          axis="both"
          handle=".handle"
          defaultPosition={{...data[item].pos}}
          position={{...data[item].pos}}
          grid={[1, 1]}
          scale={1}
          onStart={this.handleStart}
          onDrag={(e, draggableData)=>this.handleDrag(e, draggableData, item)}
          onStop={(e, draggableData)=>this.handleStop(draggableData, item)}
          bounds={ boundaries }>
          <div 
            id={'chat-element-'+item} 
            className="element-container"
            onMouseOver={e=>this.handlerMouseOverOnElement(e, item)}>
            <div className="actions">
              <i className="copy-icon" onClick={()=>this.props.copyElementHandler(item)}></i>
              <i className="delete-icon" onClick={()=> this.deleteElementHandler(item)}></i>
            </div>
            <div className="drag-area handle"></div>
            <div className="controlType">
              <span style={backgroundColor}></span>
                {data[item].typeName}
            </div>
            <div className="handle heading">{data[item].heading}</div>
            {
              data[item].options.map((option, optionIndex)=>(
                <div className="options" style={{...borderColor, ...ligtBackgroundColor, ...color} } key={itemIndex+'option'+optionIndex}>
                  <span className="text">{option.value} </span>
                  <span className="line"></span>
                  <span id={'chat-element-'+item+'-option-'+optionIndex} onMouseDown={e=>this.handleConnectorMouseDown(e, item, optionIndex)}  className={`connector ${option.next? 'active':''}`}></span>
                </div>
              ))
            }
          </div>
        </Draggable>
      )
    })
  }

  
  render() {
    return(
      <div onMouseMove={this.handleMouseMove} onMouseUp={this.handlerConnectorMouseUp} className="bot-builder-container" id="bot-builder-container">
        {this.getBotBuilderView(JSON.parse(JSON.stringify(this.props.botData)))}
      </div>
    );
  }
}

export default BotBuilder;


