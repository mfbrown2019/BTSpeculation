/* eslint-disable react/prop-types */
// TradingViewWidget.jsx
import { useEffect, useRef, memo } from 'react';

function Chart(props) {
    const container = useRef();

    useEffect(() => {
        // Remove existing script if any
        if (container.current) {
            container.current.innerHTML = '';
        }

        // Create and append the new script
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${props.tick}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        container.current.appendChild(script);

        // Cleanup the effect
        return () => {
            if (container.current) {
                container.current.innerHTML = ''; // Clean container before unmounting
            }
        };
    }, [props.tick]); // Re-run when tick or height changes

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
        </div>
    );
}

export default memo(Chart);
