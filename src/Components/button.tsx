"use client";
import '../app/global.css';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Button: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const router = useRouter();

    const handleStart = () => {
        setIsVideoPlaying(true); // Показать видео
    };

    useEffect(() => {
        // Этот эффект сработает, когда `isVideoPlaying` станет true и видео добавится в DOM
        if (isVideoPlaying && videoRef.current) {
            const video = videoRef.current;

            const playVideo = async () => {
                try {
                    await video.play();
                    console.log("Video started playing");

                    // Переход в полноэкранный режим
                    if (video.requestFullscreen) {
                        await video.requestFullscreen();
                    } else if ((video as any).webkitRequestFullscreen) {
                        await (video as any).webkitRequestFullscreen();
                    } else if ((video as any).mozRequestFullScreen) {
                        await (video as any).mozRequestFullScreen();
                    } else if ((video as any).msRequestFullscreen) {
                        await (video as any).msRequestFullscreen();
                    } else {
                        console.warn("Fullscreen API is not supported.");
                    }
                } catch (error) {
                    console.error("Error attempting to play video or enter fullscreen:", error);
                }
            };

            playVideo();
        }
    }, [isVideoPlaying]); // Эффект зависит от `isVideoPlaying`

    const handleVideoEnd = () => {
        setIsVideoPlaying(false); // Скрываем видео после завершения
        router.push('/mainbot');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <button
                onClick={handleStart}
                className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
                Начать
            </button>

            {isVideoPlaying && (
                <video
                    ref={videoRef}
                    src="/intro.mp4" // Убедитесь, что видео доступно по этому пути
                    className="fixed inset-0 w-full h-full pointer-events-none select-none" // Полноэкранный стиль для видео
                    onEnded={handleVideoEnd} // Скрываем видео при завершении
                    onPause={handleVideoEnd} // Скрываем видео при паузе
                    controls={false} // Убираем контролы
                    autoPlay
                />
            )}
        </div>
    );
};

export default Button;
