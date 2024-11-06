class Customer {
    email: string;
    name: string;
    street: string;
    postalCode: string;
    city: string;

    constructor(email: string, name: string, street: string, postalCode: string, city: string) {
        this.email = email;
        this.name = name;
        this.street = street;
        this.postalCode = postalCode;
        this.city = city;
    }
}

export default Customer;