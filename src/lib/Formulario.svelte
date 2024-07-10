<script>
// @ts-nocheck
  import {Currency} from 'stwui';
  import CustosExtras from "./CustosExtras.svelte";
  import RangeInput from "./RangeInput.svelte";
  import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
  import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";
  import { v4 as uuid } from "uuid";
  let tecidoCusto ;
  let taxaAproveitamento = 70;
  let pesoInfanto ;
  let pesoNormal ;
  let pesoPS ;
  let tempoInfanto ;
  let tempoNormal ;
  let tempoPS ;
  let salario ;
  let cargaHoraria ;
  let impostoSalario = 40;
  let contaLuz ;
  let contaAgua ;
  let custosExtras = [];
  let valorCustosAdicionais ; 
  let value;
  function calculaPrecoTecido(peso, tecidoCusto, taxaAproveitamento) {
    if(!peso || !tecidoCusto)
        return 0;
    return (tecidoCusto * peso) / (taxaAproveitamento * 10);
  }

  function calculaSalarioPorHora(salario, cargaHoraria, imposto){
    return (salario * (1 + (imposto/100)))/cargaHoraria 
  }

  function calculaCustoSalario(tempoGasto, custoFuncionarioPorHora){
    if(!tempoGasto || !custoFuncionarioPorHora)
        return '0.00';
    return ((custoFuncionarioPorHora/60) * tempoGasto).toFixed(2)
  }

  function calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoGasto){
    if(!contaAgua || !contaLuz || !cargaHoraria || !tempoGasto)
        return '0.00';
    
    return ((((parseFloat(contaAgua) + parseFloat(contaLuz))/parseFloat(cargaHoraria))/60) * parseFloat(tempoGasto)).toFixed(2)
  }

  function adicionaCusto(event) {
    if (!event.detail.nome && !event.detail.valor) return;
    custosExtras = [
      ...custosExtras,
      {
        id: uuid(),
        nome: event.detail.nome,
        valor: event.detail.valor,
      },
    ];
    
  }

  function removeCusto(event) {
    custosExtras = custosExtras.filter((custo) => custo.id !== event.detail.id);
  }

  function calculaTotalAdicionais(event) {
    let arr = event.detail.custosExtras;

    if (arr.length == 0) {
      valorCustosAdicionais = '0.00';
    } else {
      let total = 0;

      for (let i = 0; i < arr.length; i++) {
        total += parseFloat(arr[i].valor);
      }
      valorCustosAdicionais = total;
    }
  }

  function calculaPrecoTotal(
    precoTecido,
    precoMaoDeObra,
    precoLuzAgua,
    preçoEmbalagem,
    preçoEtiqueta,
    custosExtras
  ) {
    return (
      parseFloat(precoTecido) +
      parseFloat(precoMaoDeObra) +
      parseFloat(precoLuzAgua) +
      parseFloat(preçoEmbalagem) +
      parseFloat(preçoEtiqueta) +
      parseFloat(custosExtras)
    ).toFixed(2);
  }
</script>

