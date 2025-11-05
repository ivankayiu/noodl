// Checkbox 組件 — 帶有繁體中文註解
// -----------------------------------------------------
// 用於用戶界面中開關、選取狀態表示
import classNames from 'classnames'; // 合併CSS類別
import React, { ChangeEventHandler, cloneElement, FocusEventHandler, MouseEventHandler } from 'react'; // React元件和事件型別
import { InputNotification } from '@noodl-types/globalInputTypes'; // 通知型別
import { ReactComponent as CheckmarkIcon } from '@noodl-core-ui/assets/icons/checkmark.svg'; // 打勾SVG
import { Slot, UnsafeStyleProps } from '@noodl-core-ui/types/global'; // 插槽與自訂樣式
import { InputLabelSection } from '../InputLabelSection'; // 輸入標籤區塊
import { NotificationFeedbackDisplay } from '../NotificationFeedbackDisplay'; // 通知UI組件
import { useNotificationFeedbackDisplay } from '../NotificationFeedbackDisplay/NotificationFeedbackDisplay.hooks'; // 通知hook
import css from './Checkbox.module.scss'; // 樣式表

/**
 * CheckboxVariant 枚舉 — 樣式變體
 * Default: 預設風格
 * Sidebar: 側邊欄專用
 * Light: 淺色風格
 */
export enum CheckboxVariant {
  Default = 'default',     // 預設樣式
  Sidebar = 'sidebar',     // 側邊欄專用
  Light = 'light'          // 淺色設計
}

/**
 * CheckboxSize 枚舉 — 尺寸類型
 * Small: 小尺寸
 * Large: 大尺寸
 */
export enum CheckboxSize {
  Small = 'small',         // 小
  Large = 'large'          // 大
}

/**
 * CheckboxProps 介面 — 屬性說明
 * 用於描述Checkbox所有傳入屬性型別與用途
 */
export interface CheckboxProps extends UnsafeStyleProps {
  variant?: CheckboxVariant;        // 樣式風格
  label?: string;                   // 顯示的標籤文字
  value?: string | number;          // 值（用於form提交/受控組件）
  children?: Slot;                  // 插入子元素
  checkboxSize?: CheckboxSize;      // 尺寸
  notification?: InputNotification; // 顯示通知
  hasHiddenCheckbox?: boolean;      // 隱藏原生checkbox（只顯示自訂UI）
  hasBottomSpacing?: boolean;       // 是否下方留空間
  onChange?: ChangeEventHandler<HTMLInputElement>;   // 選取狀態改變
  onMouseEnter?: MouseEventHandler<HTMLLabelElement>; // 滑鼠進入事件
  onMouseLeave?: MouseEventHandler<HTMLLabelElement>; // 滑鼠離開事件
  onFocus?: FocusEventHandler<HTMLLabelElement>;      // 獲得焦點
  onBlur?: FocusEventHandler<HTMLLabelElement>;       // 失焦事件
  isChecked?: boolean;               // 是否勾選
  isDisabled?: boolean;              // 是否禁用
  testId?: string;                   // 測試識別符
}

/**
 * Checkbox 組件 — 核取方塊（用戶UI選項狀態切換）
 * 典型用法：
 * <Checkbox label="認同條款" isChecked={checked} onChange={toggleHandler} />
 */
export function Checkbox({
  variant = CheckboxVariant.Default,      // 樣式預設：default
  label,                                 // 顯示標籤
  value,                                 // 送出的值
  children,                              // 子元素/自定icon
  checkboxSize = CheckboxSize.Small,     // 預設小尺寸
  notification,                          // 顯示通知
  hasHiddenCheckbox,                     // 隱藏原生checkbox
  hasBottomSpacing,                      // 下方空間
  onChange,                              // 勾選事件
  onMouseEnter, onMouseLeave, onFocus, onBlur,
  isChecked,                             // 勾選狀態
  isDisabled,                            // 禁用
  testId,                                // 測試用
  UNSAFE_className,                      // 自定CSS類
  UNSAFE_style                           // 自定樣式
}: CheckboxProps) {
  const [newNotification, setNewNotification] = useNotificationFeedbackDisplay(notification); // 通知hook
  return (
    <label
      className={classNames([
        css['Root'],                           // 外層樣式
        css[`is-variant-${variant}`],          // 樣式變體
        isDisabled && css['is-disabled'],       // 禁用狀態
        hasBottomSpacing && css['has-bottom-spacing'], // 下方間距
        UNSAFE_className                       // 自定類名
      ])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      data-test={testId}
      style={UNSAFE_style}
    >
      {/* 通知顯示（如有訊息） */}
      <NotificationFeedbackDisplay notification={newNotification} />
      {/* 原生checkbox元件 — 隱藏時不顯示 */}
      <input
        className={css['Checkbox']}           // input樣式
        type="checkbox"
        checked={isChecked}                   // 受控勾選狀態
        disabled={isDisabled}                 // 禁用
        onChange={onChange}                   // 狀態改變事件
        value={value}                         // 送出表單值
      />
      {/* 自義checkbox外觀 */}
      {!hasHiddenCheckbox && (
        <div className={classNames([
          css['FauxCheckbox'],               // 自訂外層
          css[`is-size-${checkboxSize}`],    // 尺寸
          Boolean(label) && css['has-right-margin'] // 標籤空間
        ])}>
          {isChecked && <CheckmarkIcon />}   {/* 已勾選顯示打勾圖示 */}
        </div>
      )}
      {/* 可插入自定slot元素，且傳遞勾選狀態 */}
      {children &&
        <div className={css['ChildContainer']}>
          {cloneElement(children as any, { isChecked })}
        </div>
      }
      {/* 顯示label標籤 */}
      {label && <InputLabelSection label={label} />}
    </label>
  );
}
