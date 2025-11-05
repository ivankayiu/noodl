// Select 元件 — 帶繁體中文註解
// -----------------------------------------------------
// 下拉清單（選擇器）UI元件，支援多種典型業務場景
import classNames from 'classnames'; // CSS類名合併
import React, { useMemo, useRef, useState } from 'react'; // React組件及hook（狀態、引用）
import { InputNotification } from '@noodl-types/globalInputTypes'; // 輸入通知型別
import { Icon, IconName } from '@noodl-core-ui/components/common/Icon'; // 圖標
import { BaseDialog, BaseDialogVariant, DialogRenderDirection } from '@noodl-core-ui/components/layout/BaseDialog'; // 下拉彈窗基礎元件
import { UnsafeStyleProps } from '@noodl-core-ui/types/global'; // 樣式Props
import { InputLabelSection } from '../InputLabelSection';       // 標籤區
import { NotificationFeedbackDisplay } from '../NotificationFeedbackDisplay'; // 通知顯示
import { useNotificationFeedbackDisplay } from '../NotificationFeedbackDisplay/NotificationFeedbackDisplay.hooks'; // 通知hook
import css from './Select.module.scss'; // 樣式

/**
 * SelectOption 泛型介面 — 下拉選項
 * label: 顯示文字
 * value: 選項值（支持string/number）
 * isDisabled: 是否禁用
 */
export interface SelectOption<T = string | number> {
  label: string;          // 下拉選項顯示文字
  value: T;               // 選項值（string/number泛型）
  isDisabled?: boolean;   // 是否禁用
}

/**
 * SelectColorTheme 枚舉 — 下拉式選單主題色
 */
export enum SelectColorTheme {
  Transparent = 'is-color-theme-transparent', // 透明主題
  Dark = 'is-color-theme-dark',               // 深色主題
  DarkLighter = 'is-color-theme-dark-lighter' // 淺深色主題
}

/**
 * SelectSize 枚舉 — 控制選單尺寸大小
 */
export enum SelectSize {
  Default = 'is-size-default',  // 預設
  Small = 'is-size-small'       // 小尺寸
}

/**
 * SelectProps 介面 — 元件所有接口屬性
 */
export interface SelectProps extends UnsafeStyleProps {
  options: SelectOption[];          // 下拉選項列表
  value?: SelectOption['value'];    // 目前已選值
  placeholder?: string;             // 提示文字
  notification?: InputNotification; // 通知（警告／提示）
  label?: string;                   // 輸入欄標題
  colorTheme?: SelectColorTheme;    // 主題色
  size?: SelectSize;                // 選單尺寸
  isDisabled?: boolean;             // 是否禁用
  hasBottomSpacing?: boolean;       // 下方間距
  onChange?: (value: SelectOption['value']) => void; // 改變選項事件
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode; // 客製化選項渲染
  testId?: string;                  // 測試識別符
}

/**
 * Select 組件 — 下拉清單範例
 * 使用場景：表單、狀態選擇、分組選取等
 * 範例：
 * <Select
 *    label="狀態"
 *    options={[{ label: '啟用', value: 1 }, { label: '停用', value: 0 }]}
 *    value={status}
 *    onChange={setStatus}
 *    placeholder="請選擇狀態"
 * />
 */
export function Select({
  options,
  value,
  placeholder,
  notification,
  label,
  colorTheme = SelectColorTheme.Dark,
  size = SelectSize.Default,
  isDisabled,
  hasBottomSpacing,
  onChange,
  renderOption,
  testId,
  UNSAFE_className,
  UNSAFE_style
}: SelectProps) {
  // 狀態管理及通知hook
  const [open, setOpen] = useState(false);               // 下拉是否展開
  const [newNotification, setNewNotification] = useNotificationFeedbackDisplay(notification); // 通知
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = useMemo(
    () => options.find(option => option.value === value),
    [options, value]
  );

  function handleSelect(option: SelectOption) {
    if (!option.isDisabled && onChange) {
      onChange(option.value);
      setOpen(false);
      setNewNotification(undefined);
    }
  }

  return (
    <div
      className={classNames([
        css['Root'],
        css[colorTheme],
        css[size],
        isDisabled && css['is-disabled'],
        hasBottomSpacing && css['has-bottom-spacing'],
        UNSAFE_className
      ])}
      ref={selectRef}
      style={UNSAFE_style}
      data-test={testId}
    >
      {/* 標籤區（如有label） */}
      {label && <InputLabelSection label={label} />}
      {/* 通知提示（如有） */}
      <NotificationFeedbackDisplay notification={newNotification} />
      {/* 下拉主體 */}
      <div
        className={css['Control']}
        onClick={() => !isDisabled && setOpen(!open)}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-disabled={isDisabled}
      >
        {/* 已選選項 / 提示文字 */}
        <span className={css['SelectedValue']}>
          {selectedOption ? selectedOption.label : placeholder || ''}
        </span>
        {/* 下拉icon */}
        <Icon icon={IconName.ChevronDown} className={css['Icon']} />
      </div>
      {/* 下拉選項列表（展開時） */}
      {open && (
        <BaseDialog
          anchorRef={selectRef}
          variant={BaseDialogVariant.Popover}
          renderDirection={DialogRenderDirection.Bottom}
          className={css['Dropdown']}
          onClose={() => setOpen(false)}
        >
          <ul className={css['Options']}>
            {options.map((option, idx) => (
              <li
                key={option.value}
                className={classNames([
                  css['Option'],
                  option.isDisabled && css['is-disabled'],
                  selectedOption?.value === option.value && css['is-selected']
                ])}
                onClick={() => handleSelect(option)}
                aria-selected={selectedOption?.value === option.value}
                aria-disabled={option.isDisabled}
                tabIndex={option.isDisabled ? -1 : 0}
              >
                {renderOption
                  ? renderOption(option, selectedOption?.value === option.value)
                  : option.label}
              </li>
            ))}
          </ul>
        </BaseDialog>
      )}
    </div>
  );
}
