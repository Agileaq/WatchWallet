# 比特观察 · BitWatch

一个简洁的比特币钱包地址观察工具，支持实时追踪链上资产。

**Language:** [العربية](#العربية) · [中文](#中文) · [English](#english) · [Français](#français) · [Русский](#русский) · [Español](#español)

---

## 中文

一个简洁的比特币钱包地址观察工具，支持实时追踪链上资产。

**在线访问：** https://agileaq.github.io/WatchWallet/

### 特性

- 🔐 **生物识别** - Face ID / Touch ID 快速解锁，基于 WebAuthn 标准
- 🔒 **本地加密存储** - 所有数据使用AES-256-GCM加密保存在浏览器本地
- 🛡️ **自动锁定** - 切换应用后自动锁定，保护隐私安全
- 📱 **PWA支持** - 可安装到iOS/Android主屏幕，像原生应用一样使用
- 🌐 **实时数据** - 多源API获取最新的链上数据和汇率信息
- 💰 **多地址追踪** - 支持添加多个比特币地址并统一管理
- 📊 **费率显示** - 实时显示网络费率信息（最快/1小时/经济/最低）
- 📤 **导入导出** - 支持备份和恢复地址列表
- 🚀 **本地化资源** - 所有依赖自托管，长期稳定可用

### PWA安装 (手机应用安装方法)

#### iOS (Safari)
1. 在Safari中打开应用
2. 点击"分享"按钮
3. 选择"添加到主屏幕"

#### Android (Chrome)
1. 在Chrome中打开应用
2. 点击菜单中的"添加到主屏幕"

### 安全说明

- 这是一个只读工具，不涉及私钥管理
- 所有数据仅存储在您的设备本地
- 使用 AES-256-GCM 密码加密保护您的地址列表
- 生物识别基于 WebAuthn 标准，凭证硬件级保护
- 切换应用自动锁定，需要重新验证
- 建议定期导出备份
- 仅在 HTTPS 环境下使用加密功能

### 技术栈

- Vue.js 3.5.22 (Composition API)
- Tailwind CSS 4.1.13
- Web Crypto API (PBKDF2 + AES-256-GCM)
- WebAuthn API (生物识别)
- Service Worker (离线支持)
- Page Visibility API (自动锁定)
- 多源API（mempool.space, blockchain.info, coinbase等）

---

## العربية

<div dir="rtl">

أداة بسيطة لمراقبة عناوين محفظة البيتكوين، مع تتبّع فوري لأصولك على السلسلة.

**الرابط المباشر:** https://agileaq.github.io/WatchWallet/

### المزايا

- 🔐 **المصادقة الحيوية** - فتح سريع ببصمة الإصبع أو التعرف على الوجه عبر معيار WebAuthn
- 🔒 **تخزين محلي مشفّر** - جميع البيانات تُخزَّن مشفّرة بـ AES-256-GCM داخل المتصفح
- 🛡️ **قفل تلقائي** - يُقفل التطبيق تلقائياً عند التبديل إلى تطبيق آخر لحماية الخصوصية
- 📱 **دعم PWA** - يمكن تثبيته على الشاشة الرئيسية في iOS/Android ليعمل كتطبيق أصلي
- 🌐 **بيانات فورية** - مصادر API متعددة لبيانات السلسلة وأسعار الصرف
- 💰 **تتبّع عناوين متعددة** - إضافة عدة عناوين بيتكوين وإدارتها من مكان واحد
- 📊 **عرض الرسوم** - رسوم الشبكة اللحظية (الأسرع / خلال ساعة / اقتصادية / الأدنى)
- 📤 **استيراد وتصدير** - نسخ احتياطي واستعادة لقائمة العناوين
- 🚀 **موارد محلية** - جميع التبعيات مستضافة ذاتياً لضمان الاستقرار طويل الأمد

### تثبيت التطبيق (PWA)

#### iOS (Safari)
1. افتح التطبيق في Safari
2. انقر زر «مشاركة»
3. اختر «إضافة إلى الشاشة الرئيسية»

#### Android (Chrome)
1. افتح التطبيق في Chrome
2. اختر «إضافة إلى الشاشة الرئيسية» من القائمة

### ملاحظات أمنية

- أداة للقراءة فقط، لا تتعامل مع المفاتيح الخاصة إطلاقاً
- جميع البيانات تُخزَّن محلياً على جهازك فقط
- قائمة العناوين محمية بتشفير AES-256-GCM بكلمة مرور
- المصادقة الحيوية وفق معيار WebAuthn، والمفاتيح محمية بالعتاد
- قفل تلقائي عند تبديل التطبيقات، ويتطلب إعادة التحقق
- يُنصح بتصدير نسخة احتياطية بشكل دوري
- استخدم ميزات التشفير في بيئة HTTPS فقط

### المكدس التقني

- Vue.js 3.5.22 (Composition API)
- Tailwind CSS 4.1.13
- Web Crypto API (PBKDF2 + AES-256-GCM)
- WebAuthn API (المصادقة الحيوية)
- Service Worker (دعم دون اتصال)
- Page Visibility API (القفل التلقائي)
- مصادر API متعددة (mempool.space، blockchain.info، coinbase وغيرها)

---

</div>

## English

A clean Bitcoin wallet address watcher with real-time on-chain asset tracking.

**Live:** https://agileaq.github.io/WatchWallet/

### Features

- 🔐 **Biometric unlock** - Face ID / Touch ID via the WebAuthn standard
- 🔒 **Encrypted local storage** - all data encrypted with AES-256-GCM in the browser
- 🛡️ **Auto-lock** - locks automatically when you switch apps, protecting your privacy
- 📱 **PWA support** - installable on iOS/Android home screens, works like a native app
- 🌐 **Real-time data** - multi-source APIs for the latest on-chain data and exchange rates
- 💰 **Multi-address tracking** - add and manage multiple Bitcoin addresses in one place
- 📊 **Fee display** - live network fee estimates (fastest / 1 hour / economy / minimum)
- 📤 **Import/export** - back up and restore your address list
- 🚀 **Self-hosted assets** - all dependencies self-hosted for long-term stability

### Install as an app (PWA)

#### iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Choose Add to Home Screen

#### Android (Chrome)
1. Open the app in Chrome
2. Choose Add to Home Screen from the menu

### Security notes

- This is a read-only tool; private keys are never involved
- All data stays on your device only
- Your address list is protected with AES-256-GCM password encryption
- Biometrics use the WebAuthn standard with hardware-backed credentials
- Auto-lock on app switch, re-verification required
- Export backups regularly
- Use encryption features only over HTTPS

### Tech stack

- Vue.js 3.5.22 (Composition API)
- Tailwind CSS 4.1.13
- Web Crypto API (PBKDF2 + AES-256-GCM)
- WebAuthn API (biometrics)
- Service Worker (offline support)
- Page Visibility API (auto-lock)
- Multi-source APIs (mempool.space, blockchain.info, coinbase, etc.)

---

## Français

Un outil épuré pour surveiller des adresses de portefeuille Bitcoin, avec suivi en temps réel des actifs on-chain.

**En ligne :** https://agileaq.github.io/WatchWallet/

### Fonctionnalités

- 🔐 **Déverrouillage biométrique** - Face ID / Touch ID via le standard WebAuthn
- 🔒 **Stockage local chiffré** - toutes les données chiffrées en AES-256-GCM dans le navigateur
- 🛡️ **Verrouillage automatique** - se verrouille au changement d'application pour préserver la vie privée
- 📱 **Support PWA** - installable sur l'écran d'accueil iOS/Android, comme une app native
- 🌐 **Données en temps réel** - API multi-sources pour l'état de la chaîne et les taux de change
- 💰 **Suivi multi-adresses** - ajoutez et gérez plusieurs adresses Bitcoin au même endroit
- 📊 **Affichage des frais** - estimation des frais réseau en direct (le plus rapide / 1 heure / économique / minimum)
- 📤 **Import/export** - sauvegarde et restauration de la liste d'adresses
- 🚀 **Ressources auto-hébergées** - dépendances hébergées localement pour une stabilité durable

### Installation (PWA)

#### iOS (Safari)
1. Ouvrez l'app dans Safari
2. Touchez le bouton Partager
3. Choisissez « Ajouter à l'écran d'accueil »

#### Android (Chrome)
1. Ouvrez l'app dans Chrome
2. Choisissez « Ajouter à l'écran d'accueil » dans le menu

### Notes de sécurité

- Outil en lecture seule : les clés privées ne sont jamais manipulées
- Toutes les données restent stockées sur votre appareil
- Liste d'adresses protégée par chiffrement AES-256-GCM avec mot de passe
- Biométrie via WebAuthn, credentials sécurisés par le matériel
- Verrouillage auto au changement d'app, re-vérification requise
- Pensez à exporter une sauvegarde régulièrement
- Utilisez les fonctions de chiffrement uniquement en HTTPS

### Stack technique

- Vue.js 3.5.22 (Composition API)
- Tailwind CSS 4.1.13
- Web Crypto API (PBKDF2 + AES-256-GCM)
- WebAuthn API (biométrie)
- Service Worker (support hors ligne)
- Page Visibility API (verrouillage auto)
- API multi-sources (mempool.space, blockchain.info, coinbase, etc.)

---

## Русский

Простой инструмент для наблюдения за адресами Bitcoin-кошельков с отслеживанием активов в блокчейне в реальном времени.

**Онлайн:** https://agileaq.github.io/WatchWallet/

### Возможности

- 🔐 **Биометрическая разблокировка** - Face ID / Touch ID по стандарту WebAuthn
- 🔒 **Локальное шифрование** - все данные шифруются AES-256-GCM в браузере
- 🛡️ **Автоблокировка** - блокируется при переключении приложений для защиты приватности
- 📱 **Поддержка PWA** - устанавливается на главный экран iOS/Android как нативное приложение
- 🌐 **Данные в реальном времени** - несколько источников API по данным блокчейна и курсам
- 💰 **Несколько адресов** - добавляйте и управляйте множеством Bitcoin-адресов в одном месте
- 📊 **Комиссии** - актуальные оценки комиссий сети (самая быстрая / 1 час / экономная / минимальная)
- 📤 **Импорт/экспорт** - резервное копирование и восстановление списка адресов
- 🚀 **Локальные ресурсы** - все зависимости размещены самостоятельно для долгосрочной стабильности

### Установка приложения (PWA)

#### iOS (Safari)
1. Откройте приложение в Safari
2. Нажмите «Поделиться»
3. Выберите «На экран “Домой”»

#### Android (Chrome)
1. Откройте приложение в Chrome
2. Выберите «На главный экран» в меню

### Заметки по безопасности

- Инструмент только для чтения, приватные ключи не задействованы
- Все данные хранятся только на вашем устройстве
- Список адресов защищён шифрованием AES-256-GCM с паролем
- Биометрия по стандарту WebAuthn с аппаратной защитой ключей
- Автоблокировка при переключении приложений, требуется повторная проверка
- Регулярно экспортируйте резервные копии
- Шифрование используйте только по HTTPS

### Технологии

- Vue.js 3.5.22 (Composition API)
- Tailwind CSS 4.1.13
- Web Crypto API (PBKDF2 + AES-256-GCM)
- WebAuthn API (биометрия)
- Service Worker (офлайн-поддержка)
- Page Visibility API (автоблокировка)
- Несколько источников API (mempool.space, blockchain.info, coinbase и др.)

---

## Español

Una herramienta sencilla para vigilar direcciones de cartera Bitcoin con seguimiento en tiempo real de los activos en cadena.

**En línea:** https://agileaq.github.io/WatchWallet/

### Características

- 🔐 **Desbloqueo biométrico** - Face ID / Touch ID mediante el estándar WebAuthn
- 🔒 **Almacenamiento local cifrado** - todos los datos se cifran con AES-256-GCM en el navegador
- 🛡️ **Bloqueo automático** - se bloquea al cambiar de aplicación para proteger tu privacidad
- 📱 **Soporte PWA** - instalable en la pantalla de inicio de iOS/Android, como una app nativa
- 🌐 **Datos en tiempo real** - APIs multifuente para datos en cadena y tipos de cambio
- 💰 **Seguimiento multi-dirección** - añade y gestiona varias direcciones Bitcoin en un solo lugar
- 📊 **Visualización de comisiones** - estimaciones de comisiones de red en vivo (más rápida / 1 hora / económica / mínima)
- 📤 **Importar/exportar** - copia de seguridad y restauración de la lista de direcciones
- 🚀 **Recursos autoalojados** - todas las dependencias autoalojadas para estabilidad a largo plazo

### Instalación como aplicación (PWA)

#### iOS (Safari)
1. Abre la app en Safari
2. Toca el botón Compartir
3. Elige Añadir a la pantalla de inicio

#### Android (Chrome)
1. Abre la app en Chrome
2. Elige Añadir a la pantalla de inicio en el menú

### Notas de seguridad

- Es una herramienta de solo lectura; nunca se manejan claves privadas
- Todos los datos se guardan únicamente en tu dispositivo
- La lista de direcciones se protege con cifrado AES-256-GCM mediante contraseña
- La biometría usa el estándar WebAuthn con credenciales respaldadas por hardware
- Bloqueo automático al cambiar de app; requiere verificar de nuevo
- Exporta copias de seguridad con regularidad
- Usa las funciones de cifrado solo en HTTPS

### Stack técnico

- Vue.js 3.5.22 (Composition API)
- Tailwind CSS 4.1.13
- Web Crypto API (PBKDF2 + AES-256-GCM)
- WebAuthn API (biometría)
- Service Worker (soporte sin conexión)
- Page Visibility API (bloqueo automático)
- APIs multifuente (mempool.space, blockchain.info, coinbase, etc.)

---

Made with ❤️ (感恩刘教链的第一个版本的inspiration )  
- 保留README里教链的打赏支持地址: bc1qc4mu8c2y6xwhc8h65hj0phncc9kzsr7s6cjxk8
- Agileaq的打赏支持地址: 128ikttXEBd5ggeFecv5844yJ6tfKSQeTr
