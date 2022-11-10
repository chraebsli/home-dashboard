import React from "react";
import "@styles/global.sass";

// eslint-disable-next-line react/prop-types
export default function Application({Component, pageProps}){
	return <Component {...pageProps} />;
}
