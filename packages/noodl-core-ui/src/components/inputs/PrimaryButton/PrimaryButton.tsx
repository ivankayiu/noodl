// 導入必要的React hook和工具
import useParsedHref from '@noodl-hooks/useParsedHref';
import classNames from 'classnames';
import React, { FocusEventHandler, MouseEventHandler, useMemo } from 'react';
import { platform } from '@noodl/platform';
import { Icon, IconName, IconSize } from '@noodl-core-ui/components/common/Icon';
import { UnsafeStyleProps } from '@noodl-core-ui/types/global';
import { ActivityIndicator, ActivityIndicatorColor } from '../../common/ActivityIndicator';
import css from './PrimaryButton.module.scss';

/**
 * PrimaryButtonVariant 枚舉 - 定義按鈕的視覺樣式變體
 * Cta: 主要行動按鈕 (Call-To-Action)
 * Muted: 淡化樣式 (用於次要操作)
 * MutedOnLowBg: 低對比度背景上的淡化樣式
 * Ghost: 幽靈樣式 (只有文字和邊框)
 * Danger: 危險操作樣式 (如刪除)
 */
export enum PrimaryButtonVariant {
  Cta = 'cta',
  Muted = 'muted',
  MutedOnLowBg = 'muted-on-low-bg',
  Ghost = 'ghost',
  Danger = 'danger'
}

/**
 * PrimaryButtonSize 枚舉 - 定義按鈕的大小選項
 * Default: 預設大小
 * Small: 小尺寸
 */
export enum PrimaryButtonSize {
  Default = 'default',
  Small = 'small'
}

/**
 * PrimaryButtonProps 介面 - 定義主要按鈕元件的屬性
 * 用於使用者界面互動中的按鈕操作
 */
export interface PrimaryButtonProps extends UnsafeStyleProps {
  /** 按鈕顯示的文字標籤 | Button display label */
  label: string;
  
  /** 按鈕的視覺樣式變體 | Button visual style variant */
  variant?: PrimaryButtonVariant;
  
  /** 按鈕的大小 | Button size */
  size?: PrimaryButtonSize;
  
  /** 點擊時要開啟的外部連結 | External link URL to open on click */
  href?: string;
  
  /** 按鈕旁顯示的圖標名稱 | Icon name to display next to button */
  icon?: IconName;
  
  /** 是否禁用按鈕 | Whether button is disabled */
  isDisabled?: boolean;
  
  /** 是否顯示載入中狀態 | Whether button is in loading state */
  isLoading?: boolean;
  
  /** 按鈕寬度是否自適應內容 | Whether button width fits content */
  isFitContent?: boolean;
  
  /** 按鈕是否填滿可用空間 | Whether button grows to fill space */
  isGrowing?: boolean;
  
  /** 左邊是否有間距 | Whether to add left spacing */
  hasLeftSpacing?: boolean;
  
  /** 右邊是否有間距 | Whether to add right spacing */
  hasRightSpacing?: boolean;
  
  /** 下方是否有間距 | Whether to add bottom spacing */
  hasBottomSpacing?: boolean;
  
  /** 上方是否有間距 | Whether to add top spacing */
  hasTopSpacing?: boolean;
  
  /** 水平方向是否有間距 (左右) | Whether to add horizontal spacing */
  hasXSpacing?: boolean;
  
  /** 按鈕點擊事件處理器 | Click event handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  
  /** 滑鼠進入按鈕時的事件處理器 | Mouse enter event handler */
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  
  /** 滑鼠離開按鈕時的事件處理器 | Mouse leave event handler */
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  
  /** 按鈕獲得焦點時的事件處理器 | Focus event handler */
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  
  /** 按鈕失去焦點時的事件處理器 | Blur event handler */
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  
  /** 用於測試的識別符 | Test identifier */
  testId?: string;
}

/**
 * PrimaryButton 元件 - 主要互動按鈕
 * 
 * 用途: 用於應用程式中的主要使用者操作和互動
 * 
 * 使用範例:
 * <PrimaryButton
 *   label="確認"
 *   variant={PrimaryButtonVariant.Cta}
 *   size={PrimaryButtonSize.Default}
 *   onClick={handleClick}
 *   isLoading={isProcessing}
 * />
 */
