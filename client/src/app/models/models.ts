export interface Animal {
    id:number;
    animalType:AnimalType;
    name:string;
    desciprtion:string;
    createDate:Date;
    lastUpdate:Date;
    createdBy:string;
}

export enum AnimalType {
    Dog="Dog",
    Cat="Cat",
    Rabbit="Rabbit",
    Pig="Pig",
    Bird="Bird",
    Fish="Fish",
    Turtle="Turtle",
    Panda="Panda",    
    Unicorn="Unicorn",
    Dinosaur="Dinosaur",
    Other   = "Other"
}

    