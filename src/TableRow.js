import React, { Component } from 'react';
import chefMenu from './chefIcon.svg';
import autobind from 'class-autobind';
class TableRow extends Component {
    constructor(props){
        super(props);
        //console.log(props);
        //console.log(this.props);
        autobind(this);
    }



    render() {
        return (
          <tr>
            <td>
              <img src = {chefMenu}/>
            </td>
            <td>
              {this.props.chef}
            </td>
            <td>
              <button onClick = {()=>{this.props.onButtonPress(this.props.keyProp)}}>
                View
              </button>
            </td>
          </tr>
        )
    }
}

export default TableRow;
