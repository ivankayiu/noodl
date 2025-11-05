// TextInput 元件（Input）— 帶繁體中文註解
// -----------------------------------------------------
// 用於收集和顯示單行輸入的UI元件
import useCallAfterNextRender from '@noodl-hooks/useCallAfterNextRender'; // 於下一個渲染後執行回調
import classNames from 'classnames'; // 合併CSS類別
import React, {
  ChangeEventHandler,     // 輸入變更事件處理器 | Change event handler
  MouseEventHandler,      // 滑鼠事件處理器 | Mouse event handler
  FocusEventHandler,      // 焦點事件處理器 | Focus event handler
  useRef,                 // 建立ref引用 | Create ref
  useState,               // 管理狀態 | State management
  RefObject,              // 元素ref型別 | Ref type
  useEffect,              // 副作用處理 | Effect hook
  KeyboardEventHandler    // 鍵盤事件處理器 | Keyboard event handler
} from 'react';
import { platform } from '@noodl/platform'; // 平台方法 | Platform utilities
import { InputNotification, InputNotificationDisplayMode } from '@noodl-types/globalInputTypes'; // 輸入通知型別
import { FeedbackType } from '@noodl-constants/FeedbackType'; // 通知反饋型別
import { IconName, IconSize } from '@noodl-core-ui/components/common/Icon'; // 圖標名稱與大小
import { IconButton, IconButtonVariant } from '@noodl-core-ui/components/inputs/IconButton'; // 圖標按鈕
import { Text } from '@noodl-core-ui/components/typography/Text'; // 文字元件
import { SingleSlot, UnsafeStyleProps } from '@noodl-core-ui/types/global'; // 樣式屬性
import { InputLabelSection } from '../InputLabelSection'; // 輸入標籤區
import { NotificationFeedbackDisplay } from '../NotificationFeedbackDisplay'; // 通知顯示
import { useNotificationFeedbackDisplay } from '../NotificationFeedbackDisplay/NotificationFeedbackDisplay.hooks'; // 通知反饋 Hook
import { useResizableInput } from './TextInput.hooks'; // 輸入框自動縮放 Hook
import css from './TextInput.module.scss'; // 樣式

/**
 * TextInputVariant 枚舉 — 輸入框外觀變體
 * Default: 預設樣式
 * InModal: 用於Modal對話框
 * OpaqueOnHover: 懸停時不透明
 * Transparent: 透明樣式
 */
export enum TextInputVariant {
  Default = 'is-variant-default', // 預設
  InModal = 'is-variant-in-modal', // 用於Modal
  OpaqueOnHover = 'is-variant-opaque-on-hover', // 懸停時不透明
  Transparent = 'is-variant-transparent' // 透明
}

/**
 * AllowedInputTypes 限制可支持input type種類
 * 支援多種原生HTML輸入型別
 */
type AllowedInputTypes =
  | 'color'         // 顏色
  | 'date'          // 日期
  | 'datetime-local'// 日期時間
  | 'email'         // 電子郵件
  | 'file'          // 檔案
  | 'image'         // 圖片
  | 'month'         // 月份
  | 'number'        // 數字
  | 'password'      // 密碼
  | 'search'        // 搜尋
  | 'tel'           // 電話
  | 'text'          // 文字
  | 'time'          // 時間
  | 'url'           // 網址
  | 'week';         // 周

/**
 * Read only: 只讀但可選取和複製
 * Disabled: 完全無法與元件互動
 */
export interface TextInputProps extends UnsafeStyleProps {
  value: string | number;             // 當前值
  placeholder?: string;               // 輸入提示文字 | Placeholder
  prefix?: string;                    // 輸入前綴 | Prefix for input
  suffix?: string;                    // 輸入後綴 | Suffix for input
  type?: AllowedInputTypes;           // 輸入類型 | HTML input type
  label?: string;                     // 標籤 | Label above input
  variant?: TextInputVariant;         // 外觀變體 | UI variant
  notification?: InputNotification;   // 通知配置 | Notification config
  hasBottomSpacing?: boolean;         // 下方間距 | Add margin below
  isReadonly?: boolean;               // 只讀模式 | Readonly mode
  isCopyable?: boolean;               // 是否可點擊複製 | Copyable on click
  isDisabled?: boolean;               // 禁用狀態 | Disabled
  isAutoFocus?: boolean;              // 自動獲得焦點 | Autofocus
  forwardedInputRef?: any;            // input元素ref（外部傳入）
  slotBeforeInput?: SingleSlot;       // 插槽在輸入框之前 | Slot before input
  slotAfterInput?: SingleSlot;        // 插槽在輸入框之後 | Slot after input
  onChange?: ChangeEventHandler<HTMLInputElement>; // 變更事件
  onMouseEnter?: MouseEventHandler<HTMLDivElement>; // 滑鼠移入
  onMouseLeave?: MouseEventHandler<HTMLDivElement>; // 滑鼠移出
  onFocus?: FocusEventHandler<HTMLInputElement>;    // 獲得焦點
  onBlur?: FocusEventHandler<HTMLInputElement>;     // 失去焦點
  onEnter?: () => void;               // 按Enter鍵
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>; // 鍵盤事件
  onScrollbarCreated?: () => void;    // 創建捲軸事件
  onScrollbarRemoved?: () => void;    // 移除捲軸事件
  onRefChange?: (ref: RefObject<HTMLInputElement>) => void; // input Ref變更
  testId?: string;                    // 測試用識別符
  UNSAFE_textClassName?: string;      // 不安全：自訂文字欄位類名
  UNSAFE_textStyle?: React.CSSProperties; // 不安全：自訂文字欄位樣式
}

