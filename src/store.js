
    import { writable } from "svelte/store";

    export let tecidoCusto = writable( localStorage.getItem("tecidoCusto") || '');
    tecidoCusto.subscribe((val) =>  localStorage.setItem("tecidoCusto",val))

    export let taxaAproveitamento = writable( localStorage.getItem("taxaAproveitamento") || "70");
    taxaAproveitamento.subscribe((val) =>  localStorage.setItem("taxaAproveitamento",val))

    export let pesoInfanto = writable( localStorage.getItem("pesoInfanto") || "");
    pesoInfanto.subscribe((val) =>  localStorage.setItem("pesoInfanto",val))

    export let pesoNormal = writable( localStorage.getItem("pesoNormal") || "");
    pesoNormal.subscribe((val) =>  localStorage.setItem("pesoNormal",val))

    export let pesoPS = writable( localStorage.getItem("pesoPS") || "");
    pesoPS.subscribe((val) =>  localStorage.setItem("pesoPS",val))

    export let tempoInfanto = writable( localStorage.getItem("tempoInfanto") || "");
    tempoInfanto.subscribe((val) =>  localStorage.setItem("tempoInfanto",val))
    
    export let tempoNormal = writable( localStorage.getItem("tempoNormal") || "");
    tempoNormal.subscribe((val) =>  localStorage.setItem("tempoNormal",val))

    export let tempoPS = writable( localStorage.getItem("tempoPS") || "");
    tempoPS.subscribe((val) =>  localStorage.setItem("tempoPS",val))

    export let salario = writable( localStorage.getItem("salario") || "");
    salario.subscribe((val) =>  localStorage.setItem("salario",val))

    export let cargaHoraria = writable( localStorage.getItem("cargaHoraria") || "");
    cargaHoraria.subscribe((val) =>  localStorage.setItem("cargaHoraria",val))

    export let impostoSalario = writable( localStorage.getItem("impostoSalario") || "40");
    impostoSalario.subscribe((val) =>  localStorage.setItem("impostoSalario",val))

    export let contaLuz = writable( localStorage.getItem("contaLuz") || "");
    contaLuz.subscribe((val) =>  localStorage.setItem("contaLuz",val))

    export let contaAgua = writable( localStorage.getItem("contaAgua") || "");
    contaAgua.subscribe((val) =>  localStorage.setItem("contaAgua",val))

    export let custosExtrasStorage = writable( localStorage.getItem("custosExtrasStorage") || "");
    custosExtrasStorage.subscribe((val) =>  localStorage.setItem("custosExtrasStorage",val))
