import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './styles.css';

export default function Login() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = React.useState("Transitioning...");

    const [email, setEmail] = useState('');
    const [link, setLink] = useState('');
    const [cpf, setCpf] = useState('');
    const history = useHistory();
    const [isHide, setIsHide] = useState('hidden');
    const [errorMessage, setWarningMessage] = useState('');
    const [alertType, setAlertType] = useState('alert-danger');

    async function handleReset(e) {
        //block reload page
        e.preventDefault();

        try {
            const response = await api.post('api/reset', { email, cpf });
            setLink("/reset/" + response.data.token);
            setIsHide(null);
            showModal();
            setAlertType('alert-success');
            setWarningMessage("Link de recuperação gerado");
        } catch (erro) {
            setIsHide(null);
            setAlertType('alert-danger');
            setWarningMessage(erro.response.data);
        }
    }

    function validateCpf(v){
        v=v.replace(/\D/g,"")                    
        v=v.replace(/(\d{3})(\d)/,"$1.$2")       
        v=v.replace(/(\d{3})(\d)/,"$1.$2")        
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") 
        return v
    }

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        setTitle("Transitioning...");
    };

    const modalLoaded = () => {
        setTitle("Modal Ready");
    };

    return (
        <React.Fragment>
            <Header />
            <div className="all">
                <div className='login-form col-10 offset-1 col-md-4 offset-md-4'>
                    <section className="row ">
                        <form onSubmit={handleReset} className="col-12">
                            <h3 className="login-text text-center mb-4">Recuperação de senha</h3>
                            <input className="col-12" type="email" placeholder="Informe seu e-mail" value={email} onChange={ e => setEmail(e.target.value) } />
                            <input className="col-12" type="text" placeholder="Informe seu CPF" maxLength="14" value={cpf} onChange={ e => setCpf(validateCpf(e.target.value)) } />
                            
                            <div className={isHide}>
                                <div className={`alert text-center pt-4 font-weight-bold ${alertType}`}>
                                    <p>{errorMessage}</p>
                                </div>
                            </div>
                            
                            <div className="text-center mt-2">
                                <button className="btn btn-primary mb-211" type="submit">
                                    Recuperar
                                </button>
                            </div>
                            
                        </form>
                    </section>
                </div>
            </div>

            <Modal show={isOpen} onHide={hideModal} onEntered={modalLoaded}>
                <Modal.Header>
                    <Modal.Title>Redefinição de senha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="small">Link para recuperação</div>
                    
                    <Link target="_blank" className="default-link" to={link}>
                        Clique aqui
                    </Link>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={hideModal}>Fechar</button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    );
}