# Auth0 认证

这个项目是用于理解 [Auth0](https://auth0.com) 在 [react](https://reactjs.org) 项目中如何实现身份验证、授权和许可。

[Auth0](https://auth0.com) 作为**身份认证**云服务商，提供了一整套 `SDK` 和 `API` 便于 APP 开发者可以更加关注与业务逻辑实现。

## 目标

1. 用户注册、认证、授权以及其他用户管理（e.g. 密码修改）的功能托管给 [Auth0](https://auth0.com) ；
2. 用户可通过主动方式进行身份认证，即点击登陆按钮等形式进行身份认证；
3. 用户可通过被动方式进行身份认证，在未认证/登录前访问受限资源，系统将自动重定向用户到 [Auth0](https://auth0.com) 的认证/注册界面；

## Step 1 - Configure Auth0

- 注册并登陆 [Auth0](https://auth0.com)
- 在 [Auth0](https://auth0.com) 的 `dashboard - Application` 中创建一个应用程序，并记录下 `Domain` 和 `Client ID`

## Step 2 - 代码实现思路
