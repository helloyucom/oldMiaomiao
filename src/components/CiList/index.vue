<template>
    <div class="cinema_body">
            <ul>
                <li>
                    <div>
                        <span>大地影院(澳东世纪店)</span>
                        <span class="q"><span class="price">22.9</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>金州区大连经济技术开发区澳东世纪3层</span>
                        <span>1763.5km</span>
                    </div>
                    <div class="card">
                        <div>小吃</div>
                        <div>折扣卡</div>
                    </div>
                </li>
                <!--
                <li v-for="item in cinemaList" :key="item.id">
                    <div>
                        <span>{{ item.nm }}</span>
                        <span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{ item.addr }}</span>
                        <span>{{ item.distance }}</span>
                    </div>
                    <div class="card">
                        <div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class=" key | classCard ">{{ key | formatCard }}</div>
                    </div>
                </li>
                -->
            </ul>
    </div>
</template>

<script>
    export default {
        name: "CiList"
    }
</script>

<style scoped>

</style>