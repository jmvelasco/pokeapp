import styled from "styled-components";
import Link from "next/link";

export const List = ({ items }) => (
  <>
    <ListWraper>
      {items &&
        items.map((item, index) => (
          <ListItem key={item.name}>
            <Link href={`/${item.name}`}>
              <a>{item.name.toTitle()}</a>
            </Link>
          </ListItem>
        ))}
    </ListWraper>
  </>
);

const ListWraper = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const ListItem = styled.span`
  list-style: none;
  border: 1px solid #e4e4e4;
  padding: 0.5rem;
  background-color: lightblue;

  &:hover {
    background-color: darkblue;
    color: #e4e4e4;
  }
`;
