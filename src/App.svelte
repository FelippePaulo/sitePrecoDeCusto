<script>
    import Formulario from './lib/Formulario.svelte'
</script>
<body>
    <header>
        <h1>Calculo de preço de custo</h1>
    </header>
    <div class="calculo-form">
        <Formulario />
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
</body>

<style lang="scss">
    body{
        font-family:     sans-serif, Times, serif;
        grid-template-areas:'header'
                            'form'
                            'footer';
        header {
            grid-area: header;
            background-color: #202020;
            padding: 10px;
            margin-top: 10px;
            text-align: center;
        }

        .calculo-form{
            grid-area: form;
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
    
</style>