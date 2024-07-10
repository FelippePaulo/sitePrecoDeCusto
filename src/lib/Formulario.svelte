<script>
  import CustosExtras from "./CustosExtras.svelte";
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
        return 0;
    return ((custoFuncionarioPorHora/60) * tempoGasto).toFixed(2)
  }

  function calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoGasto){
    if(!contaAgua || !contaLuz || !cargaHoraria || !tempoGasto)
        return 0;
    
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
      valorCustosAdicionais = 0;
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
  <div class="container">
    <ul></ul>

    <div class="form">
      <form action="">
        <div class="form-valores">
          <h2>Tecido</h2>
          <table>
            <tr>
              <td><h4>Preço por KG</h4></td>
              <td><h4>Taxa de aproveitamento do tecido</h4></td>
            </tr>
            <tr>
              <td><input bind:value={tecidoCusto} type="text" /></td>
              <td
                ><input
                  class="slider"
                  bind:value={taxaAproveitamento}
                  type="range"
                  min="0"
                  max="100"
                />{taxaAproveitamento}%</td
              >
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
              <td>Carga horaria</td>
              <td>taxa de imposto</td>
            </tr>
            <tr>
              <td><input bind:value={salario} type="text" /></td>
              <td><input bind:value={cargaHoraria} type="text" /></td>
              <td
                ><input
                  bind:value={impostoSalario}
                  type="range"
                  min="0"
                  max="100"
                />{impostoSalario}%</td
              >
            </tr>
          </table>
        </div>
        <div class="form-valores">
          <h2>Contas</h2>
          <table>
            <tr>
              <td>luz</td>
              <td>Agua</td>
            </tr>
            <tr>
              <td><input bind:value={contaLuz} type="text" /></td>
              <td><input bind:value={contaAgua} type="text" /></td>
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
            <td>{calculaPrecoTecido(pesoInfanto, tecidoCusto, taxaAproveitamento)}</td>
            <td>{calculaPrecoTecido(pesoNormal, tecidoCusto, taxaAproveitamento)}</td>
            <td>{calculaPrecoTecido(pesoPS, tecidoCusto, taxaAproveitamento)}</td>
          </tr>
          <tr>
            <td><h3>Custos Adicionais</h3></td>
            <td>{valorCustosAdicionais}</td>
          </tr>
          <tr>
            <td><h3>Salário</h3></td>
            <td>{calculaCustoSalario(tempoInfanto, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario))}</td>
            <td>{calculaCustoSalario(tempoNormal, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario))}</td>
            <td>{calculaCustoSalario(tempoPS, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario))}</td>
          </tr>
          <tr>
            <td><h3>Luz e Água</h3></td>
            <td>{calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoInfanto)}</td>
            <td>{calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoNormal)}</td>
            <td>{calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoPS)}</td>
          </tr>
          <tr>
            <td><h3>Total</h3></td>
            <td
              >{calculaPrecoTotal(
                calculaPrecoTecido(pesoInfanto, tecidoCusto, taxaAproveitamento),
                calculaCustoSalario(tempoInfanto, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario)),
                calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoInfanto),
                0,
                0,
                valorCustosAdicionais
              )}
            </td>
            <td>{calculaPrecoTotal(
                calculaPrecoTecido(pesoNormal, tecidoCusto, taxaAproveitamento),
                calculaCustoSalario(tempoNormal, calculaSalarioPorHora(salario, cargaHoraria, impostoSalario)),
                calculaCustoLuzEAgua(contaAgua,contaLuz,cargaHoraria,tempoNormal),
                0,
                0,
                valorCustosAdicionais
              )}
            </td>
            <td>{calculaPrecoTotal(
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
  </div>
</body>

<style lang="scss">
  body {
    margin: 0;
    font-family:     sans-serif, Times, serif;
    header {
        position: static;
      background-color: #202020;
      padding: 10px;
      margin-top: 10px;
      text-align: center;
    }
    .container:before,
    .container:after {
      content: "";
      display: table;
    }
    .container:after {
      clear: both;
    }
    .container {
      width: 99%;
      display: table;
      flex-wrap: wrap;
      padding: 10px;
      padding-right: 20px;
    
      .form {
        float: left;
        margin-left: 15%;
        width: 60%;
        max-width: 650px;
        
        background-color:  rgba(0,0,0,.3);
        border: 0px;
        overflow: auto;
        position: relative;
        padding: 10px;
        border-radius: 20px;
        .form-valores {
          background-color: #303030;
          margin-bottom: 10px;
          align-items: center;
          padding: 10px;
          border-radius: 20px;
          font-family:  sans-serif,Times, serif;
        }
        input {
          width: 85%;
          flex: 1;
          background-color: #424242;
          border: 1px solid #4b4b4b;
          padding: 10px;
          color: white;
          border-radius: 20px;
          margin-right: 10px;
        }
      }
      .resultados {
        text-align: center;
        float: right;
        min-width: 400px;
        width: 30%;
        border: 1px solid #ccc;
        background-color:  rgba(0,0,0,.3);
        border: 0px solid #4b4b4b;
        border-radius: 20px;
        padding: 10px;
        flex: 1;
        align-items: center;
        right: 15px;
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
    }
  }
</style>
