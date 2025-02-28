let isScriptLoaded = false;

export const loadTwitterScript = (): Promise<void> => {
    if (isScriptLoaded) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.charset = 'utf-8';
        script.async = true;
        script.onload = () => {
            isScriptLoaded = true;
            resolve();
        };
        document.head.appendChild(script);
    });
};

export const embedTweet = (tweetUrl: string): Promise<void> => {
    return new Promise((resolve) => {
        if (window.twttr) {
            //@ts-ignore
            window.twttr.ready(() => {
                window.twttr.widgets.load();
                resolve();
            });
        } else {
            resolve();
        }
    });
};
