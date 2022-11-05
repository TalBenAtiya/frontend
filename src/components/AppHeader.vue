<script>
import AboutSvg from './svgs/AboutSvg.vue'
import HomeSvg from './svgs/HomeSvg.vue'
import LogoSvg from './svgs/LogoSvg.vue'
import RubikWhiteSvg from './svgs/RubikWhiteSvg.vue'
export default {
    components: { LogoSvg, RubikWhiteSvg, HomeSvg, AboutSvg },

}
</script>

<template>
    <header class="header-container">
        <div class="main-header main-layout">
            <logo-svg class="svg logo-svg" />
            <nav>
                <RouterLink to="/">
                    <home-svg class="svg home-svg" />
                </RouterLink>
                <RouterLink to="/games">
                    <rubik-white-svg class="svg rubik-svg" />
                </RouterLink>
                <RouterLink to="/about">
                    <about-svg class="svg about-svg" />
                </RouterLink>
            </nav>
        </div>
    </header>
</template>


<style lang="scss">
@keyframes breathing {
    0% {
        box-shadow: 0px -4px 30px -5px #ed000022;
    }

    100% {
        box-shadow: 0px 0px 30px -5px #ed0000da;
    }

}

.header-container {
    background: var(--clr-black);
    animation: breathing 4s linear infinite;

    .main-header {
        display: flex;
        padding-block: 10px;
        align-items: center;
        justify-content: space-between;
        padding-inline-start: 0;

        nav {
            display: flex;
            gap: 15px;

            a.router-link-active {
                svg {
                    fill: var(--clr-main-red);
                    scale: 1.2;
                }
            }
        }
    }

    .logo-svg {
        width: 200px;
        height: 65px;
    }

    .rubik-svg,
    .home-svg,
    .about-svg {
        width: 30px;
        height: 30px;
        transition: 0.2s ease-in-out;

        &:hover {
            scale: 1.2;

            path {
                transition: 0.5s;
                fill: var(--clr-main-red);
            }
        }
    }
}
</style>