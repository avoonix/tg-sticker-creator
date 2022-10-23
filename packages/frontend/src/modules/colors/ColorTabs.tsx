import { Item, TabList, TabPanels, Tabs } from "@adobe/react-spectrum";
import { FC, ReactNode } from "react";

interface Props {
  first: ReactNode;
  second: ReactNode;
  third: ReactNode;
}

const ColorTabs: FC<Props> = ({ first, second, third }) => {
  return (
    <Tabs aria-label="Tab example" maxWidth={500}>
      <TabList>
        <Item key="val1">Wheel</Item>
        <Item key="val2">Sliders</Item>
        <Item key="val3">HEX</Item>
      </TabList>
      <TabPanels>
        <Item key="val1">{first}</Item>
        <Item key="val2">{second}</Item>
        <Item key="val3">{third}</Item>
      </TabPanels>
    </Tabs>
  );
};

export default ColorTabs;
