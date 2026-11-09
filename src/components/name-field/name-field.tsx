'use client';

import { useState, type KeyboardEvent } from 'react';
import { t } from '@/content';
import { NAME_MAX_LENGTH, useGreeting } from '@/engine/greeting';
import styles from './name-field.module.css';

export const NAME_FIELD_ID = 'first-name';

/** `{{ first name }}` with a blinking line; no box. Enter or leaving the field commits the name. */
export function NameField() {
  const copy = t().hello;
  const { draft, setDraft, commit } = useGreeting();
  const [focused, setFocused] = useState(false);
  const length = draft.length;
  const showFakeCaret = !focused && length === 0;

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commit();
  };

  return (
    <label
      htmlFor={NAME_FIELD_ID}
      className={styles.field}
      data-cursor="link"
      data-active={focused || length > 0}
    >
      <span className={styles.brace} aria-hidden="true">
        {'{{'}
      </span>
      <span className={styles.wrap}>
        <input
          id={NAME_FIELD_ID}
          className={styles.input}
          type="text"
          maxLength={NAME_MAX_LENGTH}
          autoComplete="off"
          spellCheck={false}
          aria-label={copy.fieldLabel}
          value={draft}
          style={{ width: `${length ? length + 0.6 : focused ? 1.2 : 11.5}ch` }}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            commit();
          }}
          onKeyDown={onKeyDown}
        />
        {showFakeCaret && (
          <span className={styles.placeholder} aria-hidden="true">
            <i className={styles.caret} />
            {copy.fieldPlaceholder}
          </span>
        )}
      </span>
      <span className={styles.brace} aria-hidden="true">
        {'}}'}
      </span>
    </label>
  );
}

export default NameField;
