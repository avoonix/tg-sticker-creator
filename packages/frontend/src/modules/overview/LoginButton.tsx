import { FC, useEffect, useRef } from "react";
import { useUpdateAuthData } from "../export/auth";

const LoginButton: FC = (props) => {
  const ref = useRef<HTMLDivElement>();
  const { updateAuthData } = useUpdateAuthData();

  useEffect(() => {
    if (!ref.current) return;
    (window as any).onTelegramAuth = (user: any) =>
      updateAuthData(JSON.stringify(user));

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?21";
    script.setAttribute("data-telegram-login", "AvooStickerStashBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.async = true;
    ref.current.appendChild(script);
  }, [ref.current]);

  return <div ref={ref as any}></div>;
};

export default LoginButton;