<body>
  <header>
    <h1>Calculo de preço de custo</h1>
  </header>
  <div class="grid-container">
    <ul></ul>

    <div class="form">
      <form action="">
        <div class="form-valores">
          <h2>Tecido</h2>
          <table>
            <tr>
              <td><h4>Preço por KG</h4></td>
              <td><h4>Taxa de aproveitamento do tecido ({taxaAproveitamento} %)</h4></td>
            </tr>
            <tr>
              <td><Currency bind:value={tecidoCusto} type="text" /></td>
              <td><div  class="slider-box">
                <RangeInput on:change={(e) => value = e.detail.value} id="basic-slider" 
                    bind:value={taxaAproveitamento}
                    min = {0}
                    max = {100}
                    />
            </div></td>
            </tr>
          </table>
        </div>
        <div class="form-valores">
          <h2>Peso por peça (g)</h2>
          <table>
            <tr>
              <td>Infanto</td>
              <td>Normal</td>
              <td>PS</td>
            </tr>
            <tr>
              <td><input bind:value={pesoInfanto} type="text" /></td>
              <td><input bind:value={pesoNormal} type="text" /></td>
              <td><input bind:value={pesoPS} type="text" /></td>
            </tr>
          </table>
        </div>
        <div class="form-valores">
          <h2>Tempo gasto por peça em minutos</h2>
          <table>
            <tr>
              <td>Infanto</td>
              <td>Normal</td>
              <td>PS</td>
            </tr>
            <tr>
              <td><input bind:value={tempoInfanto} type="text" /></td>
              <td><input bind:value={tempoNormal} type="text" /></td>
              <td><input bind:value={tempoPS} type="text" /></td>
            </tr>
          </table>
        </div>
        <div class="form-valores">
          <h2>Salário dos funcionarios</h2>
          <table>
            <tr>
              <td>Salário</td>
              <td>Carga horaria mensal</td>
              <td>Taxa de imposto ({impostoSalario} %)</td>
            </tr>
            <tr>
              <td><Currency bind:value={salario} type="text" /></td>
              <td><input bind:value={cargaHoraria} type="text" /></td>
              
              <td><div class="slider-box">
                <div class="slider">    
                    <RangeInput on:change={(e) => value = e.detail.value} id="basic-slider" 
                        bind:value={impostoSalario}
                        min = {0}
                        max = {100}
                    />
            </tr>
          </table>
        </div>
        <div class="form-valores">
          <h2>Contas</h2>
          <table>
            <tr>
              <td>luz</td>
              <td>Água</td>
            </tr>
            <tr>
              <td><Currency bind:value={contaLuz} type="text" /></td>
              <td><Currency bind:value={contaAgua} type="text" /></td>
            </tr>
          </table>
        </div>
        <CustosExtras
          {custosExtras}
          on:addCusto={adicionaCusto}
          on:removeCusto={removeCusto}
          on:calculaTotal={calculaTotalAdicionais}
        ></CustosExtras>
      </form>
    </div>
    <div class="resultados">
      <div>
        <h2>Resultados</h2>
        <table>
          <tr>
            <td class="blank"></td>
            <td><h3>Infanto</h3></td>
            <td><h3>Normal</h3></td>
            <td><h3>PS</h3></td>
          </tr>
          <tr>
            <td><h3>Tecido</h3></td>
            <td>R$ {calculaPrecoTecido(pesoInfanto, tecidoCusto, taxaAproveitamento).toFixed(2)}</td>
            <td>R$ {calculaPrecoTecido(pesoNormal, tecidoCusto, taxaAproveitamento).toFixed(2)}</td>
            <td>R$ {calculaPrecoTecido(pesoPS, tecidoCusto, taxaAproveitamento).toFixed(2)}</td>
          </tr>
          <tr>
            <td><h3>Custos Adicionais</h3></td>
            <td>R$ {valorCustosAdicionais}</td>
          </tr>
          <tr>
            <td><h3>Salário</h3></td>
            <td>R$ {calculaCustoSalario(tempoInfanto, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario))}</td>
            <td>R$ {calculaCustoSalario(tempoNormal, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario))}</td>
            <td>R$ {calculaCustoSalario(tempoPS, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario))}</td>
          </tr>
          <tr>
            <td><h3>Luz e Água</h3></td>
            <td>R$ {calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoInfanto)}</td>
            <td>R$ {calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoNormal)}</td>
            <td>R$ {calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoPS)}</td>
          </tr>
          <tr>
            <td><h3>Total</h3></td>
            <td
              >R$ {calculaPrecoTotal(
                calculaPrecoTecido(pesoInfanto, tecidoCusto, taxaAproveitamento),
                calculaCustoSalario(tempoInfanto, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario)),
                calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoInfanto),
                0,
                0,
                valorCustosAdicionais
              )}
            </td>
            <td>R$ {calculaPrecoTotal(
                calculaPrecoTecido(pesoNormal, tecidoCusto, taxaAproveitamento),
                calculaCustoSalario(tempoNormal, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario)),
                calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoNormal),
                0,
                0,
                valorCustosAdicionais
              )}
            </td>
            <td>R$ {calculaPrecoTotal(
                calculaPrecoTecido(pesoPS, tecidoCusto, taxaAproveitamento),
                calculaCustoSalario(tempoPS, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario)),
                calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoNormal),
                0,
                0,
                valorCustosAdicionais
              )}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <footer>
        <p class="footer-text">@copyright</p>
        <div class="links">
            <a href="https://github.com/FelippePaulo" target="_blank">
                <button class="footer-link">
                    <img src="src\assets\github.png" alt="#">
                </button>
            </a>
        </div>
       
    </footer>
  </div>
</body>

<style lang="scss">
   
  body {
    margin: 0;
    font-family:     sans-serif, Times, serif;
    //font-family: "Garamond", Times, serif;
    header {
      grid-area: header;
      background-color: #202020;
      padding: 10px;
      margin-top: 10px;
      text-align: center;
    }
    
    .grid-container {
      width: 99%;
      display: grid;
      grid-template-areas: 'header header'
                            'form result'
                            'footer footer';
      flex-wrap: wrap;
      padding: 10px;
      padding-right: 20px;
      justify-items: center;
   
      .form {
        max-width: 650px;
        grid-area: form;
        background-color:  rgba(0,0,0,.3);
        border: 0px;
        overflow: auto;
        // position: relative;
        padding: 10px;
        border-radius: 20px;
        .form-valores {
          background-color: #303030;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 20px;
        }
        :global(input){
          width: 85%;
          flex: 1;
          background-color: #424242;
          border: 1px solid #4b4b4b;
          padding: 10px;
          color: white;
          border-radius: 20px;
          margin-right: 10px;
        }
        .slider-box{
            width: 200px;
            margin-left: 0px;
        }
      }
      .resultados {
        text-align: center;
        grid-area: result;
        min-width: 400px;
        max-height: 570px;
        width: 30%;
        border: 1px solid #ccc;
        background-color:  rgba(0,0,0,.3);
        border: 0px solid #4b4b4b;
        border-radius: 20px;
        padding: 10px;
        font-family: "Garamond", Times, serif;
        div {
          background-color: #303030;
          padding: 10px;
          border-radius: 20px;
          table {
            width: 100%;
          
            tr{
                background-color: #4b4b4b;
            }
            tr:nth-of-type(even) {
                background-color: #1a1919;
            }
            td {
                
                padding: 8px 10px;
                min-width: 60px;
              
            }
            .blank{
                background-color: #303030;
            }
          }
        }
      }
      footer{
        text-align: center;
        grid-area: footer;
        height: 100px;
        margin-top: 20px;
        width: 100%;
        //border-top: solid 1px;
        background-color:  rgba(0,0,0,.1);
        display: grid;
        grid-template-areas: 'texto links';
        .footer-text{
            grid-area: texto;
            margin-top: 35px;
        }
        .links{
            grid-area: links;
            margin-top: 25px;
        }
        a .footer-link{
            background: transparent !important;
            position: relative;
            cursor: pointer;
            border: 0px;
             img{
                width: 50px;
            }
            
        }
        .footer-link:hover{
            transform: scale(1.2);
        }
      }
    }
  }
</style>
