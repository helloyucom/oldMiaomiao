<template>
    <div class="city_body">
        <div class="city_list">
            <Scroller ref="city_List">
                <div>
                    <!--通过接口解析数据-->
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item of hotList" :key="item.id">{{item.nm}}</li>
                            <!--v-for要和:key搭配使用-->
                        </ul>
                    </div>
                    <!--通过接口解析数据-->
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item of cityList" :key="item.index">
                            <!--加入ref="city_sort"是为了获取到这个元素-->
                            <!--先解析城市列表-->
                            <h2>{{item.index}}</h2>
                            <ul>
                                <!--再解析城市列表下的城市-->
                                <!--在上一层的基础上再次解析-->
                                <li v-for="listList of item.list" :key="listList.id">{{listList.nm}}</li>
                                <!--刚才把v-for加到ul下了，页面中就出现了好多的ul和页面结构不符合-->
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>

            <!-- 静态数据
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                </ul>
            </div> -->

            <!-- 静态数据
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
            </div> -->
        </div>

        <!--通过接口解析索引-->
        <div class="city_index">
            <ul>
                <li v-for="(item,index) of cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
                <!--(item, index) handleToIndex(index) 中的index不是 :key="item.index"中的index-->
                <!--他只是索引下标
                <!--touchstart是移动端的点击事件-->

                <!--v-for要加到li这个用ul包裹起来的元素，因为我们要给li循环，我刚才加到ul上了-->
            </ul>
        </div>

        <!-- 索引静态数据
        <div class="city_index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cityList: [],
                hotList: []
            }
        },
        name: "City",
        mounted() {
            this.axios.get('/api/cityList').then((res) =>{
                // console.log(res);   // 得到数据格式不符合要求，需要处理
                var msg = res.data.msg; // 数据返回成功与否的标记
                if (msg === 'ok') {     // ok代表数据返回成功
                    var cities = res.data.data.cities;    // 保存获取到的城市列表的数据，这里获取到的是一个数组
                    // 获取到的数据经过处理后，类似于下边的格式
                    // [index: 'A', list[{nm: '安庆', id: 123},{nm: '阿城', id: 124}]]
                    // 按照索引重新组合数据
                    // this.formatCityList(cities);  // 调用方法处理原始数据,测试用
                    // 处理完cityList和hotList后，把结果集通过formatCityList返回后，就可以解析数据了
                    var {cityList, hotList} = this.formatCityList(cities);
                    this.cityList = cityList;
                    this.hotList = hotList;
                    // this.cityList this.hotList 是data中的数据
                }
            })
        },
        methods: {
            // 使用原生的方法来处理数据。同时我们可以使用饿了么ui来处理
            // 格式化城市列表
            formatCityList(cities){       // ES6定义方法
                var cityList = [];      // 定义处理好的cityList，这是一个结果集
                                        // 就是要从原始数据中找到类似于这样的结果
                // [index: 'A', list[{nm: '安庆', id: 123},{nm: '阿城', id: 124}]]
                var hotList = [];   // 定义处理好的hotList

                // 处理hotList数据
                // 遍历获取到的原始数据，根据每一项的isHot字段筛选出对应的项目后，
                // push到hotList列表中
                for (var i = 0; i < cities.length; i++) {
                    if (cities[i].isHot === 1) {
                        hotList.push(cities[i])
                    }
                }
                // console.log(hotList)


                // 改造数据
                for (var i = 0; i < cities.length; i++) {
                    // 根据拼音的第一个字母来判断
                    var firstLetter = cities[i].py.slice(0,1).toUpperCase();

                    if (toCom(firstLetter)) {       // 新添加索引
                        // 这里给数据加一个结构，把整体push到结果集中
                        cityList.push( {index: firstLetter, list: [ {nm: cities[i].nm, id: cities[i].id} ]} );
                    } else {        // 累加到已有索引中
                        // 那就要判断一下数据要和哪个索引匹配了
                        for (var j = 0; j < cityList.length; j++) {
                            if (cityList[j].index === firstLetter) {    // 用firstLetter和结果集中的每一个index比较
                                cityList[j].list.push({nm: cities[i].nm, id: cities[i].id})
                                // cityList[j].push({list: [ {nm: cities[i].nm, id: cities[i].id} ]})
                                // 上边的这种写法是不对的 cityList[j]不是一个数据，没有push方法，
                                // 我们要往cityList[j].list数组中push数据
                                // 我们得到了想要的数据，都按照索引排序了，但是不是很理想，索引没有按顺序排列
                                break;      // 源程序在把数据放到结果集中后，并没有结束循环，后边的循环没有意义
                                            // 是因为结果集中的索引是唯一的，并没有重复
                            }
                        }
                    }
                }

                // console.log(cityList);      // 测试打印处理完成之后的数据
                // 我们得到了想要的数据，都按照索引排序了，但是不是很理想，索引没有按顺序排列

                // 那么我们要把这些数据按照index进行排序处理
                // 使用数组自带的排序方法 按照索引index排序
                cityList.sort((n1, n2) => {
                    if (n1.index > n2.index) {
                        return 1;
                    } else if (n1.index < n2.index) {
                        return -1;
                    } else {
                        return 0;
                    }
                })

                // 再次打印排序之后的结果集
                // console.log(cityList);
                // 结果是从Z到A的，就调整一下返回的1和-1的顺序即可。
                // 调整完成后再次打印结果集，观察其是否符合要求


                function toCom(firstLetter) {      // 接收到firstLetter，判断是不是存在于结果集中
                    for (var i = 0; i < cityList.length; i++) {
                        if (cityList[i].index === firstLetter) {
                            return false;       // 如果返回false了，说明匹配上了，直接return，方法结束
                                                    // 下边的return true自然而然就不会执行了
                        }
                    }
                    // 在for循环中firstLetter和结果集中的每一个index进行匹配
                    // 如果执行到这里说明一个也没有匹配上，那么久是新的索引，返回一个true
                    return true;
                }

                return {
                    cityList,
                    hotList
                }
            },

            // 做好了数据格式化的方法formatCityList(cities)，并且把数据已经渲染到页面了
            // 但是点击索引没有跳转到对应的索引位置，下面给索引加一些点击的方法
            handleToIndex(index){
                // alert(index);
                // 测试确认 index只是一个下标索引
                // 这个索引值是和城市列表ABC...中的索引一一对应的
                var h2 = this.$refs.city_sort.getElementsByTagName('h2');
                // 获取到h2元素，里面包裹的就是ABC...这些值
                // console.log(h2[index].innerHTML);
                // 测试一下获取到的节点
                //this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;    // 加了Scroller组件后，点击事件不生效了，用新的方法代替
                // this.$refs.city_sort.scrollTop = h2[index].offsetTop;
                // 记得要滚动父元素，滚动元素本身，页面并没有发生变化
                // 让我们获取到这个元素的父元素，即city_list的位置发生滚动
                // 滚动到和我们点击对应索引的offsetTop一样的位置
                // obj.offsetTop指obj距离上方或上层空间的位置，整型，单位像素

                this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
                /*
                    在JavaScript要获取到一个元素，用类似于document.getElementById()
                    document.getElementsByTagName等来获取

                    在vue中就可以在HTML页面中的某一个标签上定义一个ref="名称"的属性，
                    这个名称就是一个引用，通过this.$refs.名称 就能获取到这个元素了
                 */
            }
        }
    }
</script>

<style scoped>
    #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
    .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
    .city_body .city_list::-webkit-scrollbar{
        background-color:transparent;
        width:0;
    }
    .city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul{}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort{}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
    .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>