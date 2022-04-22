import React, { FC } from "react";

type props = {
  hasButton: boolean;
};

export const DeleteEditButton: FC<props> = (props) => {
  const { hasButton } = props;

  return (
    <>
      {(() => {
        if (hasButton) {
          return (
            <>
              <button type="button">
                <span>削除</span>
              </button>
              <button type="button">
                <span>編集</span>
              </button>
            </>
          );
        }
      })()}
    </>
  );
};
