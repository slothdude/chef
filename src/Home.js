import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import logo from './logo.svg';
import chefMenu from './chefIcon.svg';
import axios from 'axios';
import autobind from 'class-autobind';
import TableRow from './TableRow.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = { activeItem: 'menu',
    menuItems: [], chefs: [], curChef: 0,
    name: "", price: "", location:"", products:[]};

    autobind(this);

  }

  //could say async before and then can use await inside
  componentWillMount(){
    this.updateChefs();
  }
  componentDidMount(){
    //this.updateChefs();
    this.updateMenu();

  }

  //handlers for changing views
  handleMenu(){
    this.setState({activeItem: 'menu'});
  }

  handleChef(){
    this.setState({activeItem: 'chef'});
  }

  //handlers for typing stuff
  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeLocation(event) {
    this.setState({location: event.target.value});
  }

  handleChangePrice(event) {
    this.setState({price: event.target.value});
  }

  // handleCheck(event){
  //   console.log(event);
  // }

  //Doesn't need an API call because changing the state,
  //and the list will get updated with the state next post
  handleDelete(){
    var items = this.state.menuItems;
    items.splice(items.length-1,1);
    this.setState(items);
  }

  //Add new item to personal menu
  handleMenuSubmit(event){
    var curId = this.props.user.uid;
    event.preventDefault();
    console.log(this.state.menuItems);
    const user = {
      items: [...this.state.menuItems, {name: this.state.name, price: this.state.price}]
    };
    axios.post(`https://3n1o8iiw02.execute-api.us-east-1.amazonaws.com/0/menu?uid=${curId}`,{user})
      .then(response => {
        this.updateMenu();
      });
    this.setState({name: "", price: ""});
  }

  //Get current menu for cur user from elastic search, then update state with that
  updateMenu(){
    var curId = this.props.user.uid;
    axios.get(`https://3n1o8iiw02.execute-api.us-east-1.amazonaws.com/0/menu?uid=${curId}`)
      .then(response => {
      //  console.log(response);
        var menu = response.data.res._source.menu;
        this.handleMenuUpdate(menu);
      });
  }

  handleMenuUpdate(menu){
    this.setState({menuItems: menu});
  }

  // updateMenus(){
  //   console.log(this.state.chefs);
  //   var products = [];
  //   products.push(this.state.products);
  //   for(let chef of this.state.chefs){
  //     axios.get(`https://3n1o8iiw02.execute-api.us-east-1.amazonaws.com/0/menu?uid=${chef}`)
  //       .then(response => {
  //         //console.log(response);
  //         var menu = response.data.res._source.menu;
  //         //console.log(menu);
  //         products.push(menu);
  //         console.log(products);
  //         this.handleMenusUpdate(products);
  //       });
  //   }
  //
  //
  // }

  //get the IDs of all chefs, add to state
  updateChefs(){
    axios.get(`https://3n1o8iiw02.execute-api.us-east-1.amazonaws.com/0/chefs`)
      .then(response => {
        console.log(response);
        var uids = response.data.res._source.uids;
        this.handleChefUpdate(uids);
      }
    );
  }

  handleChefUpdate(uids){
    this.setState({chefs: uids});
  }

  //produces rows in a table based off of chefs in state
  getChefs(){
    var chefs = this.state.chefs;
    var returning = [];
    if(chefs){
      for(var i = 0; i < chefs.length; i++){
        returning.push(
          <TableRow onButtonPress = {this.onButtonPress} chef = {chefs[i]} keyProp={i} key={i} />
        );
      }
    }
    return returning;
  }

  updateProducts(products){
    this.setState(products: products);
  }

  //onButtonPress, put the data from get request into an array. Another function from
  //render will read the data and make the rows
  onButtonPress (i) {
    try {
      var chef = this.state.chefs[i];
      axios.get(`https://3n1o8iiw02.execute-api.us-east-1.amazonaws.com/0/menu?uid=${chef}`)
        .then(response => {
          console.log(response);
          var products = response.data.res._source.menu;
          // this.updateProducts(products);
          this.setState({products:products});
          console.log(products);
        });
    }
    catch(error) {
      console.error(error);
    }
  }
  //gets the menu for the chef selected
  getCurMenu(){
    //this.updateChefs();
    var returning = [];
    var products = this.state.products;
    console.log(products);
    for(var i = 0; i < products.length; i++){
      returning.push(
        <tr key = {i}>
          <td>
            <img src = {chefMenu}/>
          </td>
          <td>
            {products[i].name}
          </td>
          <td>
            {products[i].price}
          </td>
        </tr>
      );
    }

    return returning;
  }

  //Produces rows in a table based off of personal menu
  getMenu(){
    const menuItems = this.state.menuItems;
    var returning = [];
    for(var i = 0; i < menuItems.length; i++){
      returning.push(
        <tr key = {i}>
          <td>
            <img src = {chefMenu}/>
          </td>
          <td>
            {menuItems[i].name}
          </td>
          <td>
            {menuItems[i].price}
          </td>
        </tr>
      );
    }
    return returning;
  }

  //Render 1 of 2 components based off of which tab you clicked
  render() {
    console.log(this.state);
    const { activeItem } = this.state;
    const options = {
      expandRowBgColor: 'rgb(249, 186, 143)'
    };
    if(activeItem === 'menu'){
      return (
        <div>
          <table className="App-header">
            <tbody>
              <tr>
                <td className="App-header-td">
                  <img onClick = {this.handleMenu} src = {logo} className = "logo" alt = "Noodles"/>
                </td>
                <td className="App-header-td">
                  <h2 className = "Cursive">Chef</h2>
                </td>
                <td className="App-header-td">
                  <img onClick = {this.handleChef} src = {chefMenu} className = "Chef-logo" alt = "chef it up!" />
                </td>
              </tr>
            </tbody>
          </table>

          <div className = "Home">
            <h3>
              All Chefs:
            </h3>
            <table className = "menu-table" >
              <tbody>
                <tr>
                  <th></th>
                  <th>Chef ID</th>
                  <th>Click for menu</th>
                </tr>
                {this.getChefs()}
              </tbody>
            </table>
            <h3>
              Current Menu:
            </h3>
            <table className = "menu-table" >
              <tbody>
                {this.getCurMenu()}
              </tbody>
            </table>

          </div>
        </div>
      );
    }
    else{
      return(
      <div>
        <table className="App-header">
          <tbody>
            <tr>
              <td className="App-header-td">
                <img onClick = {this.handleMenu} src = {logo} className = "logo" alt = "Noodles"/>
              </td>
              <td className="App-header-td">
                <h2 className = "Cursive">Chef</h2>
              </td>
              <td className="App-header-td">
                <img onClick = {this.handleChef} src = {chefMenu} className = "Chef-logo" alt = "chef it up!" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className = "Home">


          <h3>
            Items on your menu:
          </h3>
          <table className = "Home">
            <tbody>
              <tr>
                <th></th>
                <th>Item</th>
                <th>Price</th>

              </tr>
              {this.getMenu()}
            </tbody>
          </table>
          <h3>
            Add a new item:
          </h3>
          <form onSubmit = {this.handleMenuSubmit}>
            <input type="text"
                   value={this.state.name}
                   onChange={this.handleChangeName}
                   placeholder = "Menu Item"
                   className = "LoginInput"
                   required = "True"/>
             <input type="text"
                   value={this.state.price}
                   onChange={this.handleChangePrice}
                   placeholder = "Price (number)"
                   className = "LoginInput"
                   required = "True"/>
            <button type = "submit">
              Submit
            </button>
          </form>
          <button onClick = {this.handleDelete}>
            Delete bottom item
          </button>
        </div>
      </div>
      );
    }
  }
}

export default Home;
