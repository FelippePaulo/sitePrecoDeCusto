<script>
// @ts-nocheck

  import { v4 as uuid } from "uuid";
  import Button from "./Button.svelte";
  import {Currency} from 'stwui';
  // @ts-ignore
  import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";
  import { afterUpdate, createEventDispatcher } from "svelte";

  export let custosExtras = [];
  let inputNomeCustoExtra;
  let inputValorCustoExtra;
  let input;
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
    clearInput();
    focusInput();
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

  function clearInput() {
    inputNomeCustoExtra = "";
    inputValorCustoExtra = "";
  }
  function focusInput() {
    input.focus();
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
            {nome} - R$ {valor}
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
      
          <div class="td1">Nome</div>
          <div class="td2">Valor</div>
        
          <div class="inp1"><input type="text" bind:value={inputNomeCustoExtra} bind:this={input}/></div>
          <div class="inp2"><Currency bind:value={inputValorCustoExtra} /></div>
          <div class="inp3"
            ><Button
              class="add-custo-button"
              type="submit"
              bgColor = "blue"
              disabled={!inputValorCustoExtra || !inputNomeCustoExtra}
              >adicionar</Button
            ></div>
   
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
          border-radius: 20px;
          padding: 10px;
          position: relative;
          .remove-custoExtra-button {
            border: none;
            background: none;
            padding: 5px;
            position: absolute;
            border-radius: 20px;
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
      display: grid;
      border-top: 1px solid #4b4b4b;
      flex-wrap: wrap;
      border-radius: 20px;
      grid-template-areas:
            "title title title"
            "td1 td2 td3"
            "inp1 inp2 inp3";
         
          .td1 {
            grid-area: td1;
          }
          .td2 {
            grid-area: td2;
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
      input {
        flex: 1;
        background-color: #424242;
        border: 1px solid #4b4b4b;
        padding: 10px;
        color: white;
        border-radius: 20px;
        margin-right: 10px;
      }
    }
    :global(.add-custo-button) {
      background-color: rgb(255, 51, 0);
    }
  }
  @media (max-width: 1000px){
    .custosExtras-list-wrapper{
        .add-custosExtras-form{
            
            grid-template-areas:
              "td1"
              "inp1"
              "td2"
              "inp2"
              "td3"
              "inp3";
            div{
                margin-top: 10px;
            }
        }
    }
}
</style>
