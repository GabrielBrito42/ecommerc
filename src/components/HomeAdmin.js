import React, {Component} from 'react';
import '../App.css';
import Products from './Products';
import Filter from './Filter';
import Basket from './Basket';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class HomeAdmin extends Component {
  constructor(props){
    super(props);
    this.state = { 
      products:[], 
      filteredProducts:[], 
      cartItems:[],
      title:"",
      description:"",
      price:"",
      novo:[],
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.inserir = this.inserir.bind(this);
  }

  componentWillMount(){
    fetch("http://localhost:8000/products").then(res => res.json())
      .then(data => this.setState({
        products: data,
        filteredProducts: data
      }));
      if(localStorage.getItem('cartItems')){
        this.setState({cartItems: JSON.parse(localStorage.getItem('cartItems'))});
      }
  }

  handleChangeSort(e){
    this.setState({sort: e.target.value});
    this.listProducts();
  }

  handleChangeSize(e){
    this.setState({size: e.target.value});
    this.listProducts();
  }

  listProducts(){
    this.setState(state => {
      if(state.sort !== ''){
        state.products.sort((a,b)=>(state.sort==='menor')? (a.price > b.price?1:-1): (a.price < b.price?1:-1));
      } else {
        state.products.sort((a,b)=>(a.id<b.id?1:-1));
      } 
      if(state.size!==''){
        return { filteredProducts: state.products.filter(a=>
          a.availableSizes.indexOf(state.size)>=0
        )}
      }
      return {filteredProducts: state.products};
    })
  }

  handleAddToCart(e, product){
    let jacontou = false;
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach(item => {
        if(item.id === product.id){
          if(jacontou === false){
            item.count+=1;
            jacontou = true;
          }
          productAlreadyInCart = true;
        }
      });

      if(!productAlreadyInCart){
        console.log("Antes de colocar na lista" + cartItems.count);
        cartItems.push({...product, count:0});
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
    })
  }

  handleRemoveFromCart(e, item){
    this.setState(state => {
      const cartItems = state.cartItems.filter(elm => elm.id !== item.id);
      localStorage.setItem('cartItem', cartItems);
      return{cartItems}
    });
  }

  inserir(){
    let products = this.state.novo;
    products.push({title: this.state.title, description: this.state.description, price: this.state.price});
    var json = JSON.stringify(products);
    var fs = require('browserify-fs');
    fs.writeFile('db.json', json, 'utf8', function(err){
      if(err) throw err;
    });
  }

   render() {
    return (
      <div className="Home">
      <link rel="stylesheet" href="https://bootswatch.com/3/superhero/bootstrap.min.css"/>
      <h1>Lojinha</h1>
        <hr/>
        <div className="row">
          <div className="col-md-8"> 
          <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize}
            handleChangeSort={this.handleChangeSort} count={this.state.filteredProducts.length}/>
            <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart}/>
          </div>
          <div className="col-md-4">
            <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
          </div>

          <div className="col-md-4">
            <h3>Title</h3><input type="text" onChange={(event)=>{this.setState({title:event.target.value})}}></input>
            <h3>Description</h3><input type="text" onChange={(event)=>{this.setState({description:event.target.value})}}></input>
            <h3>Price</h3><input type="text" onChange={(event)=>{this.setState({price:event.target.value})}}></input>
            <input type="button" onClick={this.inserir} value="Inserir"></input>
          </div>
        </div>
      </div>
    );
  }

  
}