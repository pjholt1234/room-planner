type Observer = (id: string) => void;

class Observable {
    protected id: string = '';

    private observers: Record<string, Observer[]> = {
        save: [],
        saving: [],
        saved: [],
        loading: [],
        delete: [],
        deleted: []
    };

    public addObserver(event: string, observer: Observer): void {
        if (this.observers[event]) {
            this.observers[event].push(observer);
        }
    }

    public removeObserver(event: string, observer: Observer): void {
        if (this.observers[event]) {
            this.observers[event] = this.observers[event].filter(
                (obs) => obs !== observer
            );
        }
    }

    public notifyObservers(event: string): void {
        if (this.observers[event]) {
            this.observers[event].forEach((observer) => observer(this.id));
        }
    }
}

export default Observable;
