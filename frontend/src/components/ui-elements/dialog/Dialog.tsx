/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

/** Dialog Component */
const DialogCustom = () => {
  /** Dialog の開閉・制御 Flag */
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div css={EmotionStyle.dialogPositionStyle}>
      {/* Dialog Open Btn */}
      <div>
        <button onClick={() => setIsOpen(true)}>Open</button>
      </div>

      {/* Dialog 本体 */}
      {isOpen && (
        <div css={EmotionStyle.dialogWrapperStyle}>
          <div css={EmotionStyle.dialogInnerStyle}>
            <h3>Dialog</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{ width: "60px", height: "30px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Dialogの外側(Outer)領域: 外側ClickでもDialogを閉じる */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          css={EmotionStyle.dialogOuterStyle}
        ></div>
      )}
    </div>
  );
};

/** EmotionStyle */
const EmotionStyle = {
  /** Dialogの配置・Position */
  dialogPositionStyle: css`
    position: relative;
  `,
  /**
   * Dialog の DefaultStyle
   * - Dialogの配置・Position: 画面中央に配置
   */
  dialogWrapperStyle: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* x軸, y軸 */
    z-index: 100;
  `,
  /** Dialogの Inner Div の Style */
  dialogInnerStyle: css`
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  `,
  /**
   * Dialogの Outer Style
   * - Dialogの外側(Outer)領域: 画面全体を覆うように設定
   * - Dialogの外側(Outer)領域: 背景色を設定
   * - Dialogの外側(Outer)領域: z-indexを設定(Dialogの背面に配置)
   */
  dialogOuterStyle: css`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    height: 100vh;
    width: 100vw;
    background-color: rgba(64, 70, 84, 0.101961);
  `,
};

export default DialogCustom;
