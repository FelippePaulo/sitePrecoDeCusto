<script>
    import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
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
                    <!-- <img src="https://lh3.googleusercontent.com/pw/AP1GczMHfe2qNReBQef-jHspyv5gs66laWlMUqZpKpXqRp23mSSwwop6DNKIeB8MdrXdVWrOhWWQlIE4CRMw3UqvlT1w3qdQght74IHUqnwPjA0wkKmUqJuESRAor70qYGHjwFyV8_4JZXCAar03I2iQXl94N8Ey152y1XTvbHC4gH9YwqnJCfK1yU7bIaf3nrW1oYsKhXT1SEJGAZmjeOTZFhXjFntwb8L5v6bBJp4P3-WfTO7oH6z5FdIoz-YBRqLYfIntytSN6-dbO8mu8apfk2IziUNjIXWc9IpeCfc9S3AaluwrthPAdGBVvMY6nNeSuGJHJROW1pugZnGIovyZdO7Ndg2WiswjqCOmRZoyjDtKxxOLBbfN8GGCxNtDuF_5sQekyF7u3JH_N7aCjcBIFhgDo0q1l5KhwXiBhg5UlN19kENutD4QxAY_vB_Vaykn3uw2yE2crxo7bejSR4kHBYB6ZiAwdAvO569XhKu9QddDaEDYqV8KdnxXfLXGVF-ne4IdbB7N96pgHkfdp_JvcsW3tADTra25as0lH93UysqcrJlBYqNYoxGbo5bktvYDyS_YRixQ9y-gQ4bGTDlUwrREBAOTMAbZ5xSWDZSaKLOw-8PeseUubvBoP7VmKOph0yA0Od5WRHrfZfAZS2G1kx66cCwcXBM_ZEsIYZgYibN39EKVEYZYztsHpoqghTy4DTxKC67r5f3obNLEYWE7EKpBUA13jlb9bo9YL7O9tTqO9fHiv5mC3K7qY6aQmLscSH0TuA6ob7mWk43YCU26bDre23E3DWadSmZ25i1eAWSUTonKaPp61Ct6z68_2nC0FO4hz-6lQc6axRKxb6_We9nxCtnpejbaDqZh-ZSw-9djV8lbiGIQ-LvNWUi63Xrvp_WV_dh3AGd-c8f1M4rTKpL4Q25SGnDI4EwayUZ1GEnIes47AU4XaA=w512-h512-s-no-gm?authuser=0" alt="#"> -->
                     <DiGithubBadge></DiGithubBadge>
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
            margin: 0px;
            text-align: center;
        }

        .calculo-form{
            grid-area: form;
            margin-left: 0px;
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
                width: 50px;
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