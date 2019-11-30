import ProductRepo  from "../repositories/repositories-product";
import { unixToDateHR, dateHRtoUnix } from '../utils/date';

export default class Product {
    private _id:          number;
    private _title:       string;
    private _price:       number;
    private _prodDate:    string;
    private _description: string;
    private _image:       string;
    public  quantity:     number;

    constructor ( 
        title:         string
        , price:       number
        , prodDate:    string
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
                prodDate:    this.prodUnixDate,
                description: this.description,
                image:       this.image,
                userId:      userRepo.id
            } ).then( product => {
                resolve( this );
            } ).catch( err => {
                reject( err );
            } );
        } );

        return promise;
    } 

    static getAll( query: { sort: string } ): Promise<Product[]> {
        return Product._getArrProducts( null, query );
    }

    static getMine( usrId: number = null, query: { sort: string } ): Promise<Product[]> {
        return Product._getArrProducts( usrId, query );
    }

    static getOneByPk ( pk: number ): Promise<Product> {
        const promise: Promise<Product> = new Promise( (  resolve, reject ) => {
            ProductRepo.findByPk( pk ).then( _prod => {
                const prod = new Product( 
                    _prod.title, 
                    _prod.price,
                    unixToDateHR( Number( _prod.prodDate ) ),
                    _prod.description,
                    _prod.image,
                    _prod.id,
                );

                resolve( prod );
            } ).catch( err => {
                reject( err );
            } );
        } );

        return promise;
    }

    static edit( prod: Product ): Promise<any> {
        const promise: Promise<string> = new Promise( ( resolve, reject ) => {
            ProductRepo.findByPk( prod.id ).then( _prod => {
                _prod.update( {
                    title:       prod.title,
                    price:       prod.price,
                    prodDate:    prod.prodUnixDate,
                    description: prod.description,
                    image:       prod.image,
                } );

                resolve( _prod );
            } ).catch( err => {
                reject( err );
            } );
        } );

        return promise;
    }

    static delete( prodId: number ) {
        prodId *= 1;
        return ProductRepo
            .findByPk( prodId )
            .then( prod => {
                return prod.destroy();
            } );
    }

    static sort ( products: Product[], criteria: string ) {
        products.sort( (  _a: Product, _b: Product ) => {
            if ( criteria === 'title' ) {
                return _a.title.localeCompare( _b.title );
            } else if ( criteria === 'price' ) {
                return _a.price - _b.price;
            } else if ( criteria === 'prodDate' ) {
                return _a.prodUnixDate - _b.prodUnixDate;
            } else {
                return _a.id - _b.id;
            }
        } );
    }

    set id ( id: number ) {
        if ( typeof id !== 'number' ) throw new Error( 'id should be number' );
        this._id = id;
    }

    get id (): number{
        return this._id;
    } 

    set title ( title: string ) {
        if ( typeof title !== 'string' ) throw new Error( 'title should be string' );
        this._title = title;
    }

    get title (): string {
        return this._title;
    } 

    set price ( price: number ) {
        price = price * 1;
        if ( Number.isNaN( price )     ) throw new Error( 'Price should be number' );
        if ( typeof price !== 'number' ) throw new Error( 'Price should be number' );

        this._price = price;
    }

    get price (): number {
        return this._price;
    } 

    set prodDate ( prodDate: string ) {
        this._prodDate = dateHRtoUnix( prodDate );
    }

    get prodDate (): string {
        return unixToDateHR( Number( this._prodDate ) );
    } 

    get prodUnixDate (): number {
        return Number( this._prodDate );
    }

    set description ( description: string ) {
        if ( typeof description !== 'string' ) throw new Error( 'Description should be string' );
        this._description = description;
    }

    get description (): string {
        return this._description;
    } 

    set image ( image: string ) {
        if ( typeof image !== 'string' ) throw new Error( 'Image should be string' );
        this._image = image;
    }

    get image (): string {
        return this._image;
    } 

    private static _productFindAll ( usrId: number = null ): Promise<any> {
        if ( ! usrId) {
            return ProductRepo.findAll(); 
        } else {
            return ProductRepo.findAll( {
                where: {
                    userId: usrId
                }
            } ); 
        }
    }

    private static _getArrProducts ( 
        usrId: number, 
        query: { sort: string } 
    ): Promise<Product[]> {
        const promise = new Promise<Product[]>( ( resolve, reject ) => {
            Product._productFindAll( usrId ).then( arrProducts => {
                const _arrProducts = [];
                arrProducts.forEach( _prod => {
                    let _prodct;
                    let _prodDate = unixToDateHR(  _prod.prodDate );
                    try {
                            _prodct = new Product(
                            _prod.title, _prod.price, 
                            _prodDate,
                            _prod.description,
                            _prod.image, _prod.id
                        ); 
                    } catch ( err ) {
                        reject( err );
                    }
                    _arrProducts.push( _prodct );
                });

                Product.sort( _arrProducts, query.sort ); 

                resolve( _arrProducts );
            } ).catch( errMess => {
                reject( errMess );
            } );
        } );

        return promise;
    }
}