import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

import "./loading.css";

export const Loading = () => {
  return (
    <div className="test">
      <DotLottieReact
        background="transparent"
        src="https://lottie.host/e6eb249d-d39a-42e4-b5a0-052614c581d1/6sWsRmaEl1.json"
        autoplay
        loop
      />
    </div>
  );
};
