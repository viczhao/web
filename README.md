# 日期倒计时 PWA 应用

这是一个渐进式 Web 应用（PWA），可以安装到手机桌面，提供类似原生应用的体验。

## 功能特点

- ✅ 选择日期，自动计算剩余天数
- ✅ 默认设置为下一个农历大年初一
- ✅ PWA 支持，可安装到手机桌面
- ✅ 离线可用（Service Worker 缓存）
- ✅ 移动端优化，适配微信浏览器
- ✅ 美观的渐变紫色主题

## 文件结构

```
page1/
├── index.html        # 主页面
├── manifest.json     # PWA 清单文件
├── sw.js            # Service Worker 文件
└── README.md        # 说明文档
```

## 部署方法

### 1. 本地测试

由于 PWA 需要 HTTPS 或 localhost，建议使用本地服务器测试：

```bash
# 进入目录
cd page1

# 使用 Python 启动简单服务器
python3 -m http.server 8080

# 或使用 Node.js 的 http-server
npx http-server -p 8080
```

然后在浏览器访问 `http://localhost:8080`

### 2. 部署到服务器

将 `page1` 目录中的所有文件上传到你的 Web 服务器：

- **要求**：服务器必须支持 HTTPS
- **文件**：上传 `index.html`, `manifest.json`, `sw.js` 三个文件
- **路径**：确保这些文件在同一目录下

### 3. 部署到静态托管服务

#### GitHub Pages
1. 创建仓库并上传文件
2. 在仓库设置中启用 GitHub Pages
3. 访问 `https://你的用户名.github.io/仓库名/`

#### Vercel / Netlify
1. 导入项目或直接拖拽 `page1` 文件夹
2. 自动部署完成
3. 获得 HTTPS 访问地址

## 安装到手机桌面

### Android (Chrome)
1. 在 Chrome 浏览器中打开应用
2. 点击浏览器菜单（三个点）
3. 选择"添加到主屏幕"或"安装应用"
4. 确认安装

### iOS (Safari)
1. 在 Safari 浏览器中打开应用
2. 点击底部"分享"按钮（方框加箭头）
3. 向下滚动，选择"添加到主屏幕"
4. 点击"添加"确认

## 微信中使用

在微信中打开链接后：
1. 点击右上角"..."
2. 选择"在浏览器中打开"
3. 然后按照上述步骤安装到桌面

## 注意事项

1. **HTTPS 必须性**：PWA 必须在 HTTPS 环境下运行（localhost 除外）
2. **Service Worker**：首次访问需要联网加载资源，之后可离线使用
3. **图标**：使用了 SVG 格式的内联图标，无需额外图片文件
4. **更新**：修改代码后，需要刷新缓存或重新安装应用

## 自定义修改

### 修改应用名称
编辑 `manifest.json` 中的 `name` 和 `short_name` 字段

### 修改主题颜色
编辑 `manifest.json` 中的 `theme_color` 和 `background_color` 字段
同时修改 `index.html` 中的 `<meta name="theme-color">`

### 修改默认日期
编辑 `index.html` 中的 `lunarNewYearDates` 对象

## 技术栈

- Vue 3 - 响应式框架
- Vant 4 - 移动端 UI 组件库
- Service Worker - 离线缓存
- Web App Manifest - PWA 配置

## 许可证

MIT License
