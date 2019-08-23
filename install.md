需要vue3.0的脚手架，一次就好
	npm i -g @vue/cli
一、创建喵喵项目
	vue create miaomiao
	Please pick a preset:	 Manually select features	自定义安装
	Check the features needed for you project:
		Babel
		Router
		Vuex
		CSS Pre-processors

	Use history mode for router? Y
	Pick a CSS pre-processor	Sass/SCSS(with dart-sass)
	Where do you prefer placing config for Babel   In package.json
	Save this as a preset for future projects?  N
	等待脚手架安装...
	脚手架安装成功后，进入项目 cd miaomiao
	启动项目 npm run serve
    安装成功后，浏览器http://localhost:8080进入页面
二、改造项目
src routers    放路由文件
src stores     放数据文件
主页面App.vue  只保留view-router
main.js
    import router from './routers'
    import store from './stores'

三、创建路由测试界面
    1.在views中创建组件--->模板中的内容要用div
    包裹起来，否则在页面中不会显示内容
    在routers文件夹中注册组件
    在主路由index.js中引出routes
    main中引入router
    现在在浏览器中通过手工输入地址可以显示对应的页面了
四、public中引入静态资源css\images\libs
index.html中设置响应式
<meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalable=no">

五、创建Header和TabBar组件   组件在components文件夹下创建，组件用div#main包裹
    这些是局部组件，在每个view页面中注册
    components:{组件名},不过注册的时候记得引入组件路径
    注册完的组件就可以在每个view中直接使用了

六、页面不能只通过手工输入地址进行切换，那么需要通过router-link，他类似于超链接(a)进行切换
    现在我们是通过点击TabBar下的三个文字切换，那么就把li替换为router-link
    <router-link to="/home" tag="li"></router-link>
    现在在哪个页面，对应的router-link颜色要发生改变，
    就用vue自带的一个类样式定义   router-link-active
    #footer ul li.router-link-active{ color: #f03d37;}

七、但是每个页面中的Header都是显示一样的文件，我们想要的是
    切换的一个页面就显示不同的文字
    TabBar中的文字就不能写死了，需要用变量来表示
    这个变量是通过引用TabBar组件的父组件（Movie Cinema Mine这些组件）来进行传值
    这不就是父组件往子组件中传递值吗
    怎么传递呢
    子组件中定义props
    props 中定义变量title，规定title的类型和默认值

    TabBar在父组件中使用的时候，直接加上一个title=""即可
    <TabBar title="首页"></TabBar>

    其实父组件中用到的这个title是一个数据，我们还可以在父组件中定义data数据，title来进行传递
    <TabBar :title="title"></TabBar>
    data(){
        return {title: "喵喵喵"}
    }
    这里定义data的时候用方法，返回一个对象

八、现在一级路由的页面已经做好了，下面要做每个一级路由中的二级路由界面
    电影页面中有4个页面进行切换，分别是城市列表、正在热映、即将上映、搜索
    这4个页面做成组件，以供在movie页面中调用。使用懒加载的方式注册组件。
    在movie的路由中增加children路由。
九、影院页面
    和电影页面类似，暂时不做二级路由，有需求时再变更
    做一个影院列表的组件，作为子组件再影院页面中注册使用即可
