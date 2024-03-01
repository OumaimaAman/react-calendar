import React from 'react';

interface IconArrowsProps {
  height?: number;
  width?: number;
  color?: string;
  direction: string;
}

const IconArrows = ({ color, height, width, direction }: IconArrowsProps): React.ReactElement => {
  return (
    <>
      {direction === 'up' && (
        <svg xmlns="http://www.w3.org/2000/svg" width={width ?? 50} height={height ?? 50} viewBox="0 0 50 50">
          <path
            fill={color ?? 'black'}
            fillRule="evenodd"
            d="M25.017 21.667c.23 0 .446.09.607.252l5.82 5.763c.34.333.34.878 0 1.212-.33.333-.88.34-1.223 0l-5.204-5.155-5.204 5.155c-.34.336-.888.336-1.227 0-.337-.334-.337-.88 0-1.212l5.814-5.763c.164-.161.388-.252.617-.252z"
          />
        </svg>
      )}

      {direction === 'right' && (
        <svg xmlns="http://www.w3.org/2000/svg" width={width ?? 48} height={height ?? 48} viewBox="0 0 48 48">
          <path
            fill={color ?? 'black'}
            fillRule="evenodd"
            d="M27.606 24.39c0 .222-.087.429-.242.583l-5.532 5.588c-.32.327-.844.327-1.164 0-.32-.317-.326-.845 0-1.174l4.949-4.996-4.949-4.997c-.323-.326-.323-.851 0-1.177.32-.323.844-.323 1.164 0l5.532 5.581c.155.158.242.373.242.593z"
          />
        </svg>
      )}

      {direction === 'down' && (
        <svg xmlns="http://www.w3.org/2000/svg" width={width ?? 50} height={height ?? 50} viewBox="0 0 50 50">
          <path
            fill={color ?? 'black'}
            fillRule="evenodd"
            d="M25.016 29.146c-.23 0-.446-.09-.607-.252l-5.82-5.763c-.34-.333-.34-.879 0-1.212.33-.333.88-.34 1.223 0l5.204 5.155 5.204-5.155c.34-.336.888-.336 1.227 0 .337.333.337.879 0 1.212l-5.814 5.763c-.164.161-.388.252-.617.252z"
          />
        </svg>
      )}

      {direction === 'left' && (
        <svg xmlns="http://www.w3.org/2000/svg" width={width ?? 48} height={height ?? 48} viewBox="0 0 48 48">
          <path
            fill={color ?? 'black'}
            fillRule="evenodd"
            d="M20.426 24.39c0-.221.087-.428.242-.583l5.532-5.588c.32-.326.844-.326 1.164 0 .32.317.326.845 0 1.175l-4.95 4.996 4.95 4.996c.323.326.323.852 0 1.178-.32.323-.844.323-1.164 0l-5.532-5.582c-.155-.158-.242-.373-.242-.592z"
          />
        </svg>
      )}
    </>
  );
};

export default IconArrows;
