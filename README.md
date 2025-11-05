# Noodl / 低代碼應用開發平台

[Noodl](https://noodl.net/) is a low-code platform where designers and developers build custom applications and experiences. Designed as a visual programming environment, it aims to expedite your development process. It promotes the swift and efficient creation of applications, requiring minimal coding knowledge.

[Noodl](https://noodl.net/)是一個低代碼平台，設計師和開發人員可以在其中構建自定義應用程式和體驗。作為一個視覺化編程環境，它旨在加快開發過程。它提倡快速高效地創建應用程式，只需最少的編碼知識。

## Documentation / 文檔

Documentation for how to use Noodl can be found here: [https://noodlapp.github.io/noodl-docs/](https://noodlapp.github.io/noodl-docs/)

Noodl的使用文檔可在此處找到：[https://noodlapp.github.io/noodl-docs/](https://noodlapp.github.io/noodl-docs/)

## Community / 社群

Main support channel is Discord: [https://www.noodl.net/community](https://www.noodl.net/community)

主要支持渠道是Discord：[https://www.noodl.net/community](https://www.noodl.net/community)

## Download releases / 下載發布版本

Pre-built binaries can be [downloaded from Github](https://github.com/noodlapp/noodl/releases)

預構建的二進制文件可以[從Github下載](https://github.com/noodlapp/noodl/releases)

## Note for users who are migrating from the deprecated closed source version / 從已棄用的閉源版本遷移的使用者注意

- [Migrating the project files and workspaces to a Git provider](https://noodlapp.github.io/noodl-docs/docs/guides/collaboration/migrating-from-noodl-hosted-git) / [將專案文件和工作區遷移到Git提供商](https://noodlapp.github.io/noodl-docs/docs/guides/collaboration/migrating-from-noodl-hosted-git)
- [Migrate backend and database](https://noodlapp.github.io/noodl-docs/docs/guides/deploy/using-an-external-backend#migrating-from-a-noodl-cloud-service) / [遷移後端和數據庫](https://noodlapp.github.io/noodl-docs/docs/guides/deploy/using-an-external-backend#migrating-from-a-noodl-cloud-service)
- [Self-host frontend](https://noodlapp.github.io/noodl-docs/docs/guides/deploy/hosting-frontend) / [自託管前端](https://noodlapp.github.io/noodl-docs/docs/guides/deploy/hosting-frontend)

## Building from source / 從源代碼構建

### Prerequisites / 前置條件

Install all dependencies using npm:

使用npm安裝所有依賴項：

```bash
$ npm install
```

### Available Commands / 可用命令

**Start the Noodl Editor and build production runtimes:**

啟動Noodl編輯器並構建生產運行時：

```bash
$ npm start
```

This command starts the Noodl Editor and builds a production version of the cloud and React runtime. This is useful when running Noodl from source but want to deploy to production.

此命令啟動Noodl編輯器並構建雲端和React運行時的生產版本。這在從源代碼運行Noodl但要部署到生產環境時很有用。

**Start the Noodl Editor with development runtimes (file watching):**

使用開發運行時啟動Noodl編輯器（文件監視）：

```bash
$ npm run dev
```

This command starts the Noodl Editor and watches the filesystem for changes to the runtimes. Development versions of the runtimes are not meant for production due to source maps and file size. This is ideal for a quick workflow when doing changes on the runtimes.

此命令啟動Noodl編輯器並監視文件系統中對運行時的更改。開發版本的運行時不適合生產環境，因為它們包含源地圖和較大的文件大小。這對於快速迭代運行時更改很理想。

**Start Noodl Editor test runner:**

啟動Noodl編輯器測試運行器：

```bash
$ npm run test:editor
```

## Licenses / 許可證

This repository contains two different licenses for different parts of the Noodl platform.

本代碼庫採用雙重許可制，用於Noodl平台的不同部分。

### Editor Components / 編輯器組件
- Components related to the editor, used to edit Noodl projects, are under **GPLv3**
- 與編輯器相關的組件（用於編輯Noodl專案）採用**GPLv3**許可

### Runtime Components / 運行時組件
- Components related to the end applications, used by the applications Noodl deploys, are under **MIT**
- 與最終應用程式相關的組件（由Noodl部署的應用程式使用）採用**MIT**許可

### Source Code of Applications Created with Noodl / 使用Noodl創建的應用程式源代碼
All of the source code of applications created with Noodl are under MIT. This means you can do project-specific changes to the runtime without having to redistribute your changes.

所有使用Noodl創建的應用程式的源代碼都採用MIT許可。這意味著您可以對運行時進行專案特定的更改，而無需重新分發您的更改。

### Packages licensed under MIT / 採用MIT許可的軟體包

- noodl-runtime
- noodl-viewer-cloud
- noodl-viewer-react

You can find a MIT LICENSE file in each of these packages. The rest of the repository is licensed under GPLv3.

您可以在這些軟體包中找到MIT許可文件。代碼庫的其餘部分採用GPLv3許可。

## Key Features / 主要特性

- **Low-Code Development / 低代碼開發**: Build applications quickly through a visual interface without writing extensive code.
  - 通過視覺化界面快速構建應用程式，無需編寫大量代碼。

- **Designer Friendly / 設計師友好**: Purpose-built for seamless collaboration between designers and developers.
  - 專為設計師和開發人員的協作而設計。

- **Fast Iteration / 快速迭代**: Accelerate application development and deployment process.
  - 加快應用程式開發和部署流程。

- **Easy to Learn / 易於學習**: Minimal coding knowledge required, making it accessible to everyone.
  - 最小化編碼知識要求，易於上手。

## UI Component Localization Tutorial / UI 元件中文化教學

This section demonstrates how to implement Chinese localization for UI components in Noodl while maintaining code compatibility.

本節演示如何在保持代碼兼容性的前提下實現Noodl中UI組件的中文化。

### Basic Component Annotation Examples / 基本元件標註示例

#### 1. Button Component / 按鈕元件

English Name / 英文名稱: Button (按鈕)
Location / 位置: packages/noodl-core-ui/src/components/inputs/PrimaryButton/

**Main Properties / 主要屬性:**
```
PrimaryButton / 主按鈕
  - label: string         // 按鈕文本標籤
  - variant: Variant      // 按鈕樣式變體 (cta, muted, danger, ghost)
  - size: Size            // 按鈕大小 (default, small)
  - isDisabled: boolean   // 是否禁用
  - isLoading: boolean    // 是否正在加載
  - onClick: Function     // 點擊事件回調
```

**Usage Example / 使用示例:**

```jsx
import { PrimaryButton } from '@noodl-core-ui/components/inputs';

// Chinese Annotation / 中文標註: Button = 按鈕
<PrimaryButton
  label="按鈕文本" // Button Label = 按鈕標籤
  variant="cta" // Variant = 樣式
  onClick={handleClick} // Click Event = 點擊事件
/>
```

#### 2. Text Input Component / 輸入框元件

English Name / 英文名稱: TextInput (輸入框)
Location / 位置: packages/noodl-core-ui/src/components/inputs/TextInput/

**Main Properties / 主要屬性:**
```
TextInput / 文字輸入
  - value: string         // 輸入框值
  - placeholder: string   // 佔位符文本
  - label: string         // 標籤文本
  - isDisabled: boolean   // 是否禁用
  - onChange: Function    // 值改變事件
  - onBlur: Function      // 失焦事件
  - onFocus: Function     // 獲焦事件
```

**Usage Example / 使用示例:**

```jsx
import { TextInput } from '@noodl-core-ui/components/inputs';

// Chinese Annotation / 中文標註: Input = 輸入框
<TextInput
  value={inputValue} // Input Value = 輸入值
  placeholder="請輸入文本" // Placeholder = 佔位符
  label="使用者名稱" // Input Label = 輸入標籤
  onChange={handleInputChange} // Change Event = 改變事件
/>
```

### Localization Best Practices / 中文化最佳實踐

1. **Maintain English Original Names / 保持英文原名稱**: Keep component names in English in the code to ensure compatibility.
   - 在代碼中保留英文元件名稱以確保兼容性。

   ✅ **Recommended / 推薦**:
   ```jsx
   <PrimaryButton label="提交">{/* Button / 按鈕 */}</PrimaryButton>
   ```

   ❌ **Not Recommended / 不推薦**:
   ```jsx
   <主按鈕 標籤="提交" />
   ```

2. **Use Comments for Annotations / 使用註釋標註屬性**: Add Chinese comments above or beside props.
   - 在props上方或旁邊添加中文註釋。

   ```jsx
   <PrimaryButton
     label="點擊我" // label / 標籤
     isDisabled={false} // isDisabled / 是否禁用
     onClick={handleClick} // onClick / 點擊事件
   />
   ```

3. **Create Constant Mapping Tables / 創建常量映射表**: For common property values, create Chinese-English mapping.
   - 為常用屬性值創建中英文映射。

   ```javascript
   const ButtonVariantMap = {
     cta: '呼籲按鈕',
     muted: '柔和按鈕',
     danger: '危險按鈕',
     ghost: '幽靈按鈕'
   };
   ```

4. **Bilingual Documentation / 文檔中併列顯示**: Display both English and Chinese in documentation and UI.
   - 在教學和文檔中同時展示英文和中文。

### Common Components Quick Reference / 常用元件速查表

| English Name / 英文名稱 | Chinese Name / 中文名稱 | Location / 位置 | Purpose / 用途 |
|---------|---------|---------|----------|
| PrimaryButton | 主按鈕 | inputs/PrimaryButton | 主要操作按鈕 |
| TextInput | 文字輸入 | inputs/TextInput | 單行文本輸入 |
| TextArea | 文字區域 | inputs/TextArea | 多行文本輸入 |
| Checkbox | 複選框 | inputs/Checkbox | 多選項選擇 |
| Select | 下拉選單 | inputs/Select | 單選項選擇 |
| ToggleSwitch | 切換開關 | inputs/ToggleSwitch | 開關狀態切換 |
| SearchInput | 搜尋輸入 | inputs/SearchInput | 搜尋功能 |
| IconButton | 圖示按鈕 | inputs/IconButton | 圖示型按鈕 |

### How to Use This Tutorial / 如何使用本教學

1. Use English component names in code to maintain compatibility / 在代碼中使用英文元件名稱保持兼容性
2. Add Chinese descriptions through comments or hover tooltips / 通過註釋或懸停提示添加中文說明
3. Display both English and Chinese in documentation and UI / 在文檔和UI中並列展示英文/中文
4. Refer to the quick reference table above for quick component lookup / 參考上方的速查表快速查詢元件的中文名稱
5. Follow best practices to ensure code readability and maintainability / 遵循最佳實踐確保代碼可讀性和可維護性
