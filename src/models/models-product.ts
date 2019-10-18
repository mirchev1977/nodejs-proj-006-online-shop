import ProductRepo  from "../repositories/repositories-product";

export default class Product {
    private _id:          number;
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
        , id:          number = 0 
    ) {
        this.id          = id;
        this.title       = title;
        this.price       = price;
        this.prodDate    = prodDate;
        this.description = description;
        this.image       = image;
    }

    create( userRepo ): Promise<Product> {
        const promise: Promise<Product> = new Promise( ( resolve, reject ) => {
            ProductRepo.create( {
                title:       this.title,
                price:       this.price,
                prodDate:    this.prodDate,
                description: this.description,
                image:       this.image,
                userId:      userRepo.id
            } )
            .then( product => {
                userRepo.createProduct( product );
                resolve( this );
            } ).catch( err => {
                console.log( 'Product cannot be created...', err );
                reject( 'Product cannot be created...' );
            } );
        } );

        return promise;
    }

    static getAll (): Promise<Product[]> {
        const promise = new Promise<Product[]>( ( resolve, reject ) => {
            ProductRepo.findAll().then( arrProducts => {
                const _arrProducts = [];
                arrProducts.forEach( _prod => {
                    _arrProducts.push( new Product(
                        _prod.title, _prod.price, _prod.prodDate, _prod.description,
                        _prod.image, _prod.id
                    ) );
                });

                resolve( _arrProducts );
            } ).catch( errMess => {
                reject( errMess );
            } );
        } );

        return promise;
    }

    set id ( id: number ) {
        this._id = id;
    }

    get id (): number{
        return this._id;
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