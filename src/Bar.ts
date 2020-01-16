import { Foo, BarReturnType } from './Foo';
class Bar extends Foo {
    public get bar(): BarReturnType | null {
        return {dummy: "bar in bar class"};
    }
}

export {Bar}