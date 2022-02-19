import React from "react";
import { useState, useEffect } from "react";

function Main() {
    const [color, setColor] = useState("");
    const [convertedColor, setConvertedColor] = useState("");

    useEffect(() => {
        if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
            console.log("hex");
            const normal = color.match(
                /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i
            );
            if (normal)
                setConvertedColor(`
                    rgb(${normal
                        .slice(1)
                        .map((e) => parseInt(e, 16))
                        .join(", ")})`);

            const shorthand = color.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
            if (shorthand)
                setConvertedColor(
                    `
                    rgb(${shorthand
                        .slice(1)
                        .map((e) => 0x11 * parseInt(e, 16))
                        .join(", ")})`
                );

            return null;
        } else if (
            /^(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/i.test(
                color
            )
        ) {
            console.log("rgb");
            const rgbColor = color.split(",");
            console.log(rgbColor);
            setConvertedColor(
                "#" +
                    (
                        (1 << 24) +
                        (rgbColor[0] << 16) +
                        (rgbColor[1] << 8) +
                        rgbColor[2]
                    )
                        .toString(16)
                        .slice(1)
            );
        }
    }, [color]);

    return (
        <main className="_container">
            <div className="converter__container">
                <div style={{ backgoundColor: color }} className="circle"></div>
                <div className="converter_body">
                    <h1>
                        Automatic RGB/Hex <br /> color converter
                    </h1>
                    <p>Enter the color:</p>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <p>{convertedColor}</p>
                </div>
            </div>
        </main>
    );
}

export default Main;
