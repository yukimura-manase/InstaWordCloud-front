/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

export const Loading = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={styles.circl}
    >
      <path
        opacity="0.2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="currentColor"
      />
      <path
        d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
        fill="currentColor"
      />
    </svg>
  );
};

// MDN: CSS @keyframes
// https://developer.mozilla.org/ja/docs/Web/CSS/@keyframes

// MDN: CSS transform
// https://developer.mozilla.org/ja/docs/Web/CSS/transform

const animations = {
  rotateText: keyframes`
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
`,
};

const styles = {
  circl: css({
    animation: `1s linear infinite ${animations.rotateText}`,
  }),
};
