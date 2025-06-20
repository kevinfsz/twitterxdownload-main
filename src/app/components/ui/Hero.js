'use client';
import { getTranslation } from '@/lib/i18n';
import { Button, addToast, ToastProvider } from '@heroui/react';
import { RiDownloadLine } from '@remixicon/react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero({ locale = 'en', 
    downloadButtonLabel = 'Download', 
    downloadButtonIsLoading = false,
    remainApiCount = 0,
    url = ''
}) {
    const t = function (key) {
        return getTranslation(locale, key);
    }

    const inputRef = useRef(null);
    const router = useRouter();

    return (
        <>
            <ToastProvider placement="top-center" toastOffset={230} />
            <div className="text-center pt-16 pb-2">
                <h1 className="text-5xl font-bold text-primary mb-2">
                    {t('Download Twitter Video And ALL')}
                </h1>
                <p className="text-4xl text-subtext mb-8">
                    {t('Free and No Registration Required')}
                </p>
                <div className="max-w-xl mx-auto pt-6">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            className="w-full px-4 py-3 pr-24 rounded-xl bg-gray-800 text-gray-300 border border-foreground/10"
                            placeholder="https://x.com/username/status/123456789"
                            ref={inputRef}
                            defaultValue={url}
                        />
                        <Button
                            onPress={() => {
                                // 从剪贴板中获取   
                                navigator.clipboard.readText().then(text => {
                                    inputRef.current.value = text;
                                });
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-700 text-gray-300 rounded-lg">
                            {t('Paste')}
                        </Button>
                    </div>
                    <Button
                        onPress={() => {
                            // 从inputRef中获取
                            const text = inputRef.current.value.trim();

                            // 校验URL格式
                            const twitterUrlPattern = /^https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/\d+/;

                            if (!text) {
                                addToast({
                                    title: t('Please enter a twitter status url'),
                                    color: 'danger',
                                    hideCloseButton: true,
                                    shouldShowTimeoutProgress: true,
                                    variant: 'bordered',
                                });
                                return;
                            }

                            if (!twitterUrlPattern.test(text)) {
                                addToast({
                                    title: t('Invalid twitter status url format'),
                                    color: 'danger',
                                    hideCloseButton: true,
                                    shouldShowTimeoutProgress: true,
                                    variant: 'bordered',
                                });
                                return;
                            }

                            // 使用客户端路由导航
                            router.push(`/downloader?url=${encodeURIComponent(text)}`);
                        }}
                        isLoading={downloadButtonIsLoading}
                        spinnerPlacement="end"
                        startContent={<RiDownloadLine />}
                        color="primary" className="text-lg py-6 px-20 rounded-full mb-3" >
                        {t(downloadButtonLabel)}
                    </Button>
                    <p className="text-gray-500 text-sm">
                        {t('API Status: ')} {remainApiCount}
                    </p>
                </div>
            </div>
        </>
    );
}