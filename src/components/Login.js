import React, { Component } from 'react';
import firebase from 'firebase';
import { map, catchError } from 'rxjs/operators';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import history from 'history/browser';

export default class Login extends Component{
	constructor(props){
		super(props);


		this.state = {
			email:"",
			senha:"",
			key:"",
			admin:"",
			conta:[
				{
					email:"",
					senha:"",
				}
			],
			valores:[],
		}
		this.cadastrar = this.cadastrar.bind(this);
		this.login = this.login.bind(this);
		this.mostrar = this.mostrar.bind(this);
	}

	login = () => {
		let email = this.state.email;
		firebase.auth().signInWithEmailAndPassword(`${this.state.email}`, `${this.state.senha}`)
			.then(function(result){
				console.log(result);
				}).catch(function(error){
				console.log(error);
			});
		let ref = firebase.database().ref('/contas/').orderByChild('email').equalTo(email);
		ref.once('value', (snapshot) => {
			snapshot.forEach((child)=>{
				this.state.valores = child.val();
				console.log(child.val());
			});
			this.mostrar();
		});
	}

	mostrar = () => {
		if(this.state.valores.admin === "sim"){
			history.push("/homeAdmin")
			window.location.reload();
		} else {
			history.push("/home")
			window.location.reload();
		}
	}

	cadastrar = () => {
		firebase.auth().createUserWithEmailAndPassword(`${this.state.email}`, `${this.state.senha}`);
		let email = this.state.email;
		let senha = this.state.senha;
		let formulario = document.getElementById('formulario');
		firebase.database().ref('contas').push({email, senha});
		formulario.reset();
	}

	render(){
		return(
			<div className="login">
			<form id="formulario">
				<h2>Se ainda nao possuir uma conta faca seu registro </h2>
				<h3>Email</h3><input type="text" onChange={(event)=>{this.setState({email:event.target.value})}}></input>
				<h3>Senha</h3><input type="text" onChange={(event)=>{this.setState({senha:event.target.value})}}></input>			
				<input type="button" onClick={this.cadastrar} value="cadastrar"></input>
			</form>
				<h2>Se ja for cadastrado faca seu login</h2>
				<h3>Email</h3><input type="text" onChange={(event)=>{this.setState({email:event.target.value})}}></input>
				<h3>Senha</h3><input type="text" onChange={(event)=>{this.setState({senha:event.target.value})}}></input>
				<input type="button" onClick={this.login} value="login"></input>
			</div>
		);
	}
}