class Key {
    private signature: number;

    constructor() {
        this.signature = Math.random();
    }

    getSignature(): number {
        return this.signature;
    }
}

class Person {
    private key: Key;

    constructor(key: Key) {
        this.key = key;
    }

    getKey(): Key {
        return this.key
    }
}

abstract class House {
    protected  door: boolean;
    protected  key: Key;
    private  tenants: Person[] = [];

    constructor(key: Key) {
        this.key = key;
    }

    comeIn(person: Person): void {
        if (!this.door) {
            throw new Error('The door is closed');
        }
        this.tenants.push(person);
    }

    abstract openDoor(key: Key): void;
}

class MyHouse extends House {

    openDoor(key: Key): void {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = true;
        } else {
            throw new Error("Wrong key. Door remains closed.");
        }
    }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};