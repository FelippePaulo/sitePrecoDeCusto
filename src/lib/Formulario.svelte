<script>
  import CustosExtras from "./CustosExtras.svelte";
  import Resultados from "./Resultados.svelte";
  import { v4 as uuid } from "uuid";
  let tecidoCusto = 0.0;
  let taxaAproveitamento = 70;
  let pesoInfanto = "";
  let pesoNormal = "";
  let pesoPS = "";
  let tempoInfanto = "";
  let tempoNormal = "";
  let tempoPS = "";
  let salario = "";
  let cargaHoraria = "";
  let impostoSalario = 40;
  let contaLuz = "";
  let contaAgua = "";
  let custosExtras = [];
  let inputNomeCustoExtra;
  let inputValorCustoExtra;
  let valorCustosAdicionais = 0;

  function calculaPrecoTecido(peso) {
    return (tecidoCusto * peso) / (taxaAproveitamento * 10);
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
    inputNomeCustoExtra = "";
    inputValorCustoExtra = "";
  }

  function removeCusto(event) {
    custosExtras = custosExtras.filter((custo) => custo.id != event.detail.id);
    
  }

  function calculaTotalAdicionais(event) {
   
    let arr = event.detail.custosExtras;
   
    if (arr.length == 0) {
      valorCustosAdicionais = 0;
      
    }else{
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
      precoTecido +
      precoMaoDeObra +
      precoLuzAgua +
      preçoEmbalagem +
      preçoEtiqueta +
      custosExtras
    );
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
            <td></td>
            <td><h3>Infanto</h3></td>
            <td><h3>Normal</h3></td>
            <td><h3>PS</h3></td>
          </tr>
          <tr>
            <td><h3>Tecido</h3></td>
            <td>{calculaPrecoTecido(pesoInfanto)}</td>
            <td>{calculaPrecoTecido(pesoNormal)}</td>
            <td>{calculaPrecoTecido(pesoPS)}</td>
          </tr>
          <tr>
            <td><h3>Custos Adicionais</h3></td>
            <td>{valorCustosAdicionais}</td>
          </tr>
          <tr>
            <td><h3>Total</h3></td>
            <td
              >{calculaPrecoTotal(
                calculaPrecoTecido(pesoInfanto),
                0,
                0,
                0,
                0,
                valorCustosAdicionais
              )}</td
            >
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</body>

<style lang="scss">
  body {
    header {
      display: block;
      text-align: center;
    }
    .container {
      display: block;
      position: inherit;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      align-items: baseline;
      padding-right: 20px;
      .form {
        background-color: #424242;
        border: 1px solid #4b4b4b;
        overflow: auto;
        position: relative;
        margin-right: 100px;
        padding: 10px;
        border-radius: 5px;
        .form-valores {
          background-color: #303030;
          margin-bottom: 10px;
          align-items: center;
          padding: 10px;
          border-radius: 5px;
        }
        input {
          flex: 1;
          background-color: #424242;
          border: 1px solid #4b4b4b;
          padding: 10px;
          color: white;
          border-radius: 5px;
          margin-right: 10px;
        }
      }
      .resultados {
        border: 1px solid #ccc;
        background-color: #424242;
        border: 1px solid #4b4b4b;
        border-radius: 5px;
        padding: 10px;
        max-width: 350px;
        flex: 1;
        align-items: center;
        right: 15px;
        div {
          background-color: #303030;
          padding: 10px;
          table {
            border: solid 1px;

            td {
              padding: 10px;
              border: solid 1px;
            }
          }
        }
      }
    }
  }
</style>