export function PrimaryButton({
  label,                          // 按鈕標籤
  variant = PrimaryButtonVariant.Cta,  // 預設樣式為主要行動按鈕
  size = PrimaryButtonSize.Default,     // 預設大小為標準
  href,                           // 外部連結
  icon,                           // 按鈕圖標
  isDisabled,                     // 禁用狀態
  isLoading,                      // 載入狀態
  isFitContent,                   // 自適應內容寬度
  isGrowing,                      // 填滿可用空間
  hasLeftSpacing,                 // 左邊距
  hasRightSpacing,                // 右邊距
  hasBottomSpacing,               // 下邊距
  hasTopSpacing,                  // 上邊距
  hasXSpacing,                    // 水平邊距
  onClick,                        // 點擊事件
  onMouseEnter,                   // 滑鼠進入事件
  onMouseLeave,                   // 滑鼠離開事件
  onFocus,                        // 焦點事件
  onBlur,                         // 失焦事件
  testId,                         // 測試識別符
  UNSAFE_className,              // 不安全的自訂CSS類別名
  UNSAFE_style                   // 不安全的自訂CSS樣式
}: PrimaryButtonProps) {
  // 根據按鈕變體計算活動指示器的顏色
  const activityColor = useMemo(() => {
    switch (variant) {
      case PrimaryButtonVariant.Cta:
        return ActivityIndicatorColor.Dark;  // 主要按鈕使用深色載入指示
      case PrimaryButtonVariant.Muted:
        return ActivityIndicatorColor.Light; // 淡化按鈕使用淺色載入指示
      case PrimaryButtonVariant.Danger:
        return ActivityIndicatorColor.Dark;  // 危險按鈕使用深色載入指示
      default:
        return ActivityIndicatorColor.Dark;  // 預設使用深色
    }
  }, [variant]);

  // 解析並驗證外部連結URL
  const parsedHref = useParsedHref(href);

  return (
    <button
      // 使用classNames合併多個CSS類別以控制按鈕外觀
      className={classNames([
        css['Root'],                              // 基礎按鈕樣式
        (hasXSpacing || hasLeftSpacing) && css['has-left-spacing'],     // 左邊距
        (hasXSpacing || hasRightSpacing) && css['has-right-spacing'],   // 右邊距
        hasBottomSpacing && css['has-bottom-spacing'],                  // 下邊距
        hasTopSpacing && css['has-top-spacing'],                        // 上邊距
        isFitContent && css['is-fit-content'],                          // 自適應寬度
        isGrowing && css['is-growing'],                                 // 填滿空間
        css[`is-variant-${variant}`],                                   // 應用樣式變體
        css[`is-size-${size}`],                                         // 應用大小變體
        UNSAFE_className                                               // 自訂類別名
      ])}
      // 處理點擊事件，並支援外部連結
      onClick={(e) => {
        if (isLoading) return;                  // 載入中時忽略點擊
        if (parsedHref) platform.openExternal(parsedHref);  // 如有連結則開啟
        if (onClick) onClick(e);                // 觸發自訂點擊處理
      }}
      onMouseEnter={onMouseEnter}               // 滑鼠進入事件
      onMouseLeave={onMouseLeave}               // 滑鼠離開事件
      onFocus={onFocus}                         // 焦點事件
      onBlur={onBlur}                           // 失焦事件
      disabled={isDisabled}                     // 禁用狀態
      data-test={testId}                        // 測試識別符
      style={UNSAFE_style}                      // 自訂樣式
    >
      {/* 按鈕標籤和圖標容器 */}
      <span className={classNames([css['Label'], isLoading && css['is-loading']])}>
        {/* 如提供圖標則顯示圖標 */}
        {icon && (
          <Icon
            icon={icon}
            size={size === PrimaryButtonSize.Small ? IconSize.Small : undefined}
            UNSAFE_className={css['Icon']}
          />
        )}
        {/* 按鈕標籤文字 */}
        {label}
      </span>
      {/* 載入中顯示的轉圈指示器 */}
      <div className={classNames([css['Spinner'], isLoading && css['is-loading']])}>
        <ActivityIndicator color={activityColor} />
      </div>
    </button>
  );
}
