import React from 'react';
import { Portal } from 'react-portal';
import classNames from 'classnames';
import { Icon } from 'components';
import classes from './Modal.module.scss';

const Modal = ({ isOpen, header, icon, children, onClose, className, hideClose, closeBtnText = 'Close', message }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={classes.modalBackdrop}>
        <div className={classNames(classes.modalWrapper, classes[className])}>
          <div className={classNames(classes.modalHeader, { [classes.withBoth]: header && icon })}>
            {icon && <Icon icon={icon} />}
            {header && <h3>{header}</h3>}
          </div>
          <div className={classes.modalBody}>
            {message ? (
              <div className={classes.modalText}>
                <h3>{message}</h3>
              </div>
            ) : (
              children
            )}
          </div>
          {!hideClose && (
            <div className={classes.modalFooter}>
              <button onClick={onClose}>{closeBtnText}</button>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
