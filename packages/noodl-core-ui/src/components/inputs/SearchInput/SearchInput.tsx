// SearchInput 元件 — 繁體中文註解
// -----------------------------------------------------
// 用於即時篩選及搜尋功能的UI元件，常見於清單篩選、搜索框
import { Icon, IconName } from '@noodl-core-ui/components/common/Icon'; // 搜索圖標
import { UnsafeStyleProps } from '@noodl-core-ui/types/global'; // 不安全自訂樣式屬性
import classNames from 'classnames'; // 合併CSS class名稱
import React, { Ref } from 'react'; // React型別
import css from './SearchInput.module.scss'; // 樣式表

/**
 * SearchInputProps 介面 — 屬性說明與提示
 * placeholder: 輸入提示文字
 * inputRef: input的ref(外部傳入)
 * value: 目前輸入值(受控)
 * onChange: 當內容改變時回調(回傳文字)
 * onFocus: 獲得焦點
 * onBlur: 失去焦點
 * onClick: 點擊input
 * isAutoFocus: 是否預設自動focus
 * 可傳入UNSAFE樣式與類名
 */
export interface SearchInputProps extends UnsafeStyleProps {
  placeholder?: string;                // 輸入提示文字（e.g. "請輸入關鍵字...")
  inputRef?: Ref<HTMLInputElement>;    // 外部input的ref傳遞
  value?: string;                      // 目前文字內容
  onChange: (value: string) => void;   // 輸入內容改變事件
  onFocus?: () => void;                // input獲得焦點
  onBlur?: () => void;                 // input失去焦點
  onClick?: () => void;                // input點擊事件
  isAutoFocus?: boolean;               // 是否開啟自動聚焦
}

/**
 * SearchInput 元件範例用法：
 * <SearchInput
 *   value={keyword}
 *   placeholder="搜尋關鍵字..."
 *   onChange={setKeyword}
 *   isAutoFocus
 * />
 */
export function SearchInput({
  placeholder,
  value,
  inputRef,
  onChange,
  onFocus,
  onBlur,
  onClick,
  UNSAFE_className,
  UNSAFE_style,
  isAutoFocus
}: SearchInputProps) {
  return (
    <div className={css['Root']}>
      {/* 搜索框本身 */}
      <input
        className={classNames(css['SearchInput'], UNSAFE_className)}
        type="text"
        placeholder={placeholder}
        ref={inputRef}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        style={UNSAFE_style}
        value={value}
        autoFocus={isAutoFocus}
      />
      {/* 搜索icon */}
      <Icon icon={IconName.Search} UNSAFE_className={css['SearchInputIcon']} />
    </div>
  );
}
