<script>
  // @ts-nocheck
  import { Currency } from "stwui";
  import CustosExtras from "./CustosExtras.svelte";
  import RangeInput from "./RangeInput.svelte";
  import { v4 as uuid } from "uuid";
  import { onMount } from "svelte";
  import {
    tecidoCusto,
    taxaAproveitamento,
    pesoInfanto,
    pesoNormal,
    pesoPS,
    tempoInfanto,
    tempoNormal,
    tempoPS,
    salario,
    cargaHoraria,
    impostoSalario,
    contaLuz,
    contaAgua,
    custosExtrasStorage,
  } from "../store";
  //let tecidoCusto ;
  //let taxaAproveitamento = 70;
  //   let pesoInfanto ;
  //   let pesoNormal ;
  //   let pesoPS ;
  //   let tempoInfanto ;
  //   let tempoNormal ;
  //   let tempoPS ;
  //   let salario ;
  //   let cargaHoraria ;
  //   let impostoSalario = 40;
  //   let contaLuz ;
  //   let contaAgua ;
  let custosExtras = [];
  let valorCustosAdicionais;
  let value;

  function custosExtrasLoadStorage() {
    if ($custosExtrasStorage != "")
      custosExtras = JSON.parse($custosExtrasStorage);
  }

  function custosExtrasSaveStorage() {
    $custosExtrasStorage = JSON.stringify(custosExtras);
  }

  onMount(async () => {
    custosExtrasLoadStorage();
  });

  function calculaPrecoTecido(peso, tecidoCusto, taxaAproveitamento) {
    if (!peso || !tecidoCusto) return 0;
    return (tecidoCusto * peso) / (taxaAproveitamento * 10);
  }

  function calculaSalarioPorHora(salario, cargaHoraria, imposto) {
    if (!salario || !cargaHoraria || !imposto) return 0;

    return (salario * (1 + imposto / 100)) / cargaHoraria;
  }

  function calculaCustoSalario(tempoGasto, custoFuncionarioPorHora) {
    if (!tempoGasto || !custoFuncionarioPorHora) return "0.00";
    return ((custoFuncionarioPorHora / 60) * tempoGasto).toFixed(2);
  }

  function calculaCustoLuzEAgua(contaAgua, contaLuz, cargaHoraria, tempoGasto) {
    if (!contaAgua || !contaLuz || !cargaHoraria || !tempoGasto) return "0.00";
    console.log(contaAgua, contaLuz, cargaHoraria, tempoGasto);
    return (
      ((parseFloat(contaAgua) + parseFloat(contaLuz)) /
        parseFloat(cargaHoraria) /
        60) *
      parseFloat(tempoGasto)
    ).toFixed(2);
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
    custosExtrasSaveStorage();
    console.log($custosExtrasStorage);
  }

  function removeCusto(event) {
    custosExtras = custosExtras.filter((custo) => custo.id !== event.detail.id);
    custosExtrasSaveStorage();
  }

  function calculaTotalAdicionais(event) {
    let arr = event.detail.custosExtras;

    if (arr.length == 0) {
      valorCustosAdicionais = "0.00";
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
  <div class="grid-container">
    <ul></ul>

    <div class="form">
      <form action="">
        <div class="form-valores">
          <h2>Tecido</h2>

          <div class="td1">Preço por KG</div>
          <div class="td2">
            Taxa de aproveitamento do tecido ({$taxaAproveitamento} %)
          </div>
          <!-- <div class="td3">{$teste}</div> -->
          <div class="inp1">
            <Currency bind:value={$tecidoCusto} type="text" />
          </div>
          <div class="inp2">
            <div class="slider-box">
              <RangeInput
                on:change={(e) => (value = e.detail.value)}
                id="basic-slider"
                bind:value={$taxaAproveitamento}
                min={0}
                max={100}
              />
              <!-- <div class="inp3"><input type="text" bind:value={$teste}></div> -->
            </div>
          </div>
        </div>
        <div class="form-valores">
          <h2>Peso por peça (g)</h2>
          <div class="td1">Infanto</div>
          <div class="td2">Normal</div>
          <div class="td3">PS</div>

          <div class="inp1">
            <input bind:value={$pesoInfanto} type="text" />
          </div>
          <div class="inp2"><input bind:value={$pesoNormal} type="text" /></div>
          <div class="inp3"><input bind:value={$pesoPS} type="text" /></div>
        </div>
        <div class="form-valores">
          <h2>Tempo gasto por peça em minutos</h2>
          <div class="td1">Infanto</div>
          <div class="td2">Normal</div>
          <div class="td3">PS</div>

          <div class="inp1">
            <input bind:value={$tempoInfanto} type="text" />
          </div>
          <div class="inp2">
            <input bind:value={$tempoNormal} type="text" />
          </div>
          <div class="inp3"><input bind:value={$tempoPS} type="text" /></div>
        </div>
        <div class="form-valores">
          <h2>Salário dos funcionarios</h2>
          <div class="td1">Salário</div>
          <div class="td2">Carga horaria mensal</div>
          <div class="td3">Taxa de imposto ({$impostoSalario} %)</div>

          <div class="inp1"><Currency bind:value={$salario} type="text" /></div>
          <div class="inp2">
            <input bind:value={$cargaHoraria} type="text" />
          </div>

          <div class="inp3">
            <div class="slider-box">
              <div class="slider">
                <RangeInput
                  on:change={(e) => (value = e.detail.value)}
                  id="basic-slider"
                  bind:value={$impostoSalario}
                  min={0}
                  max={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="form-valores">
          <h2>Contas</h2>
          <div class="td1">luz</div>
          <div class="td2">Água</div>

          <div class="inp1">
            <Currency bind:value={$contaLuz} type="text" />
          </div>
          <div class="inp2">
            <Currency bind:value={$contaAgua} type="text" />
          </div>
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
            <td
              >R$ {calculaPrecoTecido(
                $pesoInfanto,
                $tecidoCusto,
                $taxaAproveitamento
              ).toFixed(2)}</td
            >
            <td
              >R$ {calculaPrecoTecido(
                $pesoNormal,
                $tecidoCusto,
                $taxaAproveitamento
              ).toFixed(2)}</td
            >
            <td
              >R$ {calculaPrecoTecido(
                $pesoPS,
                $tecidoCusto,
                $taxaAproveitamento
              ).toFixed(2)}</td
            >
          </tr>
          <tr>
            <td><h3>Custos Adicionais</h3></td>
            <td>R$ {valorCustosAdicionais}</td>
          </tr>
          <tr>
            <td><h3>Salário</h3></td>
            <td
              >R$ {calculaCustoSalario(
                $tempoInfanto,
                calculaSalarioPorHora($salario, $cargaHoraria, $impostoSalario)
              )}</td
            >
            <td
              >R$ {calculaCustoSalario(
                $tempoNormal,
                calculaSalarioPorHora($salario, $cargaHoraria, $impostoSalario)
              )}</td
            >
            <td
              >R$ {calculaCustoSalario(
                $tempoPS,
                calculaSalarioPorHora($salario, $cargaHoraria, $impostoSalario)
              )}</td
            >
          </tr>
          <tr>
            <td><h3>Luz e Água</h3></td>
            <td
              >R$ {calculaCustoLuzEAgua(
                $contaAgua,
                $contaLuz,
                $cargaHoraria,
                $tempoInfanto
              )}</td
            >
            <td
              >R$ {calculaCustoLuzEAgua(
                $contaAgua,
                $contaLuz,
                $cargaHoraria,
                $tempoNormal
              )}</td
            >
            <td
              >R$ {calculaCustoLuzEAgua(
                $contaAgua,
                $contaLuz,
                $cargaHoraria,
                $tempoPS
              )}</td
            >
          </tr>
          <tr>
            <td><h3>Total</h3></td>
            <td
              >R$ {calculaPrecoTotal(
                calculaPrecoTecido(
                  $pesoInfanto,
                  $tecidoCusto,
                  $taxaAproveitamento
                ),
                calculaCustoSalario(
                  $tempoInfanto,
                  calculaSalarioPorHora(
                    $salario,
                    $cargaHoraria,
                    $impostoSalario
                  )
                ),
                calculaCustoLuzEAgua(
                  $contaAgua,
                  $contaLuz,
                  $cargaHoraria,
                  $tempoInfanto
                ),
                0,
                0,
                valorCustosAdicionais
              )}
            </td>
            <td
              >R$ {calculaPrecoTotal(
                calculaPrecoTecido(
                  $pesoNormal,
                  $tecidoCusto,
                  $taxaAproveitamento
                ),
                calculaCustoSalario(
                  $tempoNormal,
                  calculaSalarioPorHora(
                    $salario,
                    $cargaHoraria,
                    $impostoSalario
                  )
                ),
                calculaCustoLuzEAgua(
                  $contaAgua,
                  $contaLuz,
                  $cargaHoraria,
                  $tempoNormal
                ),
                0,
                0,
                valorCustosAdicionais
              )}
            </td>
            <td
              >R$ {calculaPrecoTotal(
                calculaPrecoTecido($pesoPS, $tecidoCusto, $taxaAproveitamento),
                calculaCustoSalario(
                  $tempoPS,
                  calculaSalarioPorHora(
                    $salario,
                    $cargaHoraria,
                    $impostoSalario
                  )
                ),
                calculaCustoLuzEAgua(
                  $contaAgua,
                  $contaLuz,
                  $cargaHoraria,
                  $tempoNormal
                ),
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
    font-family: sans-serif, Times, serif;
    //font-family: "Garamond", Times, serif;

    .grid-container {
      width: 99%;
      display: grid;
      grid-template-areas: "form result";
      flex-wrap: wrap;
      padding: 10px;
      padding-right: 20px;
      justify-items: center;

      .form {
        max-width: 650px;
        grid-area: form;
        background-color: rgba(0, 0, 0, 0.3);
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
          display: grid;
          grid-template-areas:
            "title title title"
            "td1 td2 td3"
            "inp1 inp2 inp3";
          h2 {
            grid-area: title;
          }
          .td1 {
            grid-area: td1;
          }
          .td2 {
            grid-area: td2;
          }
          .td3 {
            grid-area: td3;
          }
          .inp1 {
            grid-area: inp1;
          }
          .inp2 {
            grid-area: inp2;
          }
          .inp3 {
            grid-area: inp3;
          }
        }

        :global(input) {
          width: 85%;
          flex: 1;
          background-color: #424242;
          border: 1px solid #4b4b4b;
          padding: 10px;
          color: white;
          border-radius: 20px;
          margin-right: 10px;
          margin-top: 5px;
        }
        .slider-box {
          width: 200px;
          margin-left: 0px;
        }
      }
      .resultados {
        text-align: center;
        grid-area: result;
        min-width: 400px;
        max-height: 465px;
        width: 30%;
        border: 1px solid #ccc;
        background-color: rgba(0, 0, 0, 0.3);
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

            tr {
              background-color: #4b4b4b;
            }
            tr:nth-of-type(even) {
              background-color: #1a1919;
            }
            http://localhost:5173/
              td {
              padding: 8px 10px;
              min-width: 60px;
            }
            .blank {
              background-color: #303030;
            }
          }
        }
      }
    }
  }
  @media (max-width: 1000px) {
    body {
      .grid-container {
        grid-template-areas:
          "form"
          "result";
        .form {
          width: 95%;
          min-width: 50px;
          .form-valores {
            min-width: 0px;
            display: grid;
            grid-template-areas:
              "title"
              "td1"
              "inp1"
              "td2"
              "inp2"
              "td3"
              "inp3";
          }
          .form-valores div {
            margin-top: 10px;
          }
          .slider-box {
            width: 200px;
            margin-left: 0px;
            justify-content: top;
          }
          :global(input) {
            width: 95%;
          }
        }
        .resultados {
          margin-top: 30px;
          width: 95%;
          max-width: 650px;
        }
      }
    }
  }
</style>
