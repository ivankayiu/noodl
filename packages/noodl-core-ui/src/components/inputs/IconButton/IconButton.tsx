// IconButton 元件 — 繁體中文註解
// -----------------------------------------------------
// 用於UI各類 icon 按鈕，例如操作、工具列、狀態切換等
import classNames from 'classnames'; // 合併CSS類
import React, { MouseEventHandler } from 'react'; // React型別
import { Icon, IconName, IconSize, IconVariant } from '@noodl-core-ui/components/common/Icon'; // icon元件
import { Label, LabelSize } from '@noodl-core-ui/components/typography/Label'; // 文字標籤元件
import { UnsafeStyleProps } from '@noodl-core-ui/types/global'; // 自訂props
import css from './IconButton.module.scss'; // 樣式

/**
 * IconButtonVariant 枚舉 — 主要外觀變化
 * Default: 預設
 * Transparent: 透明背景
 * SemiTransparent: 半透明背景
 * OpaqueOnHover: 懸停不透明
 */
export enum IconButtonVariant {
  Default = 'is-variant-default',
  Transparent = 'is-variant-transparent',
  SemiTransparent = 'is-variant-semi-transparent',
  OpaqueOnHover = 'is-variant-opaque-on-hover',
}

/**
 * IconButtonState 枚舉 — 狀態變化
 * Default: 一般
 * Active: 活動
 * Rotated: 旋轉
 */
export enum IconButtonState {
  Default = 'is-state-default',
  Active = 'is-state-active',
  Rotated = 'is-state-rotated',
}

/**
 * IconButtonSize 枚舉 — 按鈕尺寸
 * Default: 預設
 * Bigger: 較大
 */
export enum IconButtonSize {
  Default = 'is-button-size-default',
  Bigger = 'is-button-size-bigger',
}

/**
 * IconButtonProps 介面 — 按鈕屬性與用途說明
 * icon: 圖示名稱
 * size: 圖示尺寸
 * buttonSize: 按鈕大小
 * variant: 外觀樣式
 * state: 狀態變體
 * iconVariant: icon專屬主題
 * label: 旁文字
 * isDisabled: 禁用
 * testId/id: 測試識別/id
 * onClick: 按鈕點擊事件
 * 可傳入自訂類與style
 */
export interface IconButtonProps extends UnsafeStyleProps {
  icon: IconName;                   // 按鈕圖標
  size?: IconSize;                  // 圖標尺寸
  buttonSize?: IconButtonSize;      // 按鈕尺寸
  variant?: IconButtonVariant;      // 主要外觀
  state?: IconButtonState;          // 互動狀態
  iconVariant?: IconVariant;        // 圖標主題
  label?: string;                   // 旁文字標籤
  isDisabled?: boolean;             // 禁用狀態
  testId?: string;                  // 測試用識別
  id?: string;                      // 元素id
  onClick?: MouseEventHandler<HTMLButtonElement>; // 點擊事件
}

/**
 * iconSizeToLabelSize 對應函式，以icon尺寸自動轉label尺寸
 */
function iconSizeToLabelSize(iconSize: IconSize): LabelSize {
  switch (iconSize) {
    case IconSize.Large:
      return LabelSize.Big;         // icon大型=>label大型
    case IconSize.Small:
      return LabelSize.Small;
    case IconSize.Tiny:
      return LabelSize.Small;
    default:
      return LabelSize.Default;     // 其他=>預設
  }
}

/**
 * IconButton 組件 — 圖標按鈕元件
 * 範例：
 * <IconButton icon={IconName.Edit} label="編輯" onClick={handleEdit} />
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      size = IconSize.Default,
      buttonSize = IconButtonSize.Default,
      variant = IconButtonVariant.Default,
      state = IconButtonState.Default,
      iconVariant,
      isDisabled,
      label,
      testId,
      onClick,
      UNSAFE_className,
      UNSAFE_style,
      id
    }: IconButtonProps,
    ref
  ) => {
    return (
      <button
        ref={ref}
        id={id}
        className={classNames(
          css['Root'],
          css[variant],
          css[state],
          css[buttonSize],
          css[`is-icon-variant-${iconVariant}`],
          UNSAFE_className
        )}
        onClick={onClick}
        disabled={isDisabled}
        style={UNSAFE_style}
        data-test={testId}
      >
        {/* 主圖標 */}
        <Icon icon={icon} size={size} UNSAFE_className={css['Icon']} variant={iconVariant} />
        {/* label文字，如有指定文字 */}
        {label && (
          <Label size={iconSizeToLabelSize(size)} UNSAFE_className={css.Label} variant={iconVariant}>
            {label}
          </Label>
        )}
      </button>
    );
  }
);
