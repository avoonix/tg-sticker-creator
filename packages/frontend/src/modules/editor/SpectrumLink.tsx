import Link from "next/link";
import { AnchorHTMLAttributes, FC, PropsWithChildren } from "react";

interface Props
  extends PropsWithChildren,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Link that is compatible with spectrum buttons
 */
const SpectrumLink: FC<Props> = ({ href, children, ...rest }) => {
  return (
    <Link href={href}>
      <a href={href} {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default SpectrumLink;
