# Noodl
[Noodl](https://noodl.net) is a low-code platform where designers and developers build custom applications and experiences. Designed as a visual programming environment, it aims to expedite your development process. It promotes the swift and efficient creation of applications, requiring minimal coding knowledge.

## Documentation
Documentation for how to use Noodl can be found here:
[https://noodlapp.github.io/noodl-docs/](https://noodlapp.github.io/noodl-docs/)

## Community
Main support channel is Discord: [https://www.noodl.net/community](https://www.noodl.net/community)

## Download releases
Pre-built binaries can be [downloaded from Github](https://github.com/noodlapp/noodl/releases)

## Note for users who are migrating from the deprecated closed source version
- [Migrating the project files and workspaces to a Git provider](https://noodlapp.github.io/noodl-docs/docs/guides/collaboration/migrating-from-noodl-hosted-git)
- [Migrate backend and database](https://noodlapp.github.io/noodl-docs/docs/guides/deploy/using-an-external-backend#migrating-from-a-noodl-cloud-service)
- [Self-host frontend](https://noodlapp.github.io/noodl-docs/docs/guides/deploy/hosting-frontend)

## Building from source
```bash
# Install all dependencies
$ npm install
# Start the Noodl Editor and build a production version of the cloud and react runtime (useful when running Noodl from source but want to deploy to production)
$ npm start
# Start the Noodl Editor and watch the filesystem for changes to the runtimes. Development versions of the runtimes, not meant for production (mostly due to source maps and file size)
# This is ideal for a quick workflow when doing changes on the runtimes.
$ npm run dev
# Start Noodl Editor test runner
$ npm run test:editor
```

## Licenses
This repository contains two different licenses for different parts of the Noodl platform.
- Components related to the editor, used to edit Noodl projects, are under GPLv3
- Components related to the end applications, used by the applications Noodl deploys, are under MIT
All of the source code of applications created with Noodl are under MIT. This means you can do project specific changes to the runtime without having to redistribute your changes.
Packaged licensed under MIT:
- `noodl-runtime`
- `noodl-viewer-cloud`
- `noodl-viewer-react`
  
You can find a MIT LICENSE file in each of these packages. The rest of the repository is licensed under GPLv3.

---

## 中文簡介 (Chinese Introduction)

**此段為中文說明，不影響原程式運作**

Noodl 是一個低代碼平台，設計師和開發人員可以在其中構建自定義應用程式和體驗。作為一個視覺化編程環境，它旨在加快開發過程。它提倡快速高效地創建應用程式，只需最少的編碼知識。

### 主要特性
- **低代碼開發**：通過視覺化界面快速構建應用程式
- **設計師友好**：專為設計師和開發人員的協作而設計
- **快速迭代**：加快應用程式開發和部署流程
- **易於學習**：最小化編碼知識要求，易於上手

### 文檔和社群
更詳細的使用文檔可在官方網站查看。主要支持渠道是 Discord 社群。

### 許可證
本代碼庫採用雙重許可制：
- 編輯器相關組件採用 GPLv3 許可
- 最終應用程式相關組件採用 MIT 許可
