import React, { useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import './styles.css';

export default function Register() {
    const [results, setResults] = useState('');
    const [search, setSearch] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [isHide, setIsHide] = useState('hidden');
    //const history = useHistory();

    async function handleSearch(e) {
        //block reload page
        e.preventDefault();

        const data = {
            search,
            day,
            month,
            year
        };

        try {
            api.post('api/search', data).then(async (res) => {
                setResults(res.data.results);
                setIsHide(null);
            });
        } catch(err) {
            alert(err);
        }
    }

   
    return (
        <React.Fragment>
            <Header />
            <div className="home-form">
                <div className='login-form col-10 offset-1 col-md-4 offset-md-4'>
                    <section className="row">
                        <form className="col-12" onSubmit={handleSearch}>
                        <h2 className="cad-title text-center mb-4">FAÇA UMA BUSCA</h2>
                            <label  className="text-white mb-3">Você pode buscar por nome e/ou profissão</label>
                            <input className="col-12" 
                                type="text" 
                                placeholder="Digite sua busca" 
                                value={search} 
                                onChange={ e => setSearch(e.target.value) } />
                            
                            <label  className="text-white mb-3">Filtros por data de nascimento</label>
                            <div className="row pl-3">
                                <select className="custom-select col-md-12 col-12"
                                    value={day} 
                                    onChange={ e => setDay(e.target.value) }
                                >
                                    <option value="" selected>Dia</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select className="custom-select col-md-12 col-12"
                                    value={month}
                                    onChange={ e => setMonth(e.target.value) }
                                    >
                                    <option value="" selected>Mês</option>
                                    <option value="01">Jan</option>
                                    <option value="02">Fev</option>
                                    <option value="03">Mar</option>
                                    <option value="04">Abr</option>
                                    <option value="05">Mai</option>
                                    <option value="06">Jun</option>
                                    <option value="07">Jul</option>
                                    <option value="08">Ago</option>
                                    <option value="09">Set</option>
                                    <option value="10">Out</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dez</option>
                                </select>
                                <input className="col-md-12 col-12" 
                                    type="number" 
                                    placeholder="Informe o ano" 
                                    value={year} 
                                    onChange={ e => setYear(e.target.value) } />
                            </div>
                            <div className="text-center mt-3">
                                <button className="btn btn-primary" type="submit">
                                    FAZER BUSCA
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
            <div className={isHide}>
                <div className="home-result" >
                    <div className='login-form col-10 offset-1 col-md-4 offset-md-4'>
                        <section className="col-12 rm-pd">
                            <h5 className="cad-title text-center mb-4">RESULTADOS CORRESPONDENTES</h5>

                            <div className="col-12 rm-pd">
                            { results.length > 0 ? results.map((result) => 
                            (
                                <div className="user row text-left mt-3" key={result.id}>
                                    <h4 className="user-name cad-title col-12">{result.name}</h4>
                                    <div className="user-name small col-12">{result.born_date} | {result.cpf} | {result.career}</div> 
                                    <div className="user-name small col-12">{result.email}</div> 
                                    <div className="user-name small col-12">{result.pet}</div> 
                                    
                                </div>
                            )) : (
                                <div className="">
                                    <p className="text-center small">
                                        Não encontramos nenhum registro correspondente :/<br/>
                                        Tente fazer uma nova busca
                                    </p>
                                </div>
                            ) }
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </React.Fragment>
      );
    }