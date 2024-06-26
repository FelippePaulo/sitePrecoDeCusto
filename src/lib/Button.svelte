<script>
    export let size = 'small';
    export let shadow = false;
    export let bgColor = undefined;
    export let textColor = undefined;

    // console.log($$slots);
    // console.log($$restProps);
    let isLeftHovered;
</script>


<button 
    on:click
    style:background-color= {bgColor}
    style:color= {textColor}
    class={size == 'large' ? 'size-lg' : 'size-sm'}
    class:shadow 
    {...$$restProps}
>
    {#if $$slots.leftContent}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div 
            class='left-content' 
            on:mouseenter={() => (isLeftHovered = true)}
            on:mouseleave={() => (isLeftHovered = false)}
        >
            <slot name="leftContent" {isLeftHovered} ></slot>
        </div>
    {/if}
    <slot {isLeftHovered}>Fallback</slot>
</button>

<style lang="scss">
    // @use '../styles/variables.scss';
    button {
        display: flex;
        align-items: center;
        border: none;
        background-color: var(--buttonBgColor);
        color: var(--buttonTextColor);
        padding: 15px 20px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        .left-content{
            margin-right: 10px;
        }
        &:disabled {
            opacity: 0.6;   
            cursor: not-allowed;     
        }
        &:hover { 
            background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0 0);
        }
        &:active { 
            background-image: linear-gradient(rgba(255,255,255,0.4) 0 0);
        }
        &.size-sm {
            padding: 15px 20px;
        }
        &.size-lg {
            padding: 20px 25px;
            font-size: 20px;
        }
        &.shadow{
            box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
        }
    }
</style>