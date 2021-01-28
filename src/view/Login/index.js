import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Header from '../../components/Header';
import api from '../../services/api';
import './styles.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isHide, setIsHide] = useState('hidden');
    const [errorMessage, setWarningMessage] = useState('');
    
    const history = useHistory();

    async function handleLogin(e) {
        //block reload page
        e.preventDefault();

        try {
            const response = await api.post('api/login', { email, password });
            //using localStorage to save user token
            localStorage.setItem('token', response.data.token);
            history.push('/');
        } catch (erro) {
            setIsHide(null);
            setWarningMessage("Seu email ou senha estão incorretos");
        }
    }

    return (
        <React.Fragment>
            <Header />
            <div className="all">
                <div className='login-form col-10 offset-1 col-md-4 offset-md-4'>
                    <section className="row">
                        <form onSubmit={handleLogin} className="col-12">
                            <h3 className="login-text text-center mb-4">Bem vindo de volta</h3>
                            <input className="col-12" type="email" placeholder="Informe seu e-mail" value={email} onChange={ e => setEmail(e.target.value) } />
                            <input className="col-12" type="password" placeholder="Informe sua senha" value={password} onChange={ e => setPassword(e.target.value) }/>
                            <div className=" mb-2">
                                <Link className="default-link small" to="/recover">
                                   Esqueceu sua senha?
                                </Link>
                            </div>
                            <div className={isHide}>
                                <div className={`alert alert-danger text-center pt-4 font-weight-bold`}>
                                    <p>{errorMessage}</p>
                                </div>
                            </div>
                            <button className="btn btn-primary mb-4" type="submit">
                                LOGIN
                            </button><br/>
                            <div className="float-right">
                                <Link className="default-link" to="/register">
                                    <FiLogIn className="rounded-icon" size={35} color="#ffffff" />
                                    &nbsp; Ainda não sou cadastrado
                                </Link>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </React.Fragment>
    );
}