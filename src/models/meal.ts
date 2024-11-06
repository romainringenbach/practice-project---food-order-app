class Meal {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;

    constructor(id: string, name: string, price: number, description: string, image: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}

export default Meal;