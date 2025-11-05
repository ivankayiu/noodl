// ToggleSwitch 元件 — 繁體中文註解
// -----------------------------------------------------
// UI中的開關元件，常用於設置狀態，例如啟用/停用、切換模式等
import { Label } from '@noodl-core-ui/components/typography/Label'; // 標籤元件
import classNames from 'classnames'; // 合併CSS類
import React, { ChangeEventHandler } from 'react'; // React元件/事件型別
import css from './ToggleSwitch.module.scss'; // 樣式

/**
 * ToggleSwitchProps 介面 — 屬性說明
 * value: 關聯值 (通常用於表單)
 * label: 開關名稱標籤
 * isChecked: 是否開啟(勾選)狀態
 * isAlwaysActiveColor: 持續使用主色(不跟隨狀態改變顏色)
 * onChange: 勾選變更事件
 */
export interface ToggleSwitchProps {
  value?: string;                 // 關聯值，受控form用
  label?: string;                 // 顯示於組件旁的名稱
  isChecked?: boolean;            // 開關狀態(true=已開啟)
  isAlwaysActiveColor?: boolean;  // 始終顯示主色
  onChange?: ChangeEventHandler<HTMLInputElement>; // 狀態改變事件
}

/**
 * ToggleSwitch 組件 範例用法：
 * <ToggleSwitch label="通知" isChecked={isNotify} onChange={e => setNotify(e.target.checked)} />
 */
export function ToggleSwitch({
  value,
  label,
  isChecked,
  isAlwaysActiveColor,
  onChange
}: ToggleSwitchProps) {
  return (
    <div className={css['Root']}>
      {/* 標籤欄，如果有輸入label */}
      {label && <Label>{label}</Label>}
      {/* 開關主要交互區域 */}
      <label className={css['Track']}>
        {/* 指示器：動態顏色與狀態控制 */}
        <div
          className={classNames(
            css['Indicator'],
            isChecked && css['is-checked'],
            isAlwaysActiveColor && css['is-always-active-color']
          )}
        />
        {/* 原生checkbox，受狀態控制 */}
        <input
          className={css['Input']}
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          value={value}
        />
      </label>
    </div>
  );
}
