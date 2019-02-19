<template>
    <div class="mid" style="width: 60%;">
        <Row>
            <Col span="12" style="padding-right:10px">
                <Select
                        v-model="projectName"
                        filterable
                        clearable
                        remote
                        :remote-method="findAll"
                        :loading="loading"
                        @on-change="branchById">
                    <Option v-for="(opt, index) in options" :value="opt.id" :key="index">{{opt.path_with_namespace}}</Option>
                </Select>
            </Col>
            <Col span="12" style="padding-right:10px">
                <Select v-model="branchName" style="width: 50%">
                    <Option v-for="(branch, index) in branchs" :value="branch.name" :key="index">{{ branch.name }}</Option>
                </Select>
                <Button type="primary" style="margin-left: 10px;" @click="build">构建</Button>
            </Col>
        </Row>

    </div>
</template>

<script>

    import axios from 'axios'
    import store from '../store'

    export default {
        name: "Project",
        data () {
            return {
                projectName: '',
                loading: false,
                options: [],
                projects: [],
                branchs: [],
                branchName: ''
            }
        },
        methods: {
            findAll: function(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        // this.options = this.projects.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                        this.options = this.projects
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            branchById: function(id) {
                if (id === undefined || id === '') {
                    this.branchs = []
                    this.branchName = ''
                    return
                }
                let projs = this.projects.filter(item => item.value === id)
                let obj = this
                axios.post("/build/project/" + id + "/" + projs[0].token).then(function (resp) {
                    if (resp.data.code !== 0) {
                        obj.$Message.warning(resp.data.msg);
                        return
                    }
                    // 将id/fullname映射
                    obj.branchs = resp.data.data
                }).catch(function (error) {
                    obj.$Message.error('获取项目失败' + error);
                })
            },
            build: function() {
                if (this.projectName === '' || this.branchName === '') {
                    this.$Message.warning("请选择需要构建的项目及分支");
                }
            }
        },
        created: function() {
            let obj = this;
            let groupIDs = store.state.user.groups.map(item => {
                return item["id"]
            });
            axios.post("/build/projects", groupIDs).then(function (resp) {
                if (resp.data.code !== 0) {
                    obj.$Message.warning(resp.data.msg);
                    return
                }
                // 将id/fullname映射
                /*
                obj.projects = resp.data.data.map(item => {
                    return {
                        value: item["id"],
                        label: item["path_with_namespace"],
                        gitAddr: item["ssh_url_to_repo"],
                        token: item["privateToken"],
                    };
                })
                */
                obj.projects = resp.data.data;
            }).catch(function (error) {
                obj.$Message.error('获取项目失败' + error);
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
    .fromTop{
        top: 10px;
    }
</style>