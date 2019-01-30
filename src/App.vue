<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-nav{
    width: 220px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-nav">
            <MenuItem name="login">
              <Icon type="md-contact"></Icon>
              登录
            </MenuItem>
            <MenuItem name="bout">
              <Icon type="md-document"></Icon>
              关于GZZ
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu theme="light" width="auto" :open-names="['1']">
            <Submenu name="config">
              <template slot="title">
                <Icon type="md-cog"></Icon>
                配置
              </template>
              <MenuItem name="globalConfig"><router-link to="/globalConfig">全局配置</router-link></MenuItem>
              <MenuItem name="projectConfig">项目配置</MenuItem>
            </Submenu>
            <Submenu name="build">
              <template slot="title">
                <Icon type="md-construct"></Icon>
                构建
              </template>
              <MenuItem name="buildProject">构建项目</MenuItem>
            </Submenu>
            <Submenu name="deploy">
              <template slot="title">
                <Icon type="md-jet"></Icon>
                部署
              </template>
              <MenuItem name="deployProject">部署项目</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', position: 'relative'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
    export default {
      name: 'app'
    }
</script>