十、城市数据渲染
    连接数据接口
    创建新的分支git checkout -b setData
    接口文档
        地址类似如下：http://39.97.33.178/api/cityList
        都是以http://39.97.33.178/api 开头
        在接口没有写好之前用一些接口模拟的工具，比如Charles等
        现在数据接口已经写好了，我们直接调用就可以了

   怎么调用接口数据呢？

   <<后加的2.0>>使用程序调用了一遍城市列表接口后，做一个小小的总结。以后就按照这个步骤去请求数据就行了
   调用接口的步骤(共4个小步骤)：
        1. 安装axios
            cnpm i -S axios
        2. 在main.js中引入axios
            import axios from 'axios'
            Vue.prototype.axios = axios
        3. 项目根目录新建接口配置文件（vue自带的）
            md vue.config.js        // 新建文件
            vue.config.js           // 打开文件
            编辑文件如下：
                module.exports = {
                    devserver: {
                        proxy: {
                           '/api': {
                                target: 'http://39.97.33.178',
                                changeOrigin: true
                           }
                        }
                    }
                }
            做完这个小小的配置后，就可以在页面中调用数据了
        4. 在城市组件中调用接口数据
            vue中调用接口数据是在mounted生命周期中完成的,记得mounted是一个生命周期的方法
            mounted() {
                this.axios.get('/api/cityList').then((res) => {
                    console.log(res);
                })
            }
            如果打印res数据成功，就说明调用接口成功了。
            我们从接口得到的数据，如果不符合格式要求也可以自行改造，改造后就可以在页面中渲染数据了
            通常需要重启一下项目



        这些接口是get请求，直接在浏览器输入http://39.97.33.178/api/cityList打开即可
        观察数据结构：
            id  城市列表
            nm  城市名称
            isHot   热点城市标识
            py      城市名称拼音
        接口文件在公网上，是跨域的。我们做一个反向代理请求数据

        我们现在使用 axios        // 即ajix，前后端都支持
        1> 进入项目更目录下，创建一个vue.config.js文件,在这里文件里配置环境。这是vue提供的。
        2> 打开vue.config.js配置文件，输入
            export default {
                devServer: {
                    proxy: {
                        '/api': {
                            target: 'http://39.97.33.178',       // 反向代理的目标
                            changeOrigin: true                  // 反向代理的时候是否要改变反向代理的地址
                        }
                    }
                }
            }

        修改完配置文件后，需要重启项目。
        3> 重启项目之前安装axios
            cnpm i -S axios
            下载完了，在package.json 中有axios项目增加
        4> 重启项目
            npm run serve
            重启完项目后，编译失败。
                 ERROR  Error loading vue.config.js:
                 ERROR  SyntaxError: Unexpected token export
                D:\myStu\miaomiao\vue.config.js:1
                export default {
            查找问题，发现是在vue.config.js中export default处报错，这是新的es6的写法，可能是不支持
            使用模块化之前的写法
                module.exports = {
            再次启动项目
        5> 去City组件中获取数据
            vue中是在mouted生命周期中代理数据的
            需要引入axios接口，但是我们的数据接口比较多，每次引用就会显得很麻烦。
            我们需要怎么做呢？

            在main.js中引入axios
                import axios from 'axios'
                vue在框架当中是一个面向对象的程序，vue就是一个类，我们在vue原型中添加一个方法
                以后就可以通过this引用axios了
                Vue.prototype.axios = axios

            回到组件之后，声明生命周期，生命周期是一个方法
                mounted() {
                    this.axios.get('/api/cityList').then((res) =>{
                        console.log(res);
                    })
                }

            现在我们已经获取到所有城市列表数据了，按道理来说，就可以在页面总渲染这些数据了。
            但是这些数据的格式和我们页面中要展现的格式有些差异，我们页面中是按照ABC...拼音索引来展示
            还有一个地方是需要展示热门城市列表的。我们获取到的数据并没有城市的索引。
            所以我们需要处理一下获取到的数据，处理完成后，再去使用。
            怎么去处理呢？当时是用一些方法来处理了。这样就需要我们手动去写一些格式化数据的方法了
十一、影院数据渲染
    在CiList.vue页面中调用接口
    这里边有一个小吃和折扣的显示标记，用到了局部过滤器的映射功能，这个功能很有作用
    另外v-for中遍历的不是数组，而是对象，:key用到的是对象中的key

十一、封装better-scroll组件
    现在页面滚动起来有些不流畅，我们使用了better-scroll插件进行处理
    1> 下载better-scroll支持
        cnpm i -S better-scroll
        安装完成后在package.json中有了better-scroll，类似于安装了vue-router
    2> 用正在热映界面做测试
       引入better-scroll
       import BScroll from 'better-scroll'

十二、多个页面都会用到better-scroll，把他做成一个组件，在其他页面中
调用，就会很方便
    写一个Scroller的组件，里边把通用的方法写进去，其他地方进行调用。
    这里边还用到了AOP的思想
    在main.js中注册组件
    在组件中，
        首先，引入better-scroll插件,然后把在NowPlaying中写的东西搬过来
        模板中用到了插槽，这样这个Scroller就成了爹了