import React from "react";
import { useState, useEffect } from "react";

function Main() {
    const [color, setColor] = useState("");
    const [convertedColor, setConvertedColor] = useState("");

    useEffect(() => {
        if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
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
            const rgbColor = color.split("(")[1].split(")")[0].split(",");
            // const rgbColor = color.split(",");
            const b = rgbColor.map(function (x) {
                x = parseInt(x).toString(16);
                return x.length === 1 ? "0" + x : x;
            });
            setConvertedColor(`#${b[0]}${b[1]}${b[2]}`);
            // setConvertedColor(
            //     "#" +
            //         (
            //             (1 << 24) +
            //             (rgbColor[0] << 16) +
            //             (rgbColor[1] << 8) +
            //             rgbColor[2]
            //         )
            //             .toString(16)
            //             .slice(1)
            // );
        } else {
            setConvertedColor("");
        }
    }, [color]);

    return (
        <main className="_container">
            <div className="converter__container">
                <div
                    style={{ backgroundColor: color }}
                    className="circle"
                ></div>
                <div className="converter_body">
                    <h1>
                        Automatic RGB/Hex <br /> color converter
                    </h1>
                    <h2>Enter the color:</h2>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <h2>Converted value:</h2>
                    <div className="converted-color_body">
                        <div className="converted-value">
                            <span>{convertedColor}</span>
                        </div>
                        <button
                            className="copyToClipboard"
                            disabled={!convertedColor.length}
                            onClick={() => {
                                navigator.clipboard.writeText(convertedColor);
                            }}
                        >
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main;
