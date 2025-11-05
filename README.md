# Noodl
[Noodl](https://noodl.net) is a low-code platform where designers and developers build custom applications and experiences. Designed as a visual programming environment, it aims to expedite your development process. It promotes the swift and efficient creation of applications, requiring minimal coding knowledge.

## Documentation
Documentation for how to use Noodl can be found here:
[https://noodlapp.github.io/noodl-docs/](https://noodlapp.github.io/noodl-docs/)

## Community
Main support channel is Discord: 
[https://www.noodl.net/community](https://www.noodl.net/community)

## Download releases
Pre-built binaries can be 
[downloaded from Github](https://github.com/noodlapp/noodl/releases)

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

---
## UI 元件中文化教學 (UI Component Localization Tutorial)

### 基本元件標註示例 (Basic Component Annotation Examples)

本教學展示如何在 Noodl 中進行 UI 元件的中文化。以下是常用基本元件的中文標註示例：

#### 1. 按鈕元件 (Button Component)

**英文名稱**: Button (按鈕)

**位置**: `packages/noodl-core-ui/src/components/inputs/PrimaryButton/`

**主要屬性**:
```
PrimaryButton / 主按鈕
  - label: string         // 按鈕文本標籤
  - variant: Variant      // 按鈕樣式變體 (cta, muted, danger, ghost)
  - size: Size            // 按鈕大小 (default, small)
  - isDisabled: boolean   // 是否禁用
  - isLoading: boolean    // 是否正在加載
  - onClick: Function     // 點擊事件回調
```

**使用示例**:
```tsx
// 英文名稱
import { PrimaryButton } from '@noodl-core-ui/components/inputs';

// 中文標註: Button = 按鈕
<PrimaryButton 
  label="按鈕文本"      {/* Button Label = 按鈕標籤 */}
  variant="cta"         {/* Variant = 樣式 */}
  onClick={handleClick} {/* Click Event = 點擊事件 */}
/>
```

#### 2. 輸入框元件 (Input Component)

**英文名稱**: TextInput (輸入框)

**位置**: `packages/noodl-core-ui/src/components/inputs/TextInput/`

**主要屬性**:
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

**使用示例**:
```tsx
// 英文名稱
import { TextInput } from '@noodl-core-ui/components/inputs';

// 中文標註: Input = 輸入框
<TextInput 
  value={inputValue}               {/* Input Value = 輸入值 */}
  placeholder="請輸入文本"         {/* Placeholder = 佔位符 */}
  label="使用者名稱"               {/* Input Label = 輸入標籤 */}
  onChange={handleInputChange}     {/* Change Event = 改變事件 */}
/>
```

### 中文化最佳實踐 (Localization Best Practices)

1. **保持英文原名稱**: 在代碼中保留英文元件名稱以確保兼容性
   ```tsx
   // ✓ 推薦: 保留英文名，通過註釋添加中文
   <PrimaryButton label="提交"> {/* Button / 按鈕 */}
   
   // ✗ 不推薦: 改變元件名稱
   <主按鈕 標籤="提交">
   ```

2. **使用註釋標註屬性**: 在 props 上方或旁邊添加中文註釋
   ```tsx
   <PrimaryButton 
     label="點擊我"           // label / 標籤
     isDisabled={false}      // isDisabled / 是否禁用
     onClick={handleClick}   // onClick / 點擊事件
   />
   ```

3. **創建常量映射表**: 為常用屬性值創建中英文映射
   ```tsx
   const ButtonVariantMap = {
     cta: '呼籲按鈕',
     muted: '柔和按鈕',
     danger: '危險按鈕',
     ghost: '幽靈按鈕'
   };
   ```

4. **文檔中併列顯示**: 在教學和文檔中同時展示英文和中文
   ```
   PrimaryButton (主按鈕) / 按鈕 組件
   TextInput (文字輸入) / 輸入框 組件
   Checkbox (複選框) / 核對方塊 組件
   ```

### 常用元件速查表 (Common Components Quick Reference)

| 英文名稱 | 中文名稱 | 位置 | 用途 |
|---------|---------|------|------|
| **PrimaryButton** | **主按鈕** | `inputs/PrimaryButton` | 主要操作按鈕 |
| **TextInput** | **文字輸入** | `inputs/TextInput` | 單行文本輸入 |
| **TextArea** | **文字區域** | `inputs/TextArea` | 多行文本輸入 |
| **Checkbox** | **複選框** | `inputs/Checkbox` | 多選項選擇 |
| **Select** | **下拉選單** | `inputs/Select` | 單選項選擇 |
| **ToggleSwitch** | **切換開關** | `inputs/ToggleSwitch` | 開關狀態切換 |
| **SearchInput** | **搜尋輸入** | `inputs/SearchInput` | 搜尋功能 |
| **IconButton** | **圖示按鈕** | `inputs/IconButton` | 圖示型按鈕 |

### 如何使用本教學

1. 在代碼中使用英文元件名稱保持兼容性
2. 通過註釋或懸停提示添加中文說明
3. 在文檔和 UI 中並列展示英文/中文
4. 參考上方的速查表快速查詢元件的中文名稱
5. 遵循最佳實踐確保代碼可讀性和可維護性

**示範完成**: 本教學展示了如何在保持代碼完整性的前提下，實現 UI 元件的中文化標註，特別是對基本元件（Button = 按鈕、Input = 輸入框）的中文化和並列展示。
