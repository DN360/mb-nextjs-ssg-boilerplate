import React, {createContext, useContext, useEffect, useReducer, useRef, useState} from 'react';
import {cls, isEmpty} from 'utils';
import classes from '../styles/InputComponents.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

export type InputValues = {
  [name: string]: string | number
}

export type InputAction = {
  type: 'SET_VALUE',
  id: string,
  payload: string
} | {
  type: 'SUBMIT',
  func: (values: InputValues, varidation: boolean) => void
}

export const InputContext = createContext<React.Dispatch<InputAction>>(null);

export const InputContainer: React.FC<{onChange?: (values: InputValues) => void, required?: {[id: string]: boolean}}> = ({onChange, children, required}) => {
  const [state, dispatch] = useReducer((state: InputValues, action: InputAction) => {
    switch (action.type) {
      case 'SET_VALUE':
        return ({
          ...state, [action.id]: action.payload,
        });
      case 'SUBMIT':
        if (isEmpty(required)) {
          action.func(state, true);
        } else {
          const requiredKeys = Object.keys(required);
          const varidation = requiredKeys.every((key) => {
            // 入力にnullやundefinedが入っていると困るので
            if ((isEmpty(state[key]) || isEmpty(state[key], {str: true})) && required[key]) {
              return false;
            } else {
              return true;
            }
          });
          action.func(state, varidation);
        }
        return state;
    }
  }, {});

  useEffect(() => {
    if (!isEmpty(onChange)) {
      onChange(state);
    }
  }, [state]);

  return (
    <InputContext.Provider value={dispatch}>
      {children}
    </InputContext.Provider>
  );
};

export const InputBox: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {label: string | JSX.Element, secure?: boolean, id: string, defaultValue?: string, className?: string}> = (props) => {
  const {label, secure, id, defaultValue, className} = props;
  const rawProps = {
    ...props,
    label: undefined,
    secure: undefined,
    id: undefined,
    defaultValue: undefined,
    className: undefined,
  };
  const dispatch = useContext(InputContext);
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);
  return (
    <div className={cls(classes.inputBox, className)}>
      <label htmlFor={id}>{label}</label>
      <input type={secure ? 'password' : 'text'} value={value} onChange={(e) => {
        const value = String(e.target.value);
        setValue(value);
        dispatch({
          type: 'SET_VALUE',
          id,
          payload: value,
        });
      }} {...rawProps}/>
    </div>
  );
};

export const InputArea: React.FC<{label: string | JSX.Element, rows?: number, id: string, defaultValue?: string, className?: string}> = ({label, rows, id, defaultValue, className}) => {
  const dispatch = useContext(InputContext);
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);
  return (
    <div className={cls(classes.inputArea, className)}>
      <label htmlFor={id}>{label}</label>
      <textarea rows={rows || 4} value={value} onChange={(e) => {
        const value = String(e.target.value);
        setValue(value);
        dispatch({
          type: 'SET_VALUE',
          id,
          payload: value,
        });
      }}/>
    </div>
  );
};


export const SelectBox: React.FC<{label: string | JSX.Element, items: string[], defaultValue?: string, className?: string, id: string}> = ({label, items, defaultValue, className, id}) => {
  const dispatch = useContext(InputContext);
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);
  return (
    <div className={cls(classes.selectBox, className)}>
      {label}
      <div className={classes.radioGroup}>
        {
          items.map((item, index) => (
            <React.Fragment key={item}>
              <input type="radio" className={cls(classes.select, className)} value={item} id={`${id}-${index}`} onChange={(e) => {
                const value = String(e.target.value);
                setValue(value);
                dispatch({
                  type: 'SET_VALUE',
                  id,
                  payload: value,
                });
              }} checked={item === value}/><label htmlFor={`${id}-${index}`}>{item}</label>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  );
};

export const SubmitButton: React.FC<{className?: string, onClick: (values: InputValues, varidation: boolean) => void}> = ({onClick, className, children}) => {
  const dispatch = useContext(InputContext);
  return (
    <button className={cls(classes.submitButton, className)} onClick={() => {
      dispatch({
        type: 'SUBMIT',
        func: onClick,
      });
    }}>
      {children}
    </button>
  );
};

export const ComboBox: React.FC<{label?: string, items: string[], children?: never, defaultValue?: string, id: string, className?: string}> = (props) => {
  const {label, items, defaultValue, id, className, children} = props;
  const [open, setOpen] = useState(false);
  const listBoxRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef<HTMLDivElement>(null);
  const dispatch = useContext(InputContext);
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);
  const _items = items || children;

  return (
    <>
      <div className={cls(classes.comboBox, className)} ref={comboRef}>
        {label || ''}
        <div className={classes.shownComboBox} onClick={(e) => {
          if (listBoxRef.current === null || comboRef.current === null) {
            return;
          }
          if (open) {
            const target = e.target as HTMLDivElement;
            const nextValue = target.dataset?.value;
            if (nextValue !== undefined) {
              setValue(nextValue);
              dispatch({
                type: 'SET_VALUE',
                id,
                payload: nextValue,
              });
            }
          }
          const listBoxStyle = getComputedStyle(listBoxRef.current, null);
          const height = Array.from(listBoxRef.current.children).map((x) => {
            const style = getComputedStyle(x, null);
            return x.clientHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
          }).reduce((a, b) => a + b) + (Number(listBoxStyle.borderWidth.replace(/[^\d]/g, '')) * 2);
          const borderHeight = (Number(listBoxStyle.borderWidth.replace(/[^\d]/g, '')) * 2);
          const pageHeight = document.body.clientHeight;
          const upMode = pageHeight <= height + comboRef.current.offsetHeight + comboRef.current.offsetTop;
          if (!open) {
            if (upMode) {
              listBoxRef.current.style.top = -height-borderHeight + 'px';
            } else {
              listBoxRef.current.style.top = (comboRef.current.offsetHeight - borderHeight) + 'px';
            }
            listBoxRef.current.style.height = height + 'px';
            listBoxRef.current.style.opacity = '1';
          } else {
            if (upMode) {
              listBoxRef.current.style.top = 0 + 'px';
            } else {
              listBoxRef.current.style.top = (comboRef.current.offsetHeight - borderHeight) + 'px';
            }
            listBoxRef.current.style.height = '0';
            listBoxRef.current.style.opacity = '0';
          }
          setOpen((c) => !c);
        }}>
          <span>{value}</span>
          <FontAwesomeIcon icon={faChevronDown} className={classes.icon}/>
          <div className={classes.shownListBox} ref={listBoxRef}>
            {
              _items.map((item, index) => (
                <div className={classes.showListItem} key={`item-${index}`} id="combo-list-item" data-value={item}>
                  {item}
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <select id={id} onChange={(e) => {
        const val = String(e.target.value);
        setValue(val);
        dispatch({
          type: 'SET_VALUE',
          id,
          payload: val,
        });
      }} value={value} className={classes.select}>
        {_items.map((item, index) => (
          <option value={item} key={`item-${index}`} id={`item`}>{item}</option>
        ))}
      </select>
    </>
  );
};
