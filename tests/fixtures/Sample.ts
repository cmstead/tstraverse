class Sample {
    foo: string

    constructor() {
        this.foo = "bar";
    }

    doStuff(): void {
        console.log(this.foo);
    }
}