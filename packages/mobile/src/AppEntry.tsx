import React from "react";
import { registerRootComponent } from "expo";
import AppTest from "./AppTest";
import Providers from "./Providers";

const Entry: React.FC = () => (
    <Providers>
        <AppTest />
    </Providers>
);

registerRootComponent(Entry);

export default Entry;
