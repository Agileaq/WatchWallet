# 比特观察 · BitWatch

一个简洁的比特币钱包地址观察工具，支持实时追踪链上资产。

## 特性

- 🔒 **本地加密存储** - 所有数据使用AES-GCM加密保存在浏览器本地
- 📱 **PWA支持** - 可安装到iOS/Android主屏幕，像原生应用一样使用
- 🌐 **实时数据** - 通过mempool.space API获取最新的链上数据
- 💰 **多地址追踪** - 支持添加多个比特币地址并统一管理
- 📊 **费率显示** - 实时显示网络费率信息
- 📤 **导入导出** - 支持备份和恢复地址列表

## 使用方法

访问：https://[你的GitHub用户名].github.io/WatchWallet/bitwatch_V1.1.html

## PWA安装

### iOS (Safari)
1. 在Safari中打开应用
2. 点击"分享"按钮
3. 选择"添加到主屏幕"

### Android (Chrome)
1. 在Chrome中打开应用
2. 点击菜单中的"添加到主屏幕"

## 技术栈

- Vue.js 3
- Tailwind CSS
- Web Crypto API
- Service Worker
- mempool.space API

## 安全说明

- 这是一个只读工具，不涉及私钥管理
- 所有数据仅存储在您的设备本地
- 使用密码加密保护您的地址列表
- 建议定期导出备份

---

Made with ❤️ | 打赏支持: bc1qc4mu8c2y6xwhc8h65hj0phncc9kzsr7s6cjxk8