/**
 * TextInput 組件 | 單行文字輸入欄
 * 用於表單、搜尋、單行輸入情境。
 * 範例：
 * <TextInput
 *   label="Email"
 *   type="email"
 *   value={userEmail}
 *   placeholder="請輸入您的電郵..."
 *   isAutoFocus
 *   onChange={handleInput}
 * />
 */
export function TextInput({
  value, placeholder, prefix, suffix,
  type, notification, label, variant = TextInputVariant.Default,
  hasBottomSpacing, isReadonly, isCopyable, isDisabled, isAutoFocus,
  slotBeforeInput, slotAfterInput, forwardedInputRef,
  onChange, onMouseEnter, onMouseLeave, onFocus, onBlur, onEnter, onKeyDown,
  onScrollbarCreated, onScrollbarRemoved, onRefChange, testId,
  UNSAFE_textClassName, UNSAFE_textStyle, UNSAFE_className, UNSAFE_style
}: TextInputProps) {
  // inputRef  — 管理input的Ref | DOM引用
  const inputRef = useRef<HTMLInputElement>(null);
  const sizerRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  // sizer自動調整寬度 | sizer for auto width adjustment
  const { sizerContent, valueWidth } = useResizableInput({ value, placeholder, sizerRef });
  const [isFocused, setIsFocused] = useState(false); // 是否處於焦點
  const [hasScrollbar, setHasScrollbar] = useState(false); // 是否顯示橫向捲軸
  const [newNotification, updateNotification] = useNotificationFeedbackDisplay(notification); // 通知

  // 設定外部ref — 如有外部傳入Ref，指向inputRef
  useEffect(() => { onRefChange && onRefChange(inputRef); }, [inputRef.current, onRefChange]);
  useEffect(() => {
    if (!inputRef.current || !forwardedInputRef) return;
    forwardedInputRef.current = inputRef.current;
  }, [forwardedInputRef, inputRef]);
  const doAfterNextRender = useCallAfterNextRender();

  // 監控內容變更—如果input區域出現橫向捲軸，觸發狀態
  useEffect(() => {
    doAfterNextRender(() => {
      if (!inputWrapperRef.current) return;
      if (inputWrapperRef.current.scrollWidth > inputWrapperRef.current.clientWidth) {
        setHasScrollbar(true); // 顯示捲軸
      } else {
        setHasScrollbar(false); // 移除捲軸
      }
    });
  }, [value]);

  // 捲軸創建/移除事件觸發
  useEffect(() => {
    if (hasScrollbar) {
      onScrollbarCreated && onScrollbarCreated();
    } else {
      onScrollbarRemoved && onScrollbarRemoved();
    }
  }, [hasScrollbar]);

  // 只讀欄位提示（危險訊息）
  function notifyReadOnlyField() {
    updateNotification({
      type: FeedbackType.Danger,
      displayMode: InputNotificationDisplayMode.FadeQuick,
      message: '唯讀欄位' // Read only field
    });
  }
  // 複製成功提示
  function notifyOnCopySuccess() {
    updateNotification({
      type: FeedbackType.Success,
      displayMode: InputNotificationDisplayMode.FadeSlow,
      message: '已成功複製!' // Copied!
    });
  }
  // 複製失敗提示
  function notifyOnCopyError() {
    updateNotification({
      type: FeedbackType.Danger,
      displayMode: InputNotificationDisplayMode.FadeSlow,
      message: '複製失敗，請手動操作。' // Failed copying
    });
  }

  // 處理輸入值變更
  function handleChange(event) {
    if (isReadonly) {
      notifyReadOnlyField(); // 只讀提示
    } else {
      if (onChange) onChange(event); // 呼叫自訂變更事件
      updateNotification(null); // 清除通知
    }
  }
  // 獲得焦點 | Focus input field
  function focusInput() { if (!inputRef.current) return; inputRef.current.focus(); }

  // 滾輪事件（橫向捲動）
  function onScroll(event: React.WheelEvent<HTMLDivElement>) {
    if (inputWrapperRef.current) {
      inputWrapperRef.current.scrollLeft += event.deltaY + event.deltaX;
    }
  }

  // ---- 元件渲染 ----
  return (
    <div
      className={classNames(
        css['Root'],                        // 根樣式
        hasBottomSpacing && css['has-bottom-spacing'], // 下方間距
        css[variant],                       // 外觀
        suffix && css['has-suffix'],        // 有後綴
        UNSAFE_className                    // 自訂類名
      )}
      onMouseEnter={onMouseEnter}           // 滑鼠移入
      onMouseLeave={onMouseLeave}           // 滑鼠移出
      style={UNSAFE_style}                  // 自訂外層樣式
    >
      {/* 標籤區，展示label（如有） */}
      {label && <InputLabelSection label={label} />}
      <div
        className={classNames(
          css['InputArea'],                 // 輸入區域
          isReadonly && css['is-readonly'], // 只讀
          newNotification?.message && css['has-message'], // 顯示訊息
          isFocused && css['is-focused']    // 焦點狀態
        )}
        onClick={() => focusInput()}        // 點擊聚焦
      >
        {/* 若不是只讀，調整寬度 */}
        {!isReadonly && (
          <div className={classNames([css['Sizer']])} ref={sizerRef}>
            {sizerContent}
          </div>
        )}
        {/* 輸入框前置slot */}
        {slotBeforeInput && <div className={css['BeforeContainer']}>{slotBeforeInput}</div>}
        <div
          ref={inputWrapperRef}             // 輸入框外層Ref
          onWheel={onScroll}                // 滾動事件
          className={classNames([
            css['InputWrapper'],
            sizerRef.current && css['is-scrollable'],
            isCopyable && css['has-button-spacing']
          ])}
        >
          <div className={css['InputWrapperInner']}>
            {/* 前綴字元 */}
            {prefix && <span className={classNames([css['Prefix']])}>{prefix}</span>}
            {/* 主要input欄位 */}
            {!isReadonly && (
              <input
                className={classNames([
                  css['Input'], css['TextStyle'],
                  isReadonly && css['is-readonly'],
                  Boolean(suffix) && css['has-suffix'],
                  UNSAFE_textClassName
                ])}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={(e) => {
                  onKeyDown && onKeyDown(e);
                  if (e.key === 'Enter') { onEnter && onEnter(); e.stopPropagation(); }
                }}
                onFocus={(e) => { setIsFocused(true); onFocus && onFocus(e); }}
                onBlur={(e) => { setIsFocused(false); onBlur && onBlur(e); }}
                disabled={isDisabled}
                type={type}
                style={sizerRef.current
                  ? { maxWidth: valueWidth, flexBasis: valueWidth, ...UNSAFE_textStyle }
                  : UNSAFE_textStyle}
                ref={inputRef}
                data-test={testId}
                autoFocus={isAutoFocus}
              />
            )}
            {/* 只讀欄位（div展示） */}
            {isReadonly && (
              <div
                className={classNames([
                  css['Input'], css['TextStyle'], isReadonly && css['is-readonly'], css['is-div']
                ])}
                style={sizerRef.current ? { minWidth: valueWidth, flexBasis: valueWidth } : null}
                data-test={testId}
              >{value}</div>
            )}
            {/* 後綴字元 */}
            {suffix && <span className={classNames([css['Suffix']])}>{suffix}</span>}
          </div>
        </div>
        {/* 輸入框後置slot */}
        {slotAfterInput && <div className={css['AfterContainer']}>{slotAfterInput}</div>}
        {/* 複製按鈕 */}
        {isCopyable && (
          <div className={css['ButtonContainer']}>
            <IconButton
              icon={IconName.Copy}
              size={IconSize.Small}
              variant={IconButtonVariant.SemiTransparent}
              onClick={() => { platform.copyToClipboard(value.toString()).then(notifyOnCopySuccess).catch(notifyOnCopyError); }}
            />
          </div>
        )}
        {/* 訊息提示（如有） */}
        {newNotification?.message && (
          <Text className={css['NotificationMessage']} textType={newNotification.type}>
            {newNotification.message}
          </Text>
        )}
        {/* 插入複雜通知組件（如有） */}
        {newNotification && <NotificationFeedbackDisplay notification={newNotification} />}
      </div>
    </div>
  );
}
