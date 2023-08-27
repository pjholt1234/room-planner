import { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import PaintBrushIcon from './icons/PaintBrushIcon';
import FillIcon from './icons/FillIcon';
import ColourPickerBox from './ColourPickerBox';

const ColourPicker = () => {
    const [colourPickerOpen, setColourPickerOpen] = useState<boolean>(false);
    const [colourPickerBackground, setColourPickerBackground] = useState({
        background: '#fff'
    });
    const [strokeColour, setStrokeColour] = useState<string>('#000000');
    const [fillColour, setFillColour] = useState<string>('#FFFFFF');
    const [selectedColourBox, setSelectedColourBox] = useState<string>('fill');
    const [pickerPosition, setPickerPosition] = useState({
        top: 0,
        left: 0,
        width: 0
    });

    const colorPickerRef = useRef<HTMLDivElement | null>(null);

    const handleColorPickerBoxClick = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        const colorPickerBox = event.currentTarget;
        const boxRect = colorPickerBox.getBoundingClientRect();
        const boxCenterX = boxRect.left + boxRect.width / 2;
        setPickerPosition({
            top: boxRect.bottom + 10,
            left: boxCenterX - pickerPosition.width / 2 - 100,
            width: boxRect.width
        });
        setColourPickerOpen(true);
        setSelectedColourBox(colorPickerBox.id);
    };

    const handleSetBackgroundColour = (colour: string) => {
        setColourPickerBackground({ background: colour });
        if (selectedColourBox === 'stroke') {
            setStrokeColour(colour);

            const updateStrokeColourEvent = new CustomEvent(
                'stroke-colour-changed',
                {
                    detail: colour
                }
            );

            document.dispatchEvent(updateStrokeColourEvent);
            return;
        }

        setFillColour(colour);

        const updateFillColourEvent = new CustomEvent('fill-colour-changed', {
            detail: colour
        });

        document.dispatchEvent(updateFillColourEvent);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                colorPickerRef.current &&
                !colorPickerRef.current.contains(event.target as Node)
            ) {
                setColourPickerOpen(false);
                setSelectedColourBox('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderColourPicker = () => {
        if (!colourPickerOpen) {
            return null;
        }

        return (
            <div
                ref={colorPickerRef}
                className="color-picker-container"
                style={{
                    top: pickerPosition.top,
                    left: pickerPosition.left,
                    width: pickerPosition.width
                }}
            >
                <SketchPicker
                    color={colourPickerBackground.background}
                    onChangeComplete={(color) =>
                        handleSetBackgroundColour(color.hex)
                    }
                />
            </div>
        );
    };

    return (
        <div className="toolbar-row">
            <div className="colour-picker-box-container">
                <ColourPickerBox
                    id="stroke"
                    icon={<PaintBrushIcon />}
                    onClick={handleColorPickerBoxClick}
                    backgroundColour={strokeColour}
                />
                <ColourPickerBox
                    id="fill"
                    icon={<FillIcon />}
                    onClick={handleColorPickerBoxClick}
                    backgroundColour={fillColour}
                />
            </div>
            {renderColourPicker()}
        </div>
    );
};

export default ColourPicker;
