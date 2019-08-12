<template>
    <div class="city_body">

        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>北京</li>
                    <li>上海</li>
                    <li>广州</li>
                    <li>天津</li>
                    <li>杭州</li>
                    <li>南京</li>
                    <li>成都</li>
                </ul>
            </div>
            <div class="city_sort">
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div>




        <!--
        <div class="city_list">
            <Loading v-if="isLoading" />
            <Scroller v-else ref="city_List">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm , item.id)">{{ item.nm }}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm , itemList.id)">{{ itemList.nm }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</li>
            </ul>
        </div>
        -->


    </div>
</template>

<script>
    export default {
        name: "City"
    }
</script>

<style scoped>
    #content .city_body {
        margin-top: 45px;
        display: flex;
        width: 100%;
        /*position: absolute;*/
        top: 0;
        bottom: 0;
    }

    .city_body .city_list {
        flex: 1;
        overflow: auto;
        background: #FFF5F0;
    }

    .city_body .city_list::-webkit-scrollbar {
        background-color: transparent;
        width: 0;
    }

    .city_body .city_hot {
        margin-top: 20px;
    }

    .city_body .city_hot h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    .city_body .city_hot ul li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
    }

    .city_body .city_sort div {
        margin-top: 20px;
    }

    .city_body .city_sort h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    .city_body .city_sort ul {
        padding-left: 10px;
        margin-top: 10px;
    }

    .city_body .city_sort ul li {
        line-height: 30px;
        line-height: 30px;
    }

    .city_body .city_index {
        width: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-left: 1px #e6e6e6 solid;
    }
</style>