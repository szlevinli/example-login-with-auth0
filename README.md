# Auth0 认证

这个项目是用于理解 [Auth0] 在 [react] 项目中如何实现身份验证、授权和许可。

[Auth0] 作为**身份认证**云服务商，提供了一整套 `SDK` 和 `API` 便于 APP 开发者可以更加关注与业务逻辑实现。

## 目标

1. 用户注册、认证、授权以及其他用户管理（e.g. 密码修改）的功能托管给 [Auth0] ；
2. 用户可通过主动方式进行身份认证，即点击登陆按钮等形式进行身份认证；
3. 用户可通过被动方式进行身份认证，在未认证/登录前访问受限资源，系统将自动重定向用户到 [Auth0] 的认证/注册

## 场景

- <u>未认证</u>用户: 在导航栏中显示登陆按钮
- <u>未认证</u>用户访问受限页面: 自动将用户重定向到 [Auth0] 的认证界面, 用户完成认证后 [Auth0] 将用户重定到之前预访问的受限页面
- <u>已认证</u>用户: 在导航栏中显示退出按钮

## Step 1 - Configure Auth0

- 注册并登陆 [Auth0]
- 在 [Auth0] 的 `dashboard - Application` 中创建一个应用程序，并记录下 `Domain` 和 `Client ID`

## Step 2 - Login

- <u>src/utils/history.js</u>: 该文件的目的是可以在项目的任何文件中方便的访问 `history` 对象. 具体详见 [How do I access the `history` object outside of component](https://github.com/ReactTraining/react-router/blob/master/FAQ.md#how-do-i-access-the-history-object-outside-of-components)
- <u>src/react-auth0-spa.js</u>: 用于封装 [auth0] SDK. 采用 [react] 的 **Context** 功能, 将 [auth0] SDK 和常用的属性与方法一同封装到 **Context**. 这里有个小技巧, 即使用自定义 hook(这里是 `useAuth0`) 将 **Context** 暴露出来. 这样做的好处是使代码更加易读. **Context** 对象内容如下
  - isAuthenticated: 用户是否已认证
  - user: 用户信息(用户名称/邮箱等)
  - loading: 是否正在等待后端服务响应. 通常用于显示一个 spin
  - popupOpen: 是否弹出了登录框
  - loginWithPopup: 用户登录采用弹出框的方式. 此函数封装了 [Auth0] SDK 提供的 loginWithPopup 方法, 目的是需要处理错误
  - handleRedirectCallback: 处理登录后的回调处理. 此函数封装了 [Auth0] SDK 提供的 handleRedirectCallback 方法, 目的是获取 user 信息
  - getIdTokenClaims: Return all claims from the id_token if available.直接调用 [Auth0] SDK 提供的 getIdTokenClaims 方法
  - loginWithRedirect: 直接调用 [Auth0] SDK 提供的 loginWithRedirect 方法
  - getTokenSilently: 直接调用 [Auth0] SDK 提供的 getTokenSilently 方法
  - getTokenWithPopup:直接调用 [Auth0] SDK 提供的 getTokenWithPopup 方法
  - logout: 直接调用 [Auth0] SDK 提供的 logout 方法
- <u>src/react-auth0-spa.js</u>: 返回一个 **Context.Provider** 组件, 将整个项目的其他组件囊括进来, 以便于提供封装后的方法. 这里特别需要关注的是 `useEffect` 方法, 该方法将在组件 render 后调用, 其主要的功能如下:
  - 创建 `Auth0Client` 的实例
  - 处理回调函数: 如果地址栏中 URL 包含 `state` 和 `code` 参数, 则表明用户已完成在 [Auth0] 的认证授权动作, 由 [Auth0] 重定向回来, 此时需要处理将用户重新定向到之前访问的地址中去(如果有的话)
  - 判断用户是否已认证授权, 并将结果写入 `isAuthenticated` 状态中
  - 如果用户已经认证授权, 则获取用户信息并写入 `user` 状态中
- <u>src/components/NavBar.js</u>: 导航栏组件. 如果用户未认证则显示登录按钮, 否则显示登出按钮
- <u>src/index.js</u>: 入口函数
  - 定义了回调的处理函数(onRedirectCallback)
  - 传入用于创建 `Auth0Client` 所需要的参数
    - domain
    - client_id
    - redirect_uri
- <u>src/App.js</u>: UI 组件的入口.
- <u>src/components/Profile.js</u>: 显示登录用户信息的组件
- <u>src/components/PrivateRoute.js</u>: 封装了 Route 组件, 用户保护受限资源, 即只有已认证用户可以访问的组件

## Step 3 - Calling an API

- Create an API: 在 [Auth0] 的 dashboard 中点击 **Create API**. 提供 Name 和 Identifier, 其中 Identifier 稍后将会使用
- Create the Backend API:
  - 安装如下包:
    - express: web server for node
    - express-jwt: middleware to validate JWT(JsonWebTokens)
    - jwks-rsa: retrievers RSA signing keys from a JWKS endpoint [// cSpell: disable-line]
    - cors: middleware to enable CORS
    - npm-run-all: a helper to run the SPA and backend API concurrently
- 创建 <u>src/server.js</u> 文件, 写入后端代码
- 修改 <u>src/index.js</u>, 添加个参数 `audience`, 其值即为上面在 [Auth0] 的 dashboard 中新建的 **API** 中设置的 Identifier
- 创建 <u>src/views/ExternalApi.js</u> 文件, 通过传递 *Access Token* 去访问后端 API

[Auth0]:https://auth0.com
[react]:https://reactjs.org