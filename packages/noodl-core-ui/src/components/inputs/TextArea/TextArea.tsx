// TextArea 元件 — 繁體中文註解
// -----------------------------------------------------
// 多行文字輸入元件，可用於留言、描述、長文本表單等
import classNames from 'classnames'; // 合併CSS class名稱
import React, { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react'; // React型別
import { InputNotification } from '@noodl-types/globalInputTypes'; // 訊息通知型別
import { Text } from '@noodl-core-ui/components//typography/Text'; // 文字顯示組件
import { InputLabelSection } from '@noodl-core-ui/components/inputs/InputLabelSection'; // 標籤顯示
import { NotificationFeedbackDisplay } from '@noodl-core-ui/components/inputs/NotificationFeedbackDisplay'; // 訊息顯示
import { useNotificationFeedbackDisplay } from '@noodl-core-ui/components/inputs/NotificationFeedbackDisplay/NotificationFeedbackDisplay.hooks'; // 訊息hook
import { UnsafeStyleProps } from '@noodl-core-ui/types/global'; // 不安全自訂屬性
import css from './TextArea.module.scss'; // 樣式表

/**
 * TextAreaProps 介面 — 屬性＆用途說明
 * value: 輸入內容（多行文字）
 * placeholder: 提示文字
 * label: 標題、欄名
 * minLength/maxLength: 長度限制
 * notification: 顯示警告/訊息
 * isDisabled: 禁用
 * hasBottomSpacing: 是否有下方間距
 * isResizeDisabled: 禁止用戶拖動更改高度
 * isAutoFocus: 輸入自動聚焦
 * onChange: 內容變更事件
 * onMouseEnter/onMouseLeave: 滑鼠移入/移出
 * onFocus/onBlur: 聚焦/失焦事件
 * onEnter: Shift+Enter時觸發
 * 可自訂樣式與類名
 */
export interface TextAreaProps extends UnsafeStyleProps {
  value?: string;                          // 當前輸入內容（受控）
  placeholder?: string;                    // 空欄提示
  label?: string;                          // 標籤
  minLength?: number;                      // 最小長度
  maxLength?: number;                      // 最大長度
  notification?: InputNotification;        // 警告訊息/提示
  isDisabled?: boolean;                    // 禁用狀態
  hasBottomSpacing?: boolean;              // 下方間距
  isResizeDisabled?: boolean;              // 禁止resize拖動高度
  isAutoFocus?: boolean;                   // 輸入自動focus
  onChange?: ChangeEventHandler<HTMLTextAreaElement>; // 文字內容改變事件
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;   // 滑鼠移入
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;   // 滑鼠移出
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;   // 聚焦
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;    // 失焦
  /** Shift+Enter 時用戶互動，例如換行、提交等 */
  onEnter?: () => void;
}

/**
 * TextArea 組件 — 多行文字輸入欄位
 * e.g.
 * <TextArea
 *   label="備註"
 *   placeholder="請輸入說明..."
 *   value={note}
 *   onChange={e => setNote(e.target.value)}
 *   maxLength={200}
 * />
 */
export function TextArea({
  value,
  placeholder,
  label,
  minLength,
  maxLength,
  notification,
  isDisabled,
  hasBottomSpacing,
  isResizeDisabled,
  isAutoFocus,
  onChange,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onEnter,
  UNSAFE_className,
  UNSAFE_style
}: TextAreaProps) {
  const [newNotification, _updateNotification] = useNotificationFeedbackDisplay(notification);
  const isEmpty = !(typeof value === 'string' && value.length > 0);
  return (
    <div className={classNames(css['Root'], hasBottomSpacing && css['has-bottom-spacing'])}>
      {/* 標籤顯示區（如有label） */}
      {label && <InputLabelSection label={label} />}
      <div
        className={classNames(
          css['InputArea'],
          isDisabled && css['is-disabled'],
          newNotification?.message && css['has-message']
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <textarea
          className={classNames(
            css['Input'],
            isResizeDisabled && css['is-resize-disabled'],
            onChange && isEmpty && css['is-empty'],
            UNSAFE_className
          )}
          style={UNSAFE_style}
          minLength={minLength}
          maxLength={maxLength}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={(ev) => {
            if (onEnter && ev.shiftKey && ev.key === 'Enter') {
              onEnter();
              ev.preventDefault();
            }
          }}
          value={value}
          autoFocus={isAutoFocus}
        />
        {/* 即時動態訊息(如有) */}
        {newNotification && <NotificationFeedbackDisplay notification={newNotification} />}
      </div>
      {/* 輸入框下方提示訊息(如有) */}
      {newNotification?.message && (
        <Text className={css['NotificationMessage']} textType={newNotification.type}>
          {newNotification.message}
        </Text>
      )}
    </div>
  );
}
