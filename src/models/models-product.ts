import ProductRepo  from "../repositories/repositories-product";

export default class Product {
    private _title:       string;
    private _price:       number;
    private _prodDate:    number;
    private _description: string;
    private _image:       string;

    constructor ( 
        title:         string
        , price:       number
        , prodDate:    number
        , description: string
        , image:       string 
    ) {
        this._title       = title;
        this._price       = price;
        this._prodDate    = prodDate;
        this._description = description;
        this._image       = image;
    }

    create( userRepo ): Promise<Product> {
        const promise: Promise<Product> = new Promise( ( resolve, reject ) => {
            ProductRepo.create( {
                title:       this.title,
                price:       this.price,
                prodDate:    this.prodDate,
                description: this.description,
                image:       this.image
            } )
            .then( product => {
                debugger;
                userRepo.createProduct( product );
                debugger;
                resolve( this );
            } ).catch( err => {
                console.log( 'Product cannot be created...', err );
                reject( 'Product cannot be created...' );
            } );
        } );

        return promise;
    }

    set title ( title: string ) {
        this._title = title;
    }

    get title (): string {
        return this._title;
    } 

    set price ( price: number ) {
        this._price = price;
    }

    get price (): number {
        return this._price;
    } 

    set prodDate ( prodDate: number ) {
        this._prodDate = prodDate;
    }

    get prodDate (): number {
        return this._prodDate;
    } 

    set description ( description: string ) {
        this._description = description;
    }

    get description (): string {
        return this._description;
    } 

    set image ( image: string ) {
        this._image = image;
    }

    get image (): string {
        return this._image;
    } 
}