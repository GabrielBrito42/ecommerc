import React, { Component } from 'react'

export default class Filter extends Component {
	render(){
		return(
			<div className="row">
				<div className="col-md-4">
					{this.props.count} produtos encontrados.
				</div>
				<div className="col-md=4">
					<label>
						Ordenado por
						<select className="form-control" value={this.props.sort}
						onChange={this.props.handleChangeSort}>
							<option value="">Selecionar</option>
							<option value="menor">Menor para o maior</option>
							<option value="maior">Maior para o menor</option>
						</select>
					</label>
				</div>
				<div className="col-md=4">
					<label>
						Ordenar por tamanho
						<select className="form-control" value={this.props.size}
						onChange={this.props.handleChangeSize}>
							<option value="">Todos</option>
							<option value="X">XS</option>
							<option value="S">S</option>
							<option value="M">M</option>
							<option value="L">L</option>
							<option value="XL">XL</option>
							<option value="XXL">XML</option>
						</select>
					</label>
				</div>
			</div>
		);
	}
}