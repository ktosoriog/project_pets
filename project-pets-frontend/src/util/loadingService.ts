type Subscriber = (isLoading: boolean) => void;

export class LoadingService {
    private static count = 0;
    private static subscribers: Subscriber[] = [];

    static get isLoading() {
        return this.count > 0;
    }

    static start() {
        this.count++;
        this.notify();
    }

    static stop() {
        this.count = Math.max(0, this.count - 1);
        this.notify();
    }

    static subscribe(callback: Subscriber) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    private static notify() {
        this.subscribers.forEach(sub => sub(this.isLoading));
    }
}