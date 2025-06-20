'use client';
import { useState, useEffect } from 'react';

export default function ClientTimeDisplay({ 
    date, 
    locale = 'zh-CN', 
    options = {
        year: 'numeric',
        month: 'numeric', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    },
    fallback = '加载中...'
}) {
    const [timeString, setTimeString] = useState(fallback);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (date) {
            const dateObj = new Date(date);
            setTimeString(dateObj.toLocaleDateString(locale, options));
        }
    }, [date, locale, options]);

    // 在服务器端渲染时显示占位符，避免hydration错误
    if (!isClient) {
        return <span suppressHydrationWarning>{fallback}</span>;
    }

    return <span>{timeString}</span>;
}

// 简化版本，只显示完整的本地时间字符串
export function ClientTimeString({ date, fallback = '加载中...' }) {
    const [timeString, setTimeString] = useState(fallback);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (date) {
            const dateObj = new Date(date);
            setTimeString(dateObj.toLocaleString());
        }
    }, [date]);

    // 在服务器端渲染时显示占位符，避免hydration错误
    if (!isClient) {
        return <span suppressHydrationWarning>{fallback}</span>;
    }

    return <span>{timeString}</span>;
} 