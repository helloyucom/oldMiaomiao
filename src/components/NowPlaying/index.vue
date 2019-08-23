<template>
    <div class="movie_body" ref="movie_body">
        <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="pullDown">{{pullDownMsg}}</li>
                <li v-for="item of movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail"><img :src="item.img | setWH('128.180')"></div>
                    <!--/images/movie_1.jpg-->
                    <!--http://p0.meituan.net/w.h/movie/314f18a87b4df9a74a0c8341fa047fd24302018.jpg-->
                    <!--已经成功获取图片地址，但是这个图片地址中的w.h是需要替换成对应的宽高的-->
                    <!--现在就用到了vue中的过滤器  通过 | 来调用-->
                    <div class="info_list">
                        <h2>{{item.nm}}<img src="@/assets/maxs.png" alt="" v-if="item.version.indexOf('v3d') !== -1"></h2>
                        <p>观众评 <span class="grade">{{item.sc}}</span></p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>

        <!-- 静态页面<ul>
            <li>
                <div class="pic_show"><img src="/images/movie_1.jpg"></div>
                <div class="info_list">
                    <h2>无名之辈</h2>
                    <p>观众评 <span class="grade">9.2</span></p>
                    <p>主演: 陈建斌,任素汐,潘斌龙</p>
                    <p>今天55家影院放映607场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
            <li>
                <div class="pic_show"><img src="/images/movie_2.jpg"></div>
                <div class="info_list">
                    <h2>毒液：致命守护者</h2>
                    <p>观众评 <span class="grade">9.3</span></p>
                    <p>主演: 汤姆·哈迪,米歇尔·威廉姆斯,里兹·阿迈德</p>
                    <p>今天56家影院放映443场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
            <li>
                <div class="pic_show"><img src="/images/movie_1.jpg"></div>
                <div class="info_list">
                    <h2>无名之辈</h2>
                    <p>观众评 <span class="grade">9.2</span></p>
                    <p>主演: 陈建斌,任素汐,潘斌龙</p>
                    <p>今天55家影院放映607场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
            <li>
                <div class="pic_show"><img src="/images/movie_2.jpg"></div>
                <div class="info_list">
                    <h2>毒液：致命守护者</h2>
                    <p>观众评 <span class="grade">9.3</span></p>
                    <p>主演: 汤姆·哈迪,米歇尔·威廉姆斯,里兹·阿迈德</p>
                    <p>今天56家影院放映443场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
            <li>
                <div class="pic_show"><img src="/images/movie_1.jpg"></div>
                <div class="info_list">
                    <h2>无名之辈</h2>
                    <p>观众评 <span class="grade">9.2</span></p>
                    <p>主演: 陈建斌,任素汐,潘斌龙</p>
                    <p>今天55家影院放映607场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
            <li>
                <div class="pic_show"><img src="/images/movie_2.jpg"></div>
                <div class="info_list">
                    <h2>毒液：致命守护者</h2>
                    <p>观众评 <span class="grade">9.3</span></p>
                    <p>主演: 汤姆·哈迪,米歇尔·威廉姆斯,里兹·阿迈德</p>
                    <p>今天56家影院放映443场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
            <li>
                <div class="pic_show"><img src="/images/movie_1.jpg"></div>
                <div class="info_list">
                    <h2>无名之辈</h2>
                    <p>观众评 <span class="grade">9.2</span></p>
                    <p>主演: 陈建斌,任素汐,潘斌龙</p>
                    <p>今天55家影院放映607场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
            <li>
                <div class="pic_show"><img src="/images/movie_2.jpg"></div>
                <div class="info_list">
                    <h2>毒液：致命守护者</h2>
                    <p>观众评 <span class="grade">9.3</span></p>
                    <p>主演: 汤姆·哈迪,米歇尔·威廉姆斯,里兹·阿迈德</p>
                    <p>今天56家影院放映443场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
        </ul>-->
    </div>
</template>

<script>
    // import BScroll from 'better-scroll'; // 引入better-scroll对象
    // 把better-scroll做成组件调用了，这里就不用再引入better-scroll了
    export default {
        data() {
          return {
              movieList: [],
              pullDownMsg: ''
          }
        },
        name: "NowPlaying",
        mounted() {
            this.axios.get('/api/movieOnInfoList?cityId=10').then((res) => {
                // console.log(res);
                var msg = res.data.msg;
                if (msg === 'ok') {
                    this.movieList = res.data.data.movieList;
                    // 下边的这部分代码先注释起来，因为把better-scroll做成组件了
                    /*this.$nextTick(() => {  //保证数据加载完成
                        // 需要两个参数，一个是dom元素，一个是参数配置对象，暂时不写参数
                        var scroll = new BScroll(this.$refs.movie_body, {
                            tap : true,
                            probeType: 1
                        });
                        // 应用了BScroll后，明显感觉页面滑动起来流畅了
                        // 应用better-scroll有2个条件：1. 外层元素比内层元素小  2.内层元素加载完成后才能使用better-scroll
                        // better-scroll解决滑屏和点击操作
                        scroll.on('scroll',(pos)=>{
                            // console.log('scroll');      // chrome并未触发，但是手机端触发了
                            // 更正：不是说chrome上没有触发，而是操作方式的问题
                            // 我用小米笔记本调试的时候一直用两个手指滚动页面，而没有向下拖拽页面
                            // console.log(pos.y + "~" + pos.x);
                            // 测试拖拽距离
                            if (pos.y > 30) {
                                this.pullDownMsg = '正在更新中';
                            }
                        });
                        scroll.on('touchEnd',(pos) => {
                            console.log('touchEnd')
                            if (pos.y > 30) {
                                this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
                                    var msg = res.data.msg;
                                    if (msg === 'ok') {
                                        this.pullDownMsg = '更新成功';
                                        setTimeout(() => {  // 过1s后显示更新的数据
                                            this.movieList = res.data.data.movieList;
                                            this.pullDownMsg = '';
                                        }, 1000)

                                    }
                                })
                            }
                        })
                    })*/
                }
                // console.log(this.movieList);
            })
        },
        methods: {
            handleToDetail() {
                console.log('handleToDetail');
            },
            handleToScroll(pos) {
                if (pos.y > 30) {
                    this.pullDownMsg = '正在更新中';
                }
            },
            handleToTouchEnd(pos) {
                if (pos.y > 30) {
                    this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
                        var msg = res.data.msg;
                        if (msg === 'ok') {
                            this.pullDownMsg = '更新成功';
                            setTimeout(() => {  // 过1s后显示更新的数据
                                this.movieList = res.data.data.movieList;
                                this.pullDownMsg = '';
                            }, 1000)

                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    #content .movie_body{ flex:1; overflow:auto;}
    .movie_body ul{ margin:0 12px; overflow: hidden;}
    .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
    .movie_body .pic_show{ width:64px; height: 90px;}
    .movie_body .pic_show img{ width:100%;}
    .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
    .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
    .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
    .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}
    .movie_body .pullDown{margin: 0; padding: 0; border: none;}
</style>