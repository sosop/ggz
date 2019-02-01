<template>
    <div class="mid fromTop" style="width: 50%;">
        <RadioGroup v-model="group" @on-change="groupChange">
            <span>可选组：</span>
            <Radio v-for="g in groups" :label="g.id" :key="g.id">
                <span>{{ g.name }}</span>
            </Radio>
        </RadioGroup>
        <Divider>Account Private Token</Divider>
        <div class="mid" style="width: 30%">
            <Input v-show="group !== ''" v-model="tokenV" placeholder="输入PrivateToken,回车确认" clearable @on-enter="addToken"/>
        </div>
        <Tag v-for="t in tokens" :key="t" :name="t" closable @on-close="delToken(t)">PrivateToken: {{ t }}</Tag>
    </div>
</template>

<script>
    import store from '../store'
    import axios from 'axios'

    export default {
        name: "TokenConfig",
        data: function() {
            return {
                group: "",
                tokens: [],
                groups: [],
                tokenV: ""
            }
        },
        created: function() {
            this.groups = store.state.user.groups
        },
        methods: {
            groupChange: function() {
                let obj = this
                axios.get('/config/project/setting/' + obj.group).then(function (resp) {
                    if (resp.data.code === 0) {
                        // todo
                    }
                    obj.$Message.warning(resp.data.msg)
                }).catch(function (error) {
                    obj.$Message.error('获取token错误:' + error);
                })
            },
            addToken: function() {
                if (this.tokenV.trim() === '') {
                    return
                }
                let obj = this
                axios.post('/config/project/setting/' + obj.group + "/" + obj.tokenV).then(function (resp) {
                    if (resp.data.code === 0) {
                        obj.tokenV = ''
                        obj.$Message.success("添加token成功")
                        return
                    }
                    obj.$Message.warning(resp.data.msg)
                }).catch(function (error) {
                    obj.$Message.error('添加TOKEN错误:' + error);
                })
            },
            delToken: function(t) {
                let obj = this
                axios.delete('/config/project/setting/' + obj.group + "/" + t).then(function (resp) {
                    if (resp.data.code === 0) {
                        // obj.$Message.success("添加token成功")
                        return
                    }
                    obj.$Message.warning(resp.data.msg)
                }).catch(function (error) {
                    obj.$Message.error('删除TOKEN错误:' + error);
                })
            }
        }
    }
</script>

<style scoped>
    .mid{
        position: absolute;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .fromTop{
        top: 30%;
    }
</style>