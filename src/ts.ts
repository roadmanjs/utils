class G {
    j: string = "j string"

    g: number = 10

    e: Date = new Date();

    a: any = [] 
}

const Ginstance = new G();

const keys = Object.getOwnPropertyNames(Ginstance);

console.log("keys", keys);

console.log("keys typeof", typeof Ginstance["g"]);