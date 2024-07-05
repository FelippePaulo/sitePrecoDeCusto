<script>
  import { v4 as uuid } from "uuid";
  import Button from "./Button.svelte";
  // @ts-ignore
  import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";
  import { afterUpdate, createEventDispatcher } from "svelte";

  export let custosExtras = [];
  let inputNomeCustoExtra;
  let inputValorCustoExtra;
  const dispatch = createEventDispatcher();

  afterUpdate(() => {
    calculaTotal();
  });

  function adicionaCusto() {
    dispatch(
      "addCusto",
      {
        nome: inputNomeCustoExtra,
        valor: inputValorCustoExtra,
      },
      { cancelable: true }
    );
  }
  function removeCusto(id) {
    dispatch(
      "removeCusto",
      {
        id,
      },
      { cancelable: true }
    );
  }
  function calculaTotal() {
    dispatch("calculaTotal", {
      custosExtras,
    });
  }

  // function getTotalCustosExtras(){
  //     dispatch('getTotal', {
  //         valorCustosAdicionais
  //     },{cancelable:true})
  // }
</script>

<div>
  <h2>Custos extras por peça</h2>
  <div class="custosExtras-list-wrapper">
    <div class="list-custosExtras">
      {#if custosExtras.length == 0}
        <p class="no-items-text">Sem Custos extras adicionados</p>
      {/if}
      <ul>
        {#each custosExtras as { id, nome, valor }}
          <li>
            {nome} - {valor}
            <button
              class="remove-custoExtra-button"
              aria-label="Remover custo: {nome}"
              on:click|preventDefault
              on:click={() => removeCusto(id)}
            >
              <span style:width="10px" style:display="inline-block">
                <FaRegTrashAlt />
              </span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
    <form
      class="add-custosExtras-form"
      action=""
      on:submit|preventDefault={adicionaCusto}
    >
      <table>
        <tr>
          <td><h4>nome</h4></td>
          <td><h4>valor</h4></td>
        </tr>
        <tr>
          <td><input type="text" bind:value={inputNomeCustoExtra} /></td>
          <td><input type="number" bind:value={inputValorCustoExtra} /></td>
          <td
            ><Button
              class="add-custo-button"
              type="submit"
              disabled={!inputValorCustoExtra || !inputNomeCustoExtra}
              >adicionar</Button
            ></td
          >
        </tr>
      </table>
    </form>
  </div>
</div>

<style lang="scss">
  .custosExtras-list-wrapper {
    .list-custosExtras {
      ul {
        margin: 0;
        padding: 10px;
        list-style: none;
        li {
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          background-color: #303030;
          border-radius: 5px;
          padding: 10px;
          position: relative;
          .remove-custoExtra-button {
            border: none;
            background: none;
            padding: 5px;
            position: absolute;
            right: 10px;
            cursor: pointer;
            display: none;
            :global(svg) {
              fill: red;
            }
          }
          &:hover {
            .remove-custoExtra-button {
              display: block;
            }
          }
        }
      }
    }
    .add-custosExtras-form {
      padding: 15px;
      background-color: #303030;
      display: flex;
      border-top: 1px solid #4b4b4b;
      flex-wrap: wrap;
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
    :global(.add-custo-button) {
      background-color: rgb(255, 51, 0);
    }
  }
</style>
