<template>
    <div class="mid" style="width: 30%;">
        <Input v-model="gitlabAddr" placeholder="Gitlab地址,回车确定" @on-enter="writeGitlab">
            <Select v-model="protocol" slot="prepend" style="width: 80px">
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
            </Select>
        </Input>
    </div>
</template>

<script>
    export default {
        name: "globalConfig",
        data: function() {
            return {
                gitlabAddr: "",
                protocol: "http://"
            }
        },
        methods: {
            writeGitlab: function() {
                alert(this.protocol + this.gitlabAddr)
                // axios.post()
            }
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