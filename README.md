# React Blog

連結：https://jubeatt.github.io/React-blog/

- 測試帳號：user01
- 測試密碼：Lidemy

## 這是什麼？

這是用 React 串接 [Lidemy 學生專用 API Server](https://github.com/Lidemy/lidemy-student-json-api-server) 打造的簡易部落格。

目前做好的功能有：

- 登入 / 註冊機制
- 發文功能
- 顯示文章列表
- 分頁功能
- Markdown 編輯器
- RWD

大概就這樣吧！不過我希望這個部落格可以更完整一些，希望之後可以有：

- 文章留言功能
- 個人 Profile 頁面
- 每個使用者都可以有自己的文章列表

所以，沒意外的話之後會自己重新寫一個後端來串吧，目前這個 API 能做的事情非常有限，加油加油～

## 使用技術

- create-react-app 建置 React 環境
- redux 管理 user 和 posts 狀態
- redux-tool-kit 建立 redux 前置配置
- redux-thunk 協助 redux 進行非同步操作
- react-route 設計路由規則
- styled-component 版面 CSS 設計
- react-loading-overlay 畫面 loading 效果
- prettier 自動排版，讓 code 有標準化的格式
- react-md-editor 建立 Markdown 編輯器及輸出結果

## 運行方式

請先把這專案 clone 到你的本地端：

```bash
git clone https://github.com/jubeatt/React-blog.git
```

安裝所需套件：

```bash
npm install
```


接著執行：

```bash
# by npm
npm run start
# by yarn
yarn start 
```

就可以進入 development 環境。

如果要打包該專案：

```bash
npm run build
```



## 網頁預覽

### 首頁

![home-page](./preview-img/home-page.jpg)

### 單篇文章

![single-post](./preview-img/single-post.jpg)

### 註冊頁面

![sign-up-page](./preview-img/sign-up-page.jpg)

### 登入頁面

![log-in-page](./preview-img/log-in-page.jpg)

### 編輯頁面

![add-post-page](./preview-img/add-post-page.jpg)

## 網站的靈感來源

### 主體

從 Dribbble 找到 [Weronika Prasek](https://dribbble.com/shots/15315334--Segment-Blog) 設計的網頁（也參考了一些 Medium 的元素）

### 登入和註冊表單

從 Dribbble 找到 [Pixsellz](https://dribbble.com/shots/16502934-Sign-up-Log-in) 設計的表單
