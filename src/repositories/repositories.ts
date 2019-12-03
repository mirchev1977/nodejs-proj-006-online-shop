import User         from "./repositories-user";
import Login        from "./repositories-login";
import Product      from "./repositories-product";
import Cart         from "./repositories-cart";
import CartProduct  from "./repositories-cart-product";
import Order        from "./repositories-order";
import OrderItem    from "./repositories-order-item";

export default function createRelations(): void {
    Login.belongsTo( User, { constraints: true, onDelete: "CASCADE" } );
    User.hasMany( Login ); 

    Product.belongsTo( User, { constraints: true, onDelete: "CASCADE" } );
    User.hasMany( Product ); 

    Cart.belongsTo( User, { constraints: true, onDelete: "CASCADE" } );
    User.hasOne( Cart );

    Cart.belongsToMany(   Product
        , { as: 'Item',   through: CartProduct, foreignKey: 'cartId'    });

    Product.belongsToMany(Cart
        ,  { as: 'Basket', through: CartProduct, foreignKey: 'productId' }); 

    Order.belongsTo( User );
    User.hasMany(    Order );
    Order.belongsToMany(   Product, { through: OrderItem } );
    Product.belongsToMany( Order,   { through: OrderItem } );
}