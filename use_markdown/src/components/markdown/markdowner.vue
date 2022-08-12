<template>
    <div class="usemarkdown">
        <mavon-editor ref=md v-model="context" :toolbar="toolbars" @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
    <button @click="sendBlog">发表</button>
    </div>
</template>

<script>
import axios from 'axios'
import "mavon-editor/dist/css/index.css";

export default{
    name:'MarkdownEditor',
    data(){
        return {
            context:'',     
            toolbars:{
                bold: true, 
                italic: true, 
                header: true, 
                underline: true,
                mark: true, // 标记
                superscript: true, // 上角标
                quote: true, // 引用
                ol: true, // 有序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                help: true, // 帮助
                code: true, // code
                subfield: true, // 是否需要分栏
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                undo: true, // 上一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                navigation: true // 导航目录
            }
        }
    },
    methods:{
        sendBlog(){
        var htmlContent = this.converter.makeHtml(this.context);
        console.log(htmlContent);
        },
        $imgAdd(pos,file){
            var formdata = new FormData();
            formdata.append('image', file);
            axios({
                url: 'http://127.0.0.1:3000/api/uploadimg/',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((url) => {
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                // $vm.$img2Url 详情见本页末尾
                //this.$refs.md.$img2Url(pos,url);
                this.$refs.md.$img2Url(pos, url.data.url);
                //console.log(url);
            })
        },
        $imgDel(pos) {
            var formdata = new FormData()
            formdata.append('url',pos[1]._name);
            axios({
                url:'http://127.0.0.1:3000/api/delimg/',
                method:'post',
                data:formdata
            })
            .then(() => {
                    Message.success('删除成功')
                })
            .catch(res => {
                console.log(res)
            })
        }
    }
}

</script>

<style>

    
</style>
