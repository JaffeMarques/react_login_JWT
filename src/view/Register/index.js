import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Header from '../../components/Header';
import './styles.css';
import svgAnimation from './animation.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordb, setPasswordb] = useState('');
    const [isHide, setIsHide] = useState('hidden');
    const [errorMessage, setWarningMessage] = useState('');
    const [career, setCareer] = useState('');
    const [cpf, setCpf] = useState('');
    const [pet, setPet] = useState('');
    const [born_date, setBornDate] = useState('');

    //warning states
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordbError, setPasswordbError] = useState('');
    const [careerError, setCareerError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [bornError, setBornError] = useState('');

    const history = useHistory();

    function validateCpf(v){
        v=v.replace(/\D/g,"")                    
        v=v.replace(/(\d{3})(\d)/,"$1.$2")       
        v=v.replace(/(\d{3})(\d)/,"$1.$2")        
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") 
        return v
    }

    function capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            password,
            passwordb,
            career,
            cpf,
            pet,
            born_date,
        };
        
        try {
            api.post('api/register', data).then(async (res) => {
                if(res.data.status){
                    //login after register
                    const responseLogin = await api.post('api/login', { email, password });
                    localStorage.setItem('token', responseLogin.data.token);
                    //link after login
                    history.push('/');
                }
            }).catch(function (error) {
                setNameError('');
                setEmailError('');
                setPasswordError('');
                setPasswordbError('');
                setCareerError('');
                setBornError('');
                setCpfError('');


                console.log(error.response);
                let generalError = '';
                if(error.response.data.errors){
                    if(error.response.data.errors.name) setNameError(error.response.data.errors.name);
                    if(error.response.data.errors.email) setEmailError(error.response.data.errors.email);
                    if(error.response.data.errors.password) setPasswordError(error.response.data.errors.password);
                    if(error.response.data.errors.passwordb) setPasswordbError(error.response.data.errors.passwordb);
                    if(error.response.data.errors.career) setCareerError(error.response.data.errors.career);
                    if(error.response.data.errors.born_date) setBornError(error.response.data.errors.born_date);
                    if(error.response.data.errors.cpf) setCpfError(error.response.data.errors.cpf);
                }

                if(error.response.data.message){
                    if(error.response.data.message.name) setNameError(error.response.data.message.name);
                    if(error.response.data.message.email) setEmailError(error.response.data.message.email);
                    if(error.response.data.message.pass1) setPasswordError(error.response.data.message.pass1);
                    if(error.response.data.message.pass2) setPasswordbError(error.response.data.message.pass2);
                    if(error.response.data.message.career) setCareerError(error.response.data.message.career);
                    if(error.response.data.message.date) setBornError(error.response.data.message.date);
                    if(error.response.data.message.cpf) setCpfError(error.response.data.message.cpf);
                    if(error.response.data.message.year) generalError = error.response.data.message.year;
                }

                setIsHide(null);
                let temp;
                if(error.response.data.errors) {   
                    temp = error.response.data.msg;
                    setWarningMessage(temp);
                    return 0;
                }
                if(error.response.data.message) {   
                    temp = "Verifique os campos e tente novamente"
                    setWarningMessage(temp);
                    return 0;
                }
            });
        } catch(error) {
            setIsHide(null);
            setWarningMessage(error);
        }
    }

    return (
        <React.Fragment>
            <Header />
            <div className="all">
                <div className='login-form col-10 offset-1 col-md-10 offset-md-1'>
                    <section className="row">
                        <div className="col-12 col-md-6 text-center mb-4">
                            <h1 className="cad-title text-center mb-1">CADASTRO</h1>
                            <p>Faça parte do nosso sistema, cadastra-se agora, é de <strong> graça! </strong></p>
                            <img src={svgAnimation} alt="Cadastre-se" className="col-12 col-md-8 offset-md-2" />
                            <br />
                            <Link className="default-link" to="/login">
                                <FiArrowLeft className="rounded-icon" size={35} color="#ffffff" />
                                &nbsp; Já tenho uma conta
                            </Link>
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="text-white float-right mb-3">Campos com * são obrigatórios</label>
                            <form onSubmit={handleRegister}>
                                <span className="small errorText">{nameError}</span>
                                <input className="col-12" 
                                    type="text" 
                                    placeholder="Seu nome *" 
                                    value={name} 
                                    onChange={ e => setName(capitalize(e.target.value)) } />

                                <span className="small errorText">{emailError}</span>
                                <input className="col-12" 
                                    type="email" 
                                    placeholder="Seu melhor email*" 
                                    value={email} 
                                    onChange={ e => setEmail(e.target.value) } />

                                <span className="small errorText">{passwordError}</span>
                                <input className="col-12" 
                                    type="password" 
                                    placeholder="Digite sua senha*" 
                                    value={password} 
                                    onChange={ e => setPassword(e.target.value) }/>

                                <span className="small errorText">{passwordbError}</span>
                                <input className="col-12" 
                                    type="password" 
                                    placeholder="Digite a senha novamente*" 
                                    value={passwordb} 
                                    onChange={ e => setPasswordb(e.target.value) }/>

                                <span className="small errorText">{careerError}</span>
                                <input className="col-12" 
                                    type="text" 
                                    placeholder="Sua profissão*" 
                                    value={career} 
                                    onChange={ e => setCareer(capitalize(e.target.value)) } />

                                <span className="small errorText">{cpfError}</span>
                                <input className="col-12" 
                                    type="text" 
                                    placeholder="Seu CPF*" 
                                    value={cpf} 
                                    maxLength="14"
                                    onChange={ e => setCpf(validateCpf(e.target.value)) } />

                                <input className="col-12" 
                                    type="text" 
                                    placeholder="Qual é o seu animal de estimação?" 
                                    value={pet} 
                                    onChange={ e => setPet(capitalize(e.target.value)) } />

                                <label className="text-white;">Data de nascimento*</label><br></br>
                                <span className="small errorText">{bornError}</span>
                                <input className="col-12" 
                                    type="date"
                                    selected={born_date} 
                                    onChange={ e => setBornDate(e.target.value)} />

                                <div className={isHide}>
                                    <div className="alert alert-danger text-center pt-4 font-weight-bold">
                                        <p>{errorMessage}</p>
                                    </div>
                                </div>

                                <button className="btn btn-primary mb-4" type="submit">
                                    CADASTRAR
                                </button>
                                
                            </form>
                        </div>
                    </section>
                </div>
            </div>
            </React.Fragment>
    );
}