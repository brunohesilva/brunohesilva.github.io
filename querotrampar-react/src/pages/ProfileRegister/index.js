import React, {Component, Mask, response} from 'react';
import { usuarioAutenticado } from '../../services/auth';
import api from '../../services/api';

const Styles = {
    
}

class ProfileRegister extends Component{
    constructor(){
        super();
        this.state = {
            "name" : "",
            "password" : "",
            "passwordConfirm": "",
            "birthday" : "",
            "cpf": "",
            "email": "",
            status : true
            
        }
    }

stateName = (event) =>{this.setState({name: event.target.value})} 
statePassword = (event) =>{this.setState({password: event.target.value})}
stateBirthday = (event) =>{this.setState({birthday: event.target.value})}
StateCpf = (event) =>{this.setState({cpf: event.target.value})}
StateEmail =  (event) =>{this.setState({email: event.target.value})}
statePasswordConfirm = (event) =>{this.setState({passwordConfirm: event.target.value})}

Register = (event) =>{
    event.preventDefault();
        api.post("/StudentsProfile", {
            name: this.state.name,
            password: this.state.password,
            birthday: this.state.birthday,
            email: this.state.email,
            cpf: this.state.cpf 
    }) .then ( data =>{
        console.log(response.data.token);
        localStorage.getItem("user-querotrampar", response.data.token);
        this.props.history.push();
        })
}

Mask(i){
        var v = i.value;
    
        if(isNaN(v[v.length-1])){ 
            i.value = v.substring(0, v.length-1);
            return;
    }
        i.setAttribute("maxlength", "14");
        if (v.length == 3 || v.length == 7) i.value += ".";
        if (v.length == 11) i.value += "-";
}

render(){ 
    return (
        <div>
            <form onSubmit={this.Register}>
                <fieldset>
                    <legend>Cadastro de Perfil</legend>
                    <label for="name">Nome</label>
                    <input
                    autoComplete="off"
                    type="text"
                    onInput={this.stateName}
                    name="Nome"
                    />
                    <label for="email">Email</label>
                    <input
                    type="text"
                    onInput={this.stateEmail}
                    name="Email"
                    />
                    <label for="password">Senha</label>
                    <input
                    type="password"
                    autoComplete="off"
                    onInput={this.statePassword}
                    name="senha"
                    minLength="8"
                    maxLength="100"
                    />
                    <label for="password">Confirmar senha</label>
                    <input
                    type="password"
                    autoComplete="off"
                    onInput={this.statePasswordConfirm}
                    name="senha"
                    minLength="8"
                    maxLength="100"
                    />
                    <label for="dataDeNascimento">Data de Nascimento</label>
                    <input
                    type="date"
                    onInput={this.stateBirthday}
                    name="dataDeNascimento"
                    />
                    <label for="cpf">CPF</label>
                    <input
                    type="text"
                    autoComplete="off"
                    onInput={this.stateCpf, Mask}
                    name="CPF"
                    />
                    <button>
                        Cadastrar Perfil
                    </button>
                </fieldset>
            </form>
          </div> 
        )
    }
}
export default ProfileRegister;