<template>
    <div class="mid" style="width: 30%;">
        <Input v-model="gitlabAddr" placeholder="Gitlab地址,回车确定" :readonly="!editable">
            <Select v-model="protocol" slot="prepend" style="width: 80px">
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
            </Select>
            <a slot="append" @click="editable=true" v-show="!editable">编辑</a>
            <a slot="append" @click="writeGitlab" v-show="editable">提交</a>
        </Input>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "globalConfig",
        data: function() {
            return {
                gitlabAddr: "",
                protocol: "http://",
                editable: true
            }
        },
        methods: {
            writeGitlab: function() {
               let obj = this;
                axios.post("/config/global", {
                    address: this.protocol + this.gitlabAddr
                }).then(function (resp) {
                    if (resp.data.Code === 0) {
                        obj.$Message.success("提交成功")
                        obj.editable = false
                        return
                    }
                    obj.$Message.warning(resp.data.Msg)
                }).catch(function (error) {
                    obj.$Message.error('提交错误:' + error);
                })
            }
        },
        created: function() {
            let obj = this;
            axios.get("/config/global").then(function (resp) {
                if (resp.data.Code !== 0) {
                    obj.$Message.warning(resp.data.Msg);
                    return
                }
                let url = resp.data.Data.Address.split("//")
                obj.protocol = url[0] + "//"
                obj.gitlabAddr = url[1]
                obj.editable = false
            }).catch(function (error) {
                obj.$Message.error('获取gitlab地址错误:' + error);
            })
        }
    }
</script>

<style scoped>
.mid{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>