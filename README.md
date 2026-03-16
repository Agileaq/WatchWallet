# 比特观察 · BitWatch

一个简洁的比特币钱包地址观察工具，支持实时追踪链上资产。

## 特性

- 🔐 **生物识别** - Face ID / Touch ID 快速解锁，基于 WebAuthn 标准
- 🔒 **本地加密存储** - 所有数据使用AES-256-GCM加密保存在浏览器本地
- 🛡️ **自动锁定** - 切换应用后自动锁定，保护隐私安全
- 📱 **PWA支持** - 可安装到iOS/Android主屏幕，像原生应用一样使用
- 🌐 **实时数据** - 多源API获取最新的链上数据和汇率信息
- 💰 **多地址追踪** - 支持添加多个比特币地址并统一管理
- 📊 **费率显示** - 实时显示网络费率信息（最快/1小时/经济/最低）
- 📤 **导入导出** - 支持备份和恢复地址列表
- 🚀 **本地化资源** - 所有依赖自托管，长期稳定可用

## 使用方法

访问：https://agileaq.github.io/WatchWallet/

## PWA安装

### iOS (Safari)
1. 在Safari中打开应用
2. 点击"分享"按钮
3. 选择"添加到主屏幕"

### Android (Chrome)
1. 在Chrome中打开应用
2. 点击菜单中的"添加到主屏幕"

## 技术栈

- Vue.js 3.5.22 (Composition API)
- Tailwind CSS 4.1.13
- Web Crypto API (PBKDF2 + AES-256-GCM)
- WebAuthn API (生物识别)
- Service Worker (离线支持)
- Page Visibility API (自动锁定)
- 多源API（mempool.space, blockchain.info, coinbase等）

## 安全说明

- 这是一个只读工具，不涉及私钥管理
- 所有数据仅存储在您的设备本地
- 使用 AES-256-GCM 密码加密保护您的地址列表
- 生物识别基于 WebAuthn 标准，凭证硬件级保护
- 切换应用自动锁定，需要重新验证
- 建议定期导出备份
- 仅在 HTTPS 环境下使用加密功能

---

Made with ❤️ (感恩刘教链的第一个版本的inspiration )  
- 保留README里教链的打赏支持地址: bc1qc4mu8c2y6xwhc8h65hj0phncc9kzsr7s6cjxk8
- Agileaq的打赏支持地址: 128ikttXEBd5ggeFecv5844yJ6tfKSQeTr
