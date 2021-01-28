import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import './styles.css';

export default function NewPassword() {
    const [password, setPassword] = useState('');
    const [passwordb, setPasswordb] = useState('');
    const [isHide, setIsHide] = useState('hidden');
    const [errorMessage, setWarningMessage] = useState('');
    const [alertType, setAlertType] = useState('alert-danger');


    const history = useHistory();
    const {token} = useParams();

    async function handleReset(e) {
        //block reload page
        e.preventDefault();

        try {
            const response = await api.post('api/renew', { password, passwordb, token });
            setIsHide(null);
            setAlertType('alert-success');
            setWarningMessage(response.data[1]);
        } catch (erro) {
            setIsHide(null);
            setAlertType('alert-danger');
            setWarningMessage(erro.response.data[1]);
        }
    }
    
    return (
        <React.Fragment>
            <Header />
            <div className="all">
                <div className='login-form col-10 offset-1 col-md-4 offset-md-4'>
                    <section className="row ">
                        <form onSubmit={handleReset} className="col-12">
                            <h3 className="login-text text-center mb-4">Escolha uma nova senha</h3>
                            <input className="col-12" 
                                    type="password" 
                                    placeholder="Digite sua senha*" 
                                    value={password} 
                                    onChange={ e => setPassword(e.target.value) }/>

                                <input className="col-12" 
                                    type="password" 
                                    placeholder="Digite a senha novamente*" 
                                    value={passwordb} 
                                    onChange={ e => setPasswordb(e.target.value) }/>
                            <div className="text-center mt-2">

                                <div className={isHide}>
                                    <div className={`alert text-center pt-4 font-weight-bold ${alertType}`}>
                                        <p>{errorMessage}</p>
                                    </div>
                                </div>
                                <button className="btn btn-primary mb-211" type="submit">
                                    Recuperar
                                </button>
                            </div>
                            
                        </form>
                    </section>
                </div>
            </div>
        </React.Fragment>
    );
}