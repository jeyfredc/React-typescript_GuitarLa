export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

/* Herencia se agrega para cuando es tyoe Guitar & */
/* Herencia cuando es interface export interface CartItem extends Guitar */
export type CartItem = Guitar & {
    quantity: number;
}

/* Otra forma de heredar es utilizar Pick */
/* esta forma solo va a heredar lo que uno escoja y se hace con esta sintaxis */
/* Esta es para cuando no se quiere añadir una propiedad */
/*   export type CartItem= Pick<Guitar, 'id' | 'name' | 'price'> */
/* Cuando se añade la propiedad se agrega de esta forma */
/* export type CartItem= Pick<Guitar, 'id' | 'name' | 'price'>{
    quantity:number
} */