<template>
    <section class="container">
        <div class="initi-section">
            <div class="title">
                <h1>
                    JSON Tree Viewer
                </h1>
            </div>
            <div class="subtitle">
                <h2>
                    Simple JSON Viewer that runs completely on-client. No data exchange 
                </h2>
            </div>

            <ButtonJson/>
        </div>
    </section>
</template>

<script>
import ButtonJson from '@/components/ButtonJson/ButtonJson.vue'
export default {
    name: 'IndexView',
    components: {
        ButtonJson
    }
}
</script>

<style scoped>
.container {
    text-align: center;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    height: 100vh;
}
.title h1 {
    color: #000;
    font-family: 'Inter';
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 10px 0;
}
.subtitle h2 {
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>