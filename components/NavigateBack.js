import Link from "next/link";
import { StyledLink } from "../styles/globalStyles";

export const NavigateBack = ({backToUrl, backToPage}) => {
  return (
    <StyledLink>
      <Link href={backToUrl}>
        <a>{`Back to ${backToPage}`}</a>
      </Link>
    </StyledLink>
  );
};
