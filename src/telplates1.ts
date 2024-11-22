/// SINGLETON

class App {
  private static instance: App;

  constructor() {
    if (!App.instance) {
      App.instance = this;
    }

    return App.instance;
  }

  // ...
}

/// FACTORY

interface PaymentProcessor {
  validate(data: any): boolean;
  pay(amount: number): void;
}

class CreditCardProcessor implements PaymentProcessor {
  validate(data: any): boolean {
    // Валідація даних кредитної карти
    return true;
  }

  pay(amount: number): void {
    console.log(`Paid ${amount} using Credit Card.`);
  }
}

class PayPalProcessor implements PaymentProcessor {
  validate(data: any): boolean {
    // Валідація даних PayPal
    return true;
  }

  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal.`);
  }
}

class BitcoinProcessor implements PaymentProcessor {
  validate(data: any): boolean {
    // Валідація даних Bitcoin
    return true;
  }

  pay(amount: number): void {
    console.log(`Paid ${amount} using Bitcoin.`);
  }
}

class PaymentProcessorFactory {
  static createProcessor(type: string): PaymentProcessor {
    switch (type) {
      case 'CreditCard':
        return new CreditCardProcessor();
      case 'PayPal':
        return new PayPalProcessor();
      case 'Bitcoin':
        return new BitcoinProcessor();
      default:
        throw new Error(`Payment method ${type} is not supported.`);
    }
  }
}

// Використання
const processor = PaymentProcessorFactory.createProcessor('CreditCard');
processor.pay(100);

/// BUILDER

class Car {
  constructor(
    public model: string,

    public year: number,

    public color: string
  ) {}
}

class CarBuilder {
  private model: string;

  private year: number;

  private color: string;

  setModel(model: string): CarBuilder {
    this.model = model;

    return this;
  }

  setYear(year: number): CarBuilder {
    this.year = year;

    return this;
  }

  setColor(color: string): CarBuilder {
    this.color = color;

    return this;
  }

  build(): Car {
    return new Car(this.model, this.year, this.color);
  }
}

const builder = new CarBuilder();

const car = builder
  .setModel('Tesla Model S')
  .setYear(2023)
  .setColor('Red')
  .build();

console.log(car); // Car {model: "Tesla Model S", year: 2023, color: "Red"}

///ADAPTER

// Старий, несумісний інтерфейс
class OldService {
  public oldRequest(): string {
    return 'Old Service Request';
  }
}

// Новий інтерфейс
interface NewInterface {
  request(): string;
}

// Адаптер, який перетворює старий інтерфейс на новий
class Adapter implements NewInterface {
  constructor(private oldService: OldService) {}

  public request(): string {
    const result = this.oldService.oldRequest();

    return `Adapter: (TRANSLATED) ${result}`;
  }
}

// Клієнтський код, що працює з новим інтерфейсом
class Client {
  constructor(private newInterface: NewInterface) {}

  public useService(): void {
    console.log(this.newInterface.request());
  }
}

const oldService = new OldService();
const adapter = new Adapter(oldService);
const client = new Client(adapter);

client.useService(); // Вивід: Adapter: (TRANSLATED) Old Service Request

/// DECORATOR

interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost() {
    return 10;
  }

  description() {
    return 'Simple coffee';
  }
}

class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  cost() {
    return this.coffee.cost();
  }

  description() {
    return this.coffee.description();
  }
}

class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 2;
  }

  description() {
    return this.coffee.description() + ', milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1;
  }

  description() {
    return this.coffee.description() + ', sugar';
  }
}

// Клиентский код
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(`${coffee.description()} - ${coffee.cost()} dollars`); // Simple coffee, milk, sugar - 13 dollars
