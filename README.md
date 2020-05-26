# Auth0 认证

这个项目是用于理解 [Auth0] 在 [react] 项目中如何实现身份验证、授权和许可。

[Auth0] 作为**身份认证**云服务商，提供了一整套 `SDK` 和 `API` 便于 APP 开发者可以更加关注与业务逻辑实现。

## 目标

1. 用户注册、认证、授权以及其他用户管理（e.g. 密码修改）的功能托管给 [Auth0] ；
2. 用户可通过主动方式进行身份认证，即点击登陆按钮等形式进行身份认证；
3. 用户可通过被动方式进行身份认证，在未认证/登录前访问受限资源，系统将自动重定向用户到 [Auth0] 的认证/注册界面；

## 场景

- <u>未认证</u>用户: 在导航栏中显示登陆按钮
- <u>未认证</u>用户访问受限页面: 自动将用户重定向到 [Auth0] 的认证界面, 用户完成认证后 [Auth0] 将用户重定到受限页面

## Step 1 - Configure Auth0

- 注册并登陆 [Auth0]
- 在 [Auth0] 的 `dashboard - Application` 中创建一个应用程序，并记录下 `Domain` 和 `Client ID`

## Step 2 - 代码实现思路

- **核心代码** `src/react-auth0-spa.js`
  - 使用 `Context` 封装 [Auth0] 的 `SPA SDK`(`createAuth0Client`)
    - `SPA` 是 Single-Page Application 的缩写
  - 使用自定义 `Hook` 将上面封装的 `Context` 发布出来
    - 使用自义定 `Hook` 发布 `Context` 的主要目的是使代码更易阅读。比如在代码中使用 `useAuth0` 远比 `useContext(Auth0Content)` 更加易于理解
- **入口函数** `src/index.js`
  - 使用 `src/react-auth0-spa.js` 返回的组件，将 `src/App.js` 返回的组件嵌入其中
- **UI入口函数** `src/App.js`
  - 封装其他 UI 组件

[Auth0]:https://auth0.com
[react]:https://reactjs.org