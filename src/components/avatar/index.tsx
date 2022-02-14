import { FunctionComponent } from 'react';

import Proptypes from 'prop-types';
import classnames from 'classnames';

import { Badge } from 'reactstrap';
import { IAvatarProps } from './IAvatarProps';
const defaultProps: IAvatarProps = {
  tag: 'div',
  className: '',
  imgClassName: '',
};
const Avatar: FunctionComponent<IAvatarProps> = (props = defaultProps) => {
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content,
    tag: Tag,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props;

  const getInitials = (str: string) => {
    const results: string[] = [];
    const wordArray = str.split(' ');
    wordArray.forEach((e) => {
      results.push(e[0]);
    });
    return results.join('');
  };

  return (
    <div
      className={classnames('avatar', {
        [className]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
    >
      {img === false || img === undefined ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp,
          })}
          style={contentStyles}
        >
          {content != null ? getInitials(content) : content}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge color={badgeColor ? badgeColor : 'primary'} className="badge-sm badge-up" pill>
              {badgeText ? badgeText : '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames({
            [imgClassName]: imgClassName,
          })}
          src={img}
          alt="avatarImg"
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        ></span>
      ) : null}
    </div>
  );
};

export default Avatar;
