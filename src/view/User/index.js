import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import './styles.css';

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCareer = this.onChangeCareer.bind(this);
        this.onChangeCpf = this.onChangeCpf.bind(this);
        this.onChangePet = this.onChangePet.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordb = this.onChangePasswordb.bind(this);
        this.onChangeBornDate = this.onChangeBornDate.bind(this);

        this.getUsers = this.getUsers.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.validateCpf = this.validateCpf.bind(this);
        this.capitalize = this.capitalize.bind(this);
        this.showAlert = this.showAlert.bind(this);

        this.state = {
            id: '',
            name: '',
            email: '',
            password: '',
            passwordb: '',
            career: '',
            cpf: '',
            pet: '',
            born_date: '',
            alertType: 'alert-warning',
            isAlertHide: 'hidden',
            warningMessage: 'teste',
        }

        //get users data onetime
        this.getUsers();
    }
    
    getUsers() {
        api.post('api/v1/getuser', {} ,{ headers: { 
            "content-type": "application/json",
            Authorization: "Bearer" + localStorage.getItem('token')
        } })
        .then( (response) => {
            this.setState({
                name: response.data.currentUser.name,
                id: response.data.currentUser.id,
                email: response.data.currentUser.email,
                career: response.data.currentUser.career,
                cpf: response.data.currentUser.cpf,
                pet: response.data.currentUser.pet,
                born_date: response.data.currentUser.born_date,
            });
            
        })
        .catch((error) => {
            console.log(error);
        });
    }

    onChangeName(e) {
        e.target.value = this.capitalize(e.target.value);
        this.setState({ name: e.target.value });
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    onChangeCareer(e) {
        e.target.value = this.capitalize(e.target.value);
        this.setState({ career: e.target.value });
    }

    onChangeCpf(e) {
        e.target.value = this.validateCpf(e.target.value);
        this.setState({ cpf: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    onChangePasswordb(e) {
        this.setState({ passwordb: e.target.value });
    }

    onChangePet(e) {
        e.target.value = this.capitalize(e.target.value);
        this.setState({ pet: e.target.value })
    }

    onChangeBornDate(e) {
        this.setState({ born_date: e.target.value });
    }

    showAlert(msg, type){
        this.setState({ isAlertHide: 'show', warningMessage: msg, alertType: type });
    }

    validateCpf(v){
        v=v.replace(/\D/g,"")                    
        v=v.replace(/(\d{3})(\d)/,"$1.$2")       
        v=v.replace(/(\d{3})(\d)/,"$1.$2")        
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") 
        return v
    }

    capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    handleUpdate(e) {
        e.preventDefault();
        
        const data = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordb: this.state.passwordb,
            career: this.state.career,
            cpf: this.state.cpf,
            pet: this.state.pet,
            born_date: this.state.born_date,
        };
        
        try {
            api.put('api/v1/update', data,
            { headers: { 
                "content-type": "application/json",
                Authorization: "Bearer" + localStorage.getItem('token')
            } }).then(async (res) => {
                if(res.data){
                    this.showAlert("O usuário foi atualizado", "alert-success");
                    setTimeout(function(){ 
                        this.props.history.push('/');
                    }.bind(this), 3000);
                }
            }).catch(function (error) {
                if(error !== undefined){
                    if (error.response.status === 400) {
                        let temp;
                        if(error.response.data !== undefined) {   
                            temp = Object.values(error.response.data);
                            this.showAlert(temp, "alert-danger");
                        }
                    }else if (error.response.status === 500) {
                        console.log(error.response.data.error);
                        this.showAlert(error.response.data.error, "alert-danger");
                    }
                }
            }.bind(this));
        } catch(error) {
            this.showAlert(error, "alert-danger");
        }
    }

    handleDelete(e) {
        e.preventDefault();

        try {
            api.post('api/v1/destroy', {},
            { headers: { 
                "content-type": "application/json",
                Authorization: "Bearer" + localStorage.getItem('token')
            } }).then(async (res) => {
                this.showAlert("O usuário foi excluído", "alert-success");
                setTimeout(function(){ 
                    localStorage.clear();
                    this.props.history.push('/');
                }.bind(this), 3000);
            });
        } catch(error) {
            this.showAlert(error, 'alert-danger');
        }
    }

    render (){
        return (
            <React.Fragment>
            <Header />
                <div className="all">
                    <div className='login-form col-10 offset-1 col-md-4 offset-md-4'>
                    <div className="col-12 col-md-12 text-center mb-4">
                        <h2 className="cad-title text-center mb-2">ATUALIZAR DADOS</h2>
                        <label className="text-white small float-left mb-3">Campos com * são obrigatórios</label>
                            <form onSubmit={this.handleUpdate}>
                                <input className="col-12" 
                                    type="text" 
                                    placeholder="Seu nome *" 
                                    value={this.state.name} 
                                    onChange={ this.onChangeName } />

                                <input className="col-12" 
                                    type="email" 
                                    placeholder="Seu melhor email*" 
                                    value={this.state.email}
                                    onChange={this.onChangeEmail} />
                                <input className="col-12" 
                                    type="password" 
                                    placeholder="Digite sua senha*" 
                                    value={this.state.password} 
                                    onChange={ this.onChangePassword }/>

                                <input className="col-12" 
                                    type="password" 
                                    placeholder="Digite a senha novamente*" 
                                    value={this.state.passwordb } 
                                    onChange={ this.onChangePasswordb }/>

                                <input className="col-12" 
                                    type="text" 
                                    placeholder="Sua profissão*" 
                                    value={this.state.career} 
                                    onChange={ this.onChangeCareer } />

                                <input className="col-12" 
                                    type="text" 
                                    placeholder="Seu CPF*" 
                                    value={this.state.cpf} 
                                    onChange={ this.onChangeCpf } />

                                <input className="col-12" 
                                    type="text" 
                                    placeholder="Qual é o seu animal de estimação?" 
                                    value={this.state.pet} 
                                    onChange={ this.onChangePet } />
                                <label className="text-white float-left mb-3">Data de nascimento*</label>
                                <input className="col-12" 
                                    type="date"
                                    value={this.state.born_date} 
                                    onChange={ this.onChangeBornDate } />

                                <div className={this.state.isAlertHide}>
                                    <div className={`alert text-center pt-4 font-weight-bold ${this.state.alertType}`}>
                                        <p>{this.state.warningMessage}</p>
                                    </div>
                                </div>

                                <button className="btn col-12 btn-primary mb-3 mt-2" type="submit">
                                    ATUALIZAR
                                </button>

                                <button className="btn col-12 btn-danger" onClick={this.handleDelete}>
                                    EXCLUIR
                                </button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}