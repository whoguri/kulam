"use client";

import React, { useEffect, useRef, useState } from "react";

const ImageReveal = () => {
  const cycleSpeed = 500
  const pixersPerCycle = 10
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [revealedPixers, setRevealedPixers] = useState([]);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 600,
    height: 600,
  });
  const imageUrl = "./images/test.jpg";

  const canvasWidth = 600;
  const canvasHeight = 600;
  const pixerSize = 10; // Size of each pixer

  // Calculate scaled dimensions and drawing parameters
  const calculateScaledDimensions = (imgWidth, imgHeight) => {
    const aspectRatio = imgWidth / imgHeight;
    let scaledWidth,
      scaledHeight,
      offsetX = 0,
      offsetY = 0;

    if (aspectRatio > 1) {
      scaledWidth = canvasWidth;
      scaledHeight = canvasWidth / aspectRatio;
      offsetY = (canvasHeight - scaledHeight) / 2;
    } else {
      scaledHeight = canvasHeight;
      scaledWidth = canvasHeight * aspectRatio;
      offsetX = (canvasWidth - scaledWidth) / 2;
    }

    return { scaledWidth, scaledHeight, offsetX, offsetY };
  };

  // Generate random pixers
  const generatePixers = (
    count,
    scaledWidth,
    scaledHeight,
    offsetX,
    offsetY
  ) => {
    const pixers = [];
    for (let i = 0; i < count; i++) {
      const x =
        Math.floor(Math.random() * (scaledWidth / pixerSize)) * pixerSize +
        offsetX;
      const y =
        Math.floor(Math.random() * (scaledHeight / pixerSize)) * pixerSize +
        offsetY;
      pixers.push({ x, y });
    }
    return pixers;
  };

  // Reveal pixers on the canvas with white borders
  const revealPixers = (
    context,
    img,
    pixers,
    imgWidth,
    imgHeight,
    scaledWidth,
    scaledHeight,
    offsetX,
    offsetY
  ) => {
    pixers.forEach(({ x, y }) => {
      const sourceX = ((x - offsetX) / scaledWidth) * imgWidth;
      const sourceY = ((y - offsetY) / scaledHeight) * imgHeight;
      const sourceWidth = (pixerSize / scaledWidth) * imgWidth;
      const sourceHeight = (pixerSize / scaledHeight) * imgHeight;

      // Draw the image portion
      context.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        pixerSize,
        pixerSize
      );

      // Draw the white border
      context.strokeStyle = "rgba(255, 255, 255, 0.5)";
      context.lineWidth = 1;
      context.strokeRect(x, y, pixerSize, pixerSize);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = imageUrl;
    imageRef.current = img;

    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
      const { scaledWidth, scaledHeight, offsetX, offsetY } =
        calculateScaledDimensions(img.width, img.height);

      // Initial fill with black
      context.fillStyle = "black";
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      const totalPixers = Math.floor(
        (scaledWidth / pixerSize) * (scaledHeight / pixerSize)
      );

      // Start revealing pixers at intervals
      const interval = setInterval(() => {
        if (isFullyRevealed) {
          clearInterval(interval);
          return;
        }

        // Generate new pixers
        const newPixers = generatePixers(
          pixersPerCycle,
          scaledWidth,
          scaledHeight,
          offsetX,
          offsetY
        ).filter(
          (pixer) =>
            !revealedPixers.some(
              (revealed) => revealed.x === pixer.x && revealed.y === pixer.y
            )
        );

        // Update the state with accumulated pixers
        setRevealedPixers((prev) => {
          const updatedPixers = [...prev, ...newPixers];
          revealPixers(
            context,
            img,
            newPixers,
            img.width,
            img.height,
            scaledWidth,
            scaledHeight,
            offsetX,
            offsetY
          );

          if (updatedPixers.length >= totalPixers) {
            setIsFullyRevealed(true);
          }

          return updatedPixers;
        });
      }, cycleSpeed);

      // Clean up interval on component unmount
      return () => clearInterval(interval);
    };

    img.onerror = (error) => {
      console.error("Failed to load the image:", error);
    };
  }, [imageUrl, cycleSpeed, pixersPerCycle]);

  // Redraw all revealed pixers when the component updates
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = imageRef.current;

    if (img && img.complete && imageDimensions.width > 0) {
      const { scaledWidth, scaledHeight, offsetX, offsetY } =
        calculateScaledDimensions(
          imageDimensions.width,
          imageDimensions.height
        );

      // Clear the canvas
      context.fillStyle = "black";
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      // Redraw all revealed pixers
      revealPixers(
        context,
        img,
        revealedPixers,
        imageDimensions.width,
        imageDimensions.height,
        scaledWidth,
        scaledHeight,
        offsetX,
        offsetY
      );
    }
  }, [revealedPixers, imageDimensions]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
      {isFullyRevealed && <p>Image fully revealed!</p>}
    </div>
  );
};

export default ImageReveal;
